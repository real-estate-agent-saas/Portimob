import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  withCredentials: true, // Permite o envio de cookies com as requisições
})

export default api
