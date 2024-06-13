import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: '' }
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const newNameObj = {
      name: newName
    }
    setPersons(persons.concat(newNameObj))
    setNewName('')
  }

  const onNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input
            value={newName}
            onChange={onNewNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) =>
        <Nome key={index} nome={person.name} />
      )}
    </div>
  )
}

const Nome = ({ nome }) => {
  return <li>{nome}</li>
}

export default App
