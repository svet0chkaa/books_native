import axios from 'axios';
import {DOMEN} from "../consts";

export const axiosInstance = axios.create({ baseURL: `http://${DOMEN}/api` });