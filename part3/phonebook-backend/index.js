require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const Person = require('./models/persons')

const app = express()

app.use(bodyParser.json())

app.use(express.static('build'))

app.use(morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
  }))

app.get('/', (request, response) => {
    response.send('<h1>Phonebook</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    const date = new Date()

    Person.find({}).then(persons => {
        response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => { 
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch (error => {
        // response.status(400).send({ error: 'malformatted id' })
        next(error)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            // response.status(400).send({ error: 'malformatted id' })
            next(error)
        })
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({error: 'name missing'})
    } else if (body.number === undefined) {
        return response.status(400).json({error: 'number missing'})
    } else {
        const person = new Person({
            name: body.name,
            number: body.number,
        })

        person.save().then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => {
            // response.status(500).end()
            next(error)
        })
    }
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    if(body.name === undefined) {
        return response.status(400).json({error: 'name missing'})
    } else if (body.number === undefined) {
        return response.status(400).json({error: 'number missing'})
    } else {
        const person = new Person({
            name: body.name,
            number: body.number,
            _id: request.params.id
        })

        Person.findByIdAndUpdate(request.params.id, person, {new: true, runValidators: true, context: 'query'})
            .then(updatedPerson => {
                response.json(updatedPerson)
            })
            .catch(error => {
                // console.log(error);
                // response.status(500).end()
                next(error)
            })
    }
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})