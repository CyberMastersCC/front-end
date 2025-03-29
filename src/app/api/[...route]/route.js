import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Отримання профілю користувача
export const getProfile = async (token) => {
    const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Логін користувача
export const loginUser = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
};

// Реєстрація користувача
export const registerUser = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { username, email, password });
  return response.data;
}