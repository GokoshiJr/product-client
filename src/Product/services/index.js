import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

async function deleteProduct(productData) {
  try {
    const response = await axios.delete(`${baseUrl}/product/${productData._id}`)
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function getProducts() {
  try {
    const response = await axios({
      url:`${baseUrl}/product`,
      method: 'GET'
    })
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function createProduct(productData) {
  try {
    const formData = new FormData();
    formData.append('title', productData.title);
    formData.append('unitaryPrice', productData.unitaryPrice);
    formData.append('size', productData.size);
    formData.append('description', productData.description);
    formData.append('image', productData.image);
    const response = axios({
      url: `${baseUrl}/product`,
      method: 'POST',
      data: formData,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

export {
  getProducts,
  createProduct,
  deleteProduct
}
