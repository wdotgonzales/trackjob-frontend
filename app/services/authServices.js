import { API_ENDPOINTS } from "../config/api";

export const loginUser = async (email, password) => {
  const response = await fetch(API_ENDPOINTS.LOGIN, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw {
      statusCode: response.status,
      message: responseData.message || "Login failed",
    };
  }

  return { statusCode: response.status, data: responseData };
};

export const logoutUser = async (token) => {
  const response = await fetch(API_ENDPOINTS.LOGOUT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw {
      statusCode: response.status,
      message: responseData.message || "Logout failed",
    };
  }

  return { statusCode: response.status, data: responseData };
};
