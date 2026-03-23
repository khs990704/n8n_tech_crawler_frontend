import axios from 'axios'

export const keywordInfoClient = axios.create({
    baseURL: '/api',
})
