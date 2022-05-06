import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const addPerson = (personToAdd) => {
    return axios.post(baseUrl, personToAdd)
}


export default { getAll, addPerson}