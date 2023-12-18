import axios from "axios";
import {auth as $store} from "@/store/auth.module";

axios.defaults.baseURL = 'http://localhost:8084/api/';
axios.defaults.headers.common.authorization = `Bearer ` + $store.state.token;
