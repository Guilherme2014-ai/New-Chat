const app = require('../../config/server')
const io = require('../../app')
const Router = require('express').Router()

Router.get('/', (req, res) => {
    res.render('index', {errors: null})
})

Router.post('/', (req, res) => {
    const apelido = req.body.apelido
    const errors = []

    if(apelido.length < 1){
        errors.push({text: 'O campo esta vazio !'}) // EX: ( errors[text: 'BLA BLA', text: 'BLA BLA'] )
    }
    if(apelido.length > 15){
        errors.push({text: 'O campo deve ter menos de 15 caracteres !'})
    }
    if(errors.length > 0){
        return res.render('index', {errors: errors})
    }
    else{
        app.set('apelido', apelido)
        res.redirect('/chat')
    }
})

Router.get('/chat', (req, res) => {
    const apelido = app.get('apelido')
    app.get('io').emit('new', apelido)

    res.render('chat', {apelido: apelido})
})

module.exports = Router