import { useState } from 'react';
import { axiosInstance } from '../api/axiosInstance';
import { useAlerts } from './useAlert';
import { errorMessage } from '../api/errorMessages';

export const useAxiosPost = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const { handleClickAlert } = useAlerts();

    const postData = async (url, body) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post(url, body);
            setData(response.data);
            handleClickAlert({
                message: response.data.msg,
                options: {
                    variant: "success",
                },
            });
        } catch (error) {
            console.log(error);
            if (error.response) {
                const message = error.response.data.msg || errorMessage(error);
                handleClickAlert({
                    message,
                    options: {
                        variant: "error",
                    },
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        data,
        setData,
        postData,
    };
};