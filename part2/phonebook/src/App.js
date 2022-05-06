import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import PeopleList from './components/PeopleList'
import peopleService from './services/peopleService'


const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() =>
    peopleService.getAll().then(response => {
    setPersons(response.data)
  })
  , [])
  

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => 
  {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.findIndex(person => person.name === newName) != -1) {
      if (window.confirm(`${newName} is already added to phonebook. Replace the number?`)) {
        const personToUpdate = persons.find(p => p.name === newName)
        const updatedPerson = { ...personToUpdate, number: newNumber}
        peopleService.updatePerson(personToUpdate.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(p => p.id !== updatedPerson.id ? p : response.data))
            setNewName('')
            setNewNumber('')
            showNotification(`Updated number for ${updatedPerson.name}`)
          })
      }
      return
    }

    const name = newName
    const number = newNumber
    const newPerson = {name, number}

    peopleService.addPerson(newPerson)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
      showNotification(`Added ${newPerson.name}`)
    })
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      peopleService.deletePerson(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
          showNotification(`Deleted ${person.name}`)
        })
    }
  }

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <h3>Search with name</h3>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <h3>Add new number</h3>
      <PersonForm name={newName} number={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} onSubmit={addPerson}/>
      <h2>Numbers</h2>
      <PeopleList peopleToShow={peopleToShow} deletePerson={deletePerson}/>
    </div>
  )

}

export default App