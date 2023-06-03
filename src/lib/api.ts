import axios from 'axios'

// informando qual é a rota do back end padrão
export const api = axios.create({
  baseURL: 'http://localhost:3333',
})
