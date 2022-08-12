const mongoose = require('mongoose')

var option = 1

if (process.argv.length == 3) {
    option = 0
} else if (process.argv.length < 5) {
  console.log('Please provide the password, a person`s name and his/hers phone number as arguments: node mongo.js <password> <name> <number>')
  process.exit(1)
} 

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://valentin:${password}@cluster0.md9zm.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (option == 0) {
    mongoose
        .connect(url)
        .then(result => {
            console.log('Phonebook:');
            Person.find({}).then(result => {
                result.forEach(person => {
                    console.log(person.name, person.number)
                })
                mongoose.connection.close()
            })
        })
} else {
    // save a person 

    mongoose
        .connect(url)
        .then(result => {
            console.log('connected to MongoDB')
            const person = new Person({
                name: name,
                number: number,
            })
            person.save().then(result => {
                console.log(`added ${name} number ${number} to phonebook`)
                mongoose.connection.close()
            })
        }
    )
}

