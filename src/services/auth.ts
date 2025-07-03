import api from './axios'
import Cookies from 'js-cookie'

type LoginData = {
  email: string
  password: string
}

export async function loginUser(data: LoginData) {
  const response = await api.post('/login', data)
  
  // Armazena token (se vier do NestJS) em cookie
  Cookies.set('token', response.data.access_token, { expires: 7 })

  return response.data
}
