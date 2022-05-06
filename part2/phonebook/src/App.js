import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PeopleList from './components/PeopleList'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() =>
  axios.get('http://localhost:3001/persons').then(response => {
    setPersons(response.data)
  })
  , [])
  

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
      alert(`${newName} is already added to phonebook`)
      return
    }

    const name = newName
    const number = newNumber
    const newPerson = {name, number}

    axios.post('http://localhost:3001/persons', newPerson)

    setPersons(persons.concat(
      newPerson
    )) 
  }

  const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Search with name</h3>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <h3>Add new number</h3>
      <PersonForm name={newName} number={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} onSubmit={addPerson}/>
      <h2>Numbers</h2>
      <PeopleList peopleToShow={peopleToShow}/>
    </div>
  )

}

export default App