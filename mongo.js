const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.pzxny.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    string: Date,
})
  
const Person = mongoose.model('Person', personSchema)

if (name && number) {
    const person = new Person({
        name: name,
        number: number
    })
    person.save().then(() => {
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        result.forEach(p => {
            console.log(`${p.name} ${p.number}`)
        })
        mongoose.connection.close()
    })
}