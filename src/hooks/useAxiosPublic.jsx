import axios from "axios";

const axiosPublic = axios.create({
  baseURL: 'https://task-management-server-henna.vercel.app'
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;