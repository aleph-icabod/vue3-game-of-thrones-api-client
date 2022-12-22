import axios from "axios";

const gameOfThronesApi = axios.create({
    baseURL: 'https://thronesapi.com/api/v2',
});

export const aSongOfIceAndFireApi = axios.create({
    baseURL: "https://www.anapioficeandfire.com/api/",
})

export default gameOfThronesApi;