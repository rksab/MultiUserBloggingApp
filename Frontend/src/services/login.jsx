import axios from 'axios'
const baseurl = `${import.meta.env.VITE_API_BASE_URL}`


const login = async credentials => {
    const response = await axios.post(baseurl, credentials)
    return response.data
}

export default { login }