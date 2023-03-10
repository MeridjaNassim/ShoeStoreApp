import axios from 'axios';

const loginAPI = {
    async loginWithUsernameOrEmail(usernameOrEmail, password) {
        const response = await axios.post('http://localhost:3000/auth/login', {
            usernameOrEmail,
            password,
        });
        return response.data;
    }
} 


export default loginAPI