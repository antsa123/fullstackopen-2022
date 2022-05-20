require('dotenv').config()
const Person = require('./models/person')

// Server
const express = require('express')
const app = express()

// Middleware
const morgan = require('morgan')
morgan.token('body', (request, response) => JSON.stringify(request.body))
const cors = require('cors')
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}



app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(errorHandler)

// POST /api/persons 200 61 - 4.896 ms {"name":"Liisa Marttinen", "number":"040-243563"}
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => response.json(persons))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(foundPerson => {
    if (foundPerson){
      response.json(foundPerson)
    } else {
      response.status(404).end()
    }
  }).catch(error => {
    next(error)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(result => {
    console.log(`Added ${result.name} with number ${result.number} to phonebook`)
    response.json(person)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson)
      } else {
        response.status(404).end()
      }
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id).then(person => {
    if(person) {
      response.json(person)
      response.status(204).end()
    } else {
      response.status(404).end()
    }
  }).catch(error => {
    next(error)
  })
})

app.get('/info', (request,response) => {
  Person.find({}).then(persons => {
    response.send(`<div>
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date().toString()}</p>
    </div>`)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})