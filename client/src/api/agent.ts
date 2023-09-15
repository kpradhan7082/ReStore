import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Routes } from "../app/router/Routes";

axios.defaults.baseURL = "http://localhost:5005/api/";

axios.defaults.withCredentials = true;

const sleep = ()=> new Promise(resolve => setTimeout(resolve,500))

axios.interceptors.response.use(async (response) => {
    await sleep();
    return response
}, ((error: AxiosError) => {
    const { status, data, statusText } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (var key in data.errors) {
                    if (data.errors[key])
                        modelStateErrors.push(data.errors[key]);
                }
                throw modelStateErrors;
            }
            toast.error(data.title);
            break;
        case 401: toast.error(data.title);
            break;
        case 500: 
            Routes.navigate("/server-error", {
                state : {
                    error : data
                }
            });
            break;
        default: break;
    }
    return Promise.reject(error.response)
}))

var responseData = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseData),
    put: (url: string, body: {}) => axios.put(url, body).then(responseData),
    post: (url: string, body: {}) => axios.post(url, body).then(responseData),
    delete: (url: string) => axios.delete(url).then(responseData),
}

const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get404Error: () => requests.get('buggy/not-found'),
    get401Error: () => requests.get('buggy/unauthorised'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
}

const Basket = {
    get : ()=> requests.get('Basket'),
    addItem : (productId : number, quantity = 1) => requests.post(`Basket?productId=${productId}&quantity=${quantity}`,{}),
    removeItem : (productId : number, quantity = 1) => requests.delete(`Basket?productId=${productId}&quantity=${quantity}`)
}

const agent = {
    Catalog,
    TestErrors,
    Basket
}

export default agent;