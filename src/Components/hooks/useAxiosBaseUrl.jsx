import axios from "axios";

const axiosURL = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosBaseUrl = () => {
    return axiosURL;
};

export default useAxiosBaseUrl;