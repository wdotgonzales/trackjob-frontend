import { useState } from "react";
import { logoutUser } from "../services/authServices";

export const useLogout = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  const logout = async (token) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await logoutUser(token);
      setData(result.data);
      setStatusCode(result.statusCode);
    } catch (err) {
      setError(err.message);
      setStatusCode(err.statusCode);
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, data, isLoading, error, statusCode };
};
