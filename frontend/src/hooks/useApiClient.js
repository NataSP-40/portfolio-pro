import { useState, useCallback } from "react";
// Ensure this points to your AXIOS INSTANCE, not this file!

const useApiClient = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (apiFunc, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunc(...args);
      setData(response.data);
      return response; // Return the whole response so component can handle it
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || "API Error";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, request };
};

export default useApiClient;
