import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Roberto Carlos', number: '902589458' }
  ])

  const [searchName, setSearchName] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3000/persons').then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])

  const onNewNameChange = (event) => {
    setNewName(event.target.value)
  }
  const onNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

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
      axios.post("http://localhost:3000/persons", newNameObj).then(response => {
        console.log(response)
        setNewName(persons.concat(newNameObj))
        setNewName('')
        setNewNumber('')

      })
    }

  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} setSearchName={setSearchName} />
      <h3>add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} addName={addName} onNewNameChange={onNewNameChange} onNewNumberChange={onNewNumberChange} />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

const Persons = ({ filteredPersons }) => {
  return (
    <ul>
      {filteredPersons.map((person, index) =>
        <li key={index}>
          {person.name} {person.number}
        </li>
      )}
    </ul>
  )
}

const Filter = ({ searchName, setSearchName }) => {
  return (
    <div>
      filter shown with
      <input
        type="text"
        value={searchName}
        onChange={(event) => setSearchName(event.target.value)}
        placeholder="Search by name"
      />
    </div>
  )
}

const PersonForm = ({ newName, newNumber, addName, onNewNameChange, onNewNumberChange }) => {
  return (
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
  )
}

export default App
