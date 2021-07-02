import React from 'react'

const Persons = ({ shown }) => (
    <>{shown.map(person => <p key={person.name} >{person.name} {person.number}</p>)}</>    
)

export default Persons