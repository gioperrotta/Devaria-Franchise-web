import axios from 'axios'

export  const externalAPI = axios.create ({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
})

export const MAX_AGE = 60 * 60 * 5 // 5 hours

export const setApiBearerToken = (token: string) => {
  externalAPI.defaults.headers['Authorization'] = `Bearer ${token}`
} 




