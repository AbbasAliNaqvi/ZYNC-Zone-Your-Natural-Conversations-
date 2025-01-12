import axios from 'axios';

const ADDRESS = '192.168.1.10:8000'; // Common address for all platforms

const api = axios.create({
  baseURL: `http://${ADDRESS}/Chatting/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;


