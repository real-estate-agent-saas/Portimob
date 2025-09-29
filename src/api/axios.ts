import axios from 'axios'

// Axios config for API
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  withCredentials: true, // Allows cookies to be send in requests
})

export default api