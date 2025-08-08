import { useState } from 'react';
import { axiosInstance } from '../api/axiosInstance';

export const useFetchData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async (urlComplement) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(urlComplement);
      setData(response.data);
    } catch (error) {
      const status = error.response ? error.response.status : 'Network Error';
      const message = error.response ? error.response.data.message : 'An unexpected error occurred';
      setError({ status, message });
      console.error('Error fetching data:', { status, message });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchData,
    data,
    isLoading,
    error,
  };
};