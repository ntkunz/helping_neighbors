const api = process.env.REACT_APP_API_URL;

const headers = {
  "Content-Type": "application/json",
};

function setAuthorizationHeader() {
  const token = localStorage.getItem("token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  } else {
    delete headers.Authorization;
  }
}

// export async function makeApiCall(method, route, data, sendToken = false) {
//   if (sendToken) {
//     setAuthorizationHeader();
//   }
//   const response = await fetch(`${api}/${route}`, {
//     method,
//     headers,
//     body: data ? JSON.stringify(data) : null,
//   });
// if (!response.ok) {
//     throw new Error(response.statusText);
//   }
//   return await response.json();
// }

export async function makeApiCall(method, route, data, sendToken = false) {
  if (sendToken) {
    setAuthorizationHeader();
  }
  const response = await fetch(`${api}/${route}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  } else {
    return await response.text();
  }
}

// export async function get(route) {
//   return await makeApiCall("GET", route);
// }

// export async function post(route, data) {
//   return await makeApiCall("POST", route, data);
// }

// export async function put(route, data) {
//   return await makeApiCall("PUT", route, data);
// }

// export async function deleteWithData(route, data) {
//   return await makeApiCall("DELETE", route, data);
// }

// Created since I made 2 different functions depending on data or not
// TODO: Refactor to only use one function
// export async function deleteWithoutData(route) {
//   return await makeApiCall("DELETE", route);
// }


// Refactor attempt 1 below
// const api = process.env.REACT_APP_API_URL;

// function getToken() {
//   return localStorage.getItem("token");
// }

// export async function get(route) {
//   const token = getToken();
//   const headers = token ? { Authorization: `Bearer ${token}` } : null;

//   if (headers) {
//     const response = await fetch(`${api}/${route}`, { headers });
//     return response;
//   } else {
//     const response = await fetch(`${api}/${route}`);
//     return response;
//   }
// }

// export async function post(route, data) {
//   const token = getToken();
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};
//   headers["Content-Type"] = "application/json";
//   const response = await fetch(`${api}/${route}`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(data),
//   });
//   return await response.json();
// }

// export async function put(route, data) {
//   const token = getToken();
//   const headers = token ? { Authorization: `Bearer ${token}` } : null;
//   const response = await fetch(`${api}/${route}`, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify(data),
//   });
//   return response;
// }

// export async function deleteWithData(route, data) {
//   const token = getToken();
//   const headers = token ? { Authorization: `Bearer ${token}` } : null;
//   const response = await fetch(`${api}/${route}`, {
//     method: "DELETE",
//     headers,
//     body: JSON.stringify(data),
//   });
//   return response;
// }

// export async function deleteWithoutData(route) {
//   const token = getToken();
//   const headers = token ? { Authorization: `Bearer ${token}` } : null;
//   const response = await fetch(`${api}/${route}`, {
//     method: "DELETE",
//     headers,
//   });
//   return response;
// }



//// original below

// import axios from "axios";

// const api = process.env.REACT_APP_API_URL;

// function getToken() {
//     return localStorage.getItem("token");
// }

// export async function get(route) {
//     const token = getToken();
//     const headers = token ? { Authorization: `Bearer ${token}` } : null;
//     const response = await axios.get(`${api}/${route}`, {headers});
//     return response;
//   }
  
//   export async function post(route, data) {
//     const token = getToken();
//     const headers = token ? { Authorization: `Bearer ${token}` } : null;
//     const response = await axios.post(`${api}/${route}`, data, {headers});
//     return response;
//   }

//   export async function put(route, data) {
//     const token = getToken();
//     const headers = token ? { Authorization: `Bearer ${token}` } : null;
//     const response = await axios.put(`${api}/${route}`, data, {headers});
//     return response;
//   }

//   export async function deleteWithData(route, data) {
//     const token = getToken();
//     const headers = token ? { Authorization: `Bearer ${token}` } : null;
//     const response = await axios.delete(`${api}/${route}`, { data, headers: headers });
//     return response;
//   }

//   export async function deleteWithoutData(route) {
//     const token = getToken();
//     const headers = token ? { Authorization: `Bearer ${token}` } : null;
//     const response = await axios.delete(`${api}/${route}`, {headers});
//     return response;
//   }