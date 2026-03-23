import axios from 'axios'

export const keywordInfoClient = axios.create({
    baseURL: 'http://fastapi_server:8100',
})
