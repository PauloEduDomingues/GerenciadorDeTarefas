import { useContext } from "react";
import { authContext } from ".";

export function useAuth()
{
    return useContext(authContext);
}
import { api } from '../../lib/api';
import { jwtDecode } from 'jwt-decode'

export async function login(email, password)
{
    const response = await api.post('/api/auth', {
        email,
        password
    });

    const { data } = response;

    if(!data.token) throw new Error('Usuário e/ou senha inválidos!');

    api.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${data.access_token}`;
        config.headers['Content-Type'] = 'application/json';

        return config;
    });

    return data;
}

export function isTokenExpired(token) {
    if (!token) return true;

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    }catch (error) {
        console.error('Error decoding token:', error);
        return true;
    }
}

export async function logout() {
    destroyTokenLocalStorage();
    destroyUserLocalStorage();
}

export function storeTokenLocalStorage(token)
{
    localStorage.setItem('token', token);
}

export function getTokenLocalStorage()
{
    const token = localStorage.getItem('token');
    if(!token) return null;

    return token;
}

export function destroyTokenLocalStorage()
{
    localStorage.removeItem('token');
}

export function storeUserLocalStorage(user)
{
    localStorage.setItem('user', JSON.stringify(user));
}

export function getUserLocalStorage()
{
    const user = localStorage.getItem('user');
    if(!user) return null;

    return JSON.parse(user);
}

export function destroyUserLocalStorage()
{
    localStorage.removeItem('user');
}