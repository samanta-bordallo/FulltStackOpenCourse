import { useEffect, useState } from 'react'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchName, setSearchName] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personsService.getAll()
      .then(response => {
        setPersons(response.data)
      })

      .catch(error => {
        alert('Failed to fetch data' + error.message)
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

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
        const newNameObj = {
          name: newName,
          number: newNumber
        }
        personsService.update(existingPerson.id, newNameObj)
          .then(response => {
            const updatedPersons = persons.map(person =>
              person.id !== existingPerson.id
                ? person
                : response.data
            );
            setPersons(updatedPersons);
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            alert('Error updating person');
            console.error('Error:', error);
          });
      }
    } else {
      const newNameObj = {
        name: newName,
        number: newNumber
      }
      personsService.create(newNameObj)
        .then(response => {
          const updatedPersons = persons.concat(response.data);
          setPersons(updatedPersons);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          alert('Error updating person');
          console.error('Error:', error);
        })
    }
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.del(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
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
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

const Persons = ({ filteredPersons, deletePerson }) => {
  return (
    <ul>
      {filteredPersons.map(person =>
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
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
