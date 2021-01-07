import axios from "axios";

const API_URL = "http://localhost:8000/api/";

const register = (name, email, password, password_confirmation ) => {
	return axios.post(API_URL + "register", {
		name,
		email,
		password,
		password_confirmation,
	});
};

const registerAdmin = (name, email, password, password_confirmation ) => {
	const userToken = JSON.parse(localStorage.getItem('userToken'));
	return axios.post(API_URL + "register/admin?token=" + userToken.token, {
		name,
		email,
		password,
		password_confirmation,
	});
};

const login = (email, password) => {
	return axios
		.post(API_URL + "login", {
			email,
			password,
		})
		.then ((response) => {
			if(response.data.token){
				localStorage.setItem("userToken", JSON.stringify(response.data));
			}

			return response.data;
		});

};

const logout = () => {
	localStorage.removeItem("userToken");
};

export default {
  register,
  registerAdmin,
  login,
  logout,
};