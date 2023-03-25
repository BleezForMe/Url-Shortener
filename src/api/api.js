import axios from 'axios';
const API_URL = 'https://url.copedix.pl/apis';

export const shortenUrl = async (url) => {
    const response = await axios.post(`${API_URL}/shorten`, { url });
    return response.data;
};

export const getShortenedUrl = async (id) => {
    const response = await axios.get(`${API_URL}/shortened/${id}`);
    return response.data;
};
