
import axios from "axios";
//import { useSelector} from 'react-redux'

const BASE_URL = 'https://shopping-website-server.vercel.app/api'

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Yjc1ZDk2NmQyMzU0ZGNhYThhMTA0MCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2ODk3Mzg3MDAsImV4cCI6MTY4OTkxMTUwMH0.ZQxs_4Y_C_uWief2w-Wu0GClQhw0vkyLhtmi9ogWdtI"
 //const user = useSelector((store)=> store.user.currentUser)

export  const publicRequest = axios.create({
    baseURL : BASE_URL,
})

export const userRequest = axios.create({
    baseURL : BASE_URL,
    headers : { token : `Bearer ${TOKEN}`}
})