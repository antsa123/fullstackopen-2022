const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const numberValidator = (value) => {
  const splitValue = value.split('-')
  if (splitValue.length != 2) {
    return false
  }
  if (splitValue[0].length != 2 && splitValue[0].length != 3) {
    return false
  }
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    requred: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    validate: [numberValidator, 'Number must be of form XY-1234567 or XYZ-123456']
  }
})



personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)