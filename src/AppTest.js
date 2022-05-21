import axios from "axios";
import * as React from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import Navbar from './App/components/Navbar';
import ProductLayout from './Product/components/ProductLayout';

const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback, email, password, token) {
    callback(); // return fakeAuthProvider.signin en AuthProvider
  },
  signout(callback) {
    localStorage.setItem("isLogged", false);
    localStorage.setItem("user", "");
    localStorage.setItem("token", "");
    callback()
  },
};

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <h1>Auth Example</h1>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/protected"
            element={
              <RequireAuth>
                <ProtectedPage />
              </RequireAuth>
            }
          />
          <Route
            path="/products"
            element={
              <RequireAuth>
                <ProductLayout />
              </RequireAuth>
            }
          />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>

  );
}

function Layout() {
  return (
    <div>
      <AuthStatus />

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
        <li>
          <Link to="/products">Protected Products Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}


let AuthContext = React.createContext(null);

function AuthProvider({ children }) {

  let [user, setUser] = React.useState(localStorage.getItem("user"));
  let [token, setToken] = React.useState(localStorage.getItem("token"));
  let [isLogged, setIsLogged] = React.useState(JSON.parse(localStorage.getItem("isLogged")))

  let signin = (callback, email, password) => {

    return fakeAuthProvider.signin(() => {
      // api sync
      axios.post("http://192.168.1.103:4000/api/auth/signin", { email, password })
      .then(({data}) => {
        localStorage.setItem("isLogged", true);
        localStorage.setItem("user", email);
        localStorage.setItem("token", data.token);
        setToken(data.token)
        setUser(email);
        setIsLogged(true);
        callback(); // auth.signin en LoginPage
      })
      .catch((err) => {
        console.log('Ocurrio un error en el login');
        console.log(err)
      })
    }, email, password, token);

  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      setIsLogged(false)
      setToken("");
      callback(); // auth.signout en LoginPage
    });
  };

  let value = { user, signin, signout, isLogged, token };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.isLogged) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.isLogged) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children;
}

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let email = formData.get("email");
    let password = formData.get("password");

    auth.signin(() => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    }, email, password);
  }

  // si el ususario esta loggeado, no mostrar la vista login
  if (auth.isLogged) {
    return <Navigate to="/products" state={{ from: location }} replace />
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Email: <input name="email" type="email" defaultValue={"goko@gmail.com"}/>
        </label>{" "}


        <label>
          password: <input name="password" type="password" defaultValue={"password"} />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}
