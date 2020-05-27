const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const pug = require('pug')
const _ = require('lodash')
const path = require('path')
const Donar = require('./model/donor')
const initializePayment = require('./config/paystack')
const verifyPayment = require('./config/paystack')

const app = express()
const port = process.env.PORT || 3000

// app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public/')))
app.set('view engine', pug)

app.get('/', (req, res) => {
    res.render('index.pug')
})
app.post('/paystack/pay', (req, res) => {
    const form = _.pick(req.body, ['amount', 'email', 'name'])
    form.metadata = {
        name: form.name
    }
    form.amount *= 75 // Convert currency in rupees
    initializePayment(form, (error, body) => {
        if (error) {
            //handle errors
            console.log(error);
            return;
        }
        response = JSON.parse(body);
        res.redirect(response.data.authorization_url)
    })
})


app.listen(port, () => {
    console.log("Server is up running on " + port)
})