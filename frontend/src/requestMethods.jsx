
import axios from "axios";

const BASE_URL = 'http://localhost:3005/api'

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Yjc1ZDk2NmQyMzU0ZGNhYThhMTA0MCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2ODk3Mzg3MDAsImV4cCI6MTY4OTkxMTUwMH0.ZQxs_4Y_C_uWief2w-Wu0GClQhw0vkyLhtmi9ogWdtI"


export  const publicRequest = axios.create({
    baseURL : BASE_URL,
})

export const userRequest = axios.create({
    baseURL : BASE_URL,
    headers : { token : `Bearer ${TOKEN}`}
})