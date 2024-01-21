import axios from "axios";

const api = process.env.REACT_APP_API_URL;

function getToken() {
    return localStorage.getItem("token");
}

export async function get(route) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : null;
    const response = await axios.get(`${api}/${route}`, {headers});
    return response;
  }
  
  export async function post(route, data) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : null;
    const response = await axios.post(`${api}/${route}`, data, {headers});
    return response;
  }

  export async function put(route, data) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : null;
    const response = await axios.put(`${api}/${route}`, data, {headers});
    return response;
  }

  export async function deleteWithData(route, data) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : null;
    const response = await axios.delete(`${api}/${route}`, { data, headers: headers });
    return response;
  }

  export async function deleteWithoutData(route) {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : null;
    const response = await axios.delete(`${api}/${route}`, {headers});
    return response;
  }