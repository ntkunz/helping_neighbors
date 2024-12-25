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
