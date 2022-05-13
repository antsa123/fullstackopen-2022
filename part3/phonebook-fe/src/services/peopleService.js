import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const addPerson = (personToAdd) => {
    return axios.post(baseUrl, personToAdd)
}

const deletePerson = (idToDelete) => {
    return axios.delete(`${baseUrl}/${idToDelete}`)
}

const updatePerson = (idToUpdate, updatedPerson) => {
    return axios.put(`${baseUrl}/${idToUpdate}`, updatedPerson)
}
export default { getAll, addPerson, deletePerson, updatePerson}