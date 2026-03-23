import axios from 'axios'

export const keywordInfoClient = axios.create({
    baseURL: 'http://host.docker.internal:8100',
})
