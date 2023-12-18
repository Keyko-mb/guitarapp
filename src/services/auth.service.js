import axios from "axios";

class AuthService {
    login(user) {
        return axios
            .post('auth/login', user)
            .then(response => {
                if (response.data.access_token) {
                    console.log(response)
                    localStorage.setItem('user', JSON.stringify(response.data));
                    console.log(response.data.access_token)
                    axios.defaults.headers.common['Authorization'] = `Bearer ` + response.data.access_token
                }
                return response.data;
            })
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        console.log("service" + user)
        return axios
            .post('auth/register', user)
    }
}

export default new AuthService();