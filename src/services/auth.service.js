import axios from "axios";

class AuthService {
    login(user) {
        return axios
            .post('auth/login', user)
            .then(response => {
                if (response.data.access_token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    axios.defaults.headers.common['Authorization'] = `Bearer ` + response.data.access_token
                }
                return response;
            })
            .catch(function (e) {
                return e;
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