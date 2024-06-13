import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: '', number: '' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(newName + ' is already added to phonebook')
    }
    else {
      const newNameObj = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(newNameObj))
    }

    setNewName('')
    setNewNumber('')
  }

  const onNewNameChange = (event) => {
    setNewName(event.target.value)
  }
  const onNewNumberChange = (event) => {
    setNewNumber(event.target.value)
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
          number:
          <input
            value={newNumber}
            onChange={onNewNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) =>
          <li key={index}>
            {person.name} {person.number}
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
