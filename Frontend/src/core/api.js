import axios from 'axios';
import { Platform } from 'react-native';

const ADDRESS = Platform.OS === 'ios'
 ? 'localhost:8000'
 : '10.0.2.2:8000'


const api = axios.create({
    baseURL: 'http://192.168.1.6:8000/Chatting/', 
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api;