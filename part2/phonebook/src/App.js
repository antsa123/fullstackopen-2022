import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PeopleList from './components/PeopleList'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1231244'}
  ]) 
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
    setPersons(persons.concat({
      name: newName,
      number: newNumber
    })) 
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