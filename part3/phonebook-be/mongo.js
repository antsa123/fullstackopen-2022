const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

let createNewPerson = false
let getAllPeople = true
let newName = ''
let newNumber = ''

if (process.argv.length == 5){
  createNewPerson = true
  getAllPeople = false

  newName = process.argv[3]
  newNumber = process.argv[4]
}

const url =
  `mongodb+srv://antsa123:${password}@cluster0.7xtqq.mongodb.net/?retryWrites=true&w=majority`

try {
  mongoose.connect(url)
}
catch (error) {
  console.error(error)
  console.log('Exiting script')
  mongoose.connection.close()
  process.exit(1)
}

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (createNewPerson) {
  const person = new Person({
    name: newName,
    number: newNumber,
  })

  person.save().then(result => {
    console.log(`Added ${result.name} with number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}

if (getAllPeople) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}