import axios from "axios";

const API_URL = "http://localhost:8080";

export const get = (url) => axios.get(API_URL + url);

export const remove = (url) => axios.delete(API_URL + url);

export const edit = (url, body) => axios.put(API_URL + url, body);

export const insert = (url, body) => axios.post(API_URL + url, body);
