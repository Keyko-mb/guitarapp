import axios from "axios";
import authHeader from "@/services/auth-header";

axios.defaults.baseURL = 'http://localhost:8084/api/';
axios.defaults.headers.common['Authorization'] = authHeader();