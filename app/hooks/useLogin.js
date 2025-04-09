import { useState } from "react";
import { loginUser } from "../services/authServices";

export const useLogin = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await loginUser(email, password);
      setData(result.data);
      setStatusCode(result.statusCode);
    } catch (err) {
      setError(err.message);
      setStatusCode(err.statusCode);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, data, isLoading, error, statusCode };
};
