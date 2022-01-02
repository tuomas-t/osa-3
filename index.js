require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(cors())


morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const generateId = () => {
    return Math.floor(Math.random() * 1000)
}

app.get('/api/persons', (req, res) => {
    Person.find({}).then(p => {
        res.json(p)
    })
})

app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people <br/>${new Date()}`)
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(p => {
        if (!p) {
            res.status(404).end()
        } else {
            res.json(p)
        }
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

app.post('/api/persons/', (req, res) => {
    if (persons.find(p => p.name === req.body.name)) {
        return res.status(400).json({ 
            error: 'name must be unique' 
        })
    } else if (!req.body.name) {
        return res.status(400).json({ 
            error: 'name missing' 
        })
    } else if (!req.body.number) {
        return res.status(400).json({ 
            error: 'number missing' 
        })
    }
    const person = new Person ({
        id: generateId(),
        name: req.body.name,
        number: req.body.number,
    })
    person.save().then(p => {
      res.json(p.toJSON())
    })
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})