import axios from 'axios'

export const keywordInfoClient = axios.create({
    baseURL: 'http://127.0.0.1:8100',
})
