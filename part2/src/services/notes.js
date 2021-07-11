import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

// Dado que solo usamos response.data, devolvemos directamente response.data
// En este ejemplo estamos repitiendo codigo, pero posteriormente (creo)
// veremos como hacerlo mejor aun
const getAll = () => {
  const request = axios.get(baseUrl)
// Ahora no devolvemos la promise devuelta por axios, como antes, sino que 
// asignamos la promise a request, y devolvemos la llamada al then (que sigue
// siendo una promise). Si la peticion http es exitosa, se devuelven los datos
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

export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}