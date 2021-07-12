import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

// Dado que las funciones exportadas en el objeto tienen el mismo nombre en key
// y en value, podemos simplificar el export
// Esta forma de escribir el objeto es una nueva caracteristica de ES6, que
// permite acortar la definicion de objetos cuando usamos el mismo nombre para 
// key y value
export default { getAll, create, update }
