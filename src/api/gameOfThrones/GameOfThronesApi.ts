import axios from "axios";

const gameOfThronesApi = axios.create({
  baseURL: 'https://thronesapi.com/api/v2',
});

export default gameOfThronesApi;