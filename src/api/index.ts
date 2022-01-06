/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios, { AxiosInstance, AxiosError } from 'axios';

export const API = (headers?: any): AxiosInstance => {
    const instanceAxios = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:8080',
        timeout: 20000,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    });
    instanceAxios.interceptors.request.use(
        (config) => {
            // config.headers['Content-Type'] = 'application/json';
            return config;
        },
        (error) => {
            Promise.reject(error);
        },
    );
    instanceAxios.interceptors.response.use(
        (res) => res.data,
        (err: AxiosError) => {
            if (err.response) throw new Error(err.response!.data.message);
            else throw new Error('Something was wrong please try again');
        },
    );
    return instanceAxios;
};
