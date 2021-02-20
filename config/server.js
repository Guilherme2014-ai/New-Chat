const express = require('express')
const bodyparser = require('body-parser')
const app = express()

// EJS:
    app.set('view engine', 'ejs') // SEM O "S"
    app.set('views', './app/views') // COM O "S"

// Public:
    app.use(express.static('./app/public'))

// Body-Parser:
    app.use(bodyparser.urlencoded({extended: true}))

module.exports = app