import axios from 'axios'
const baseurl = 'http://localhost:3002/persons'

const getAll = () => {
    const request = axios.get(baseurl)
    return request.then(response => response.data)
}

const add = (person) => {
    const request = axios.post(baseurl, person)
    return request.then(response => response.data)
}

const del = (id) => {
    const request = axios.delete(`${baseurl}/${id}`)
    return request.then(response => response)
}

const update = (id, person) => {
    const request = axios.patch(`${baseurl}/${id}`, person)
    return request.then(response => response.data)
}

export default { getAll, add, del, update }