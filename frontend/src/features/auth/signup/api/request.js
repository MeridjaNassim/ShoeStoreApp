import axios from 'axios';

const signupAPI = {
    async signupUserWithEmailAndUsername({ username, email, password, firstName, lastName }) {
        const response = await axios.post('http://localhost:3000/auth/signup', {
            username, email, password, firstName, lastName
        });
        return response.data;
    }
}


export default signupAPI