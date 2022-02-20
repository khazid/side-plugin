import axios from "axios"

const propertyApi = axios.create({
    baseURL: 'https://api.simplyrets.com/properties',
    headers: {
        'Authorization': 'Basic c2ltcGx5cmV0czpzaW1wbHlyZXRz'  
    }
})

export default propertyApi