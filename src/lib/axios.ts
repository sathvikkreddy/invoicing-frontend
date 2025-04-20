import axios from 'axios'

const api = axios.create({
    baseURL: process.env.STRAPI_BACKEND_URL ?? 'http://localhost:1337', // Replace with your actual API URL
    timeout: 10000, // Optional: Set a timeout
    headers: {
        'Content-Type': 'application/json',
    },
})

const sheetsConfig = {
    maxBodyLength: Infinity,
    baseUrl:
        'https://script.google.com/macros/s/AKfycbyTXD1c0FseTAq1YSE0wuy3jdhvBlDD-hDtbKGI3laGPR2CC1te-KmAUVrUohJ2KEk6/exec',
    headers: {
        'Content-Type': 'application/json',
    },
}

export const sheetsApi = axios.create(sheetsConfig)

export default api
