import React from 'react'

const Persons = ({ person, remove }) => (
    <>
        {
            <p key={person.name} >
                {person.name} {person.number}
                <button onClick={remove} >delete</button>
            </p>
        }
    </>    
)

export default Persons