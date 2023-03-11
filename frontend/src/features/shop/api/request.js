import axios from 'axios';

const productsAPI = {
    getProducts: async () => {
        const response = await axios.get('http://localhost:3000/products');
        return response.data;
    }
}

export default productsAPI;