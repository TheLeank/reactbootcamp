import React from 'react'

const PersonForm = ({
    nameValue,
    numberValue,
    handleName,
    handleNumber,
    handleAdd
}) => {
    return (
        <form>
            <div>
                name: <input value={nameValue} onChange={handleName} /><br/>
                number: <input value={numberValue} onChange={handleNumber} />
            </div>
            <div>
                <button type="submit" onClick={handleAdd}>add</button>
            </div>
        </form>
    )
}

export default PersonForm