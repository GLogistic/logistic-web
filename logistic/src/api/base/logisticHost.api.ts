import axios from "axios";

const headers = {
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Accept-Encoding' : 'gzip, deflate, br, zstd'
}

export const LogisticHostApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers,
});