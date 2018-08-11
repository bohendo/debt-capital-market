import express from 'express'
import Dharma from '@dharmaprotocol/dharma.js'

import db from './db'

const api = express.Router()

api.get('/get', (request, response) => {
    response.json(db.getLoanRequests())
})

api.get('/create', (request, response) => {
    response.send('Creating Loan request')
})

api.get('/submit', (request, response) => {
    response.send('Submitting signed loan request to the order book')
})

api.get('/cancel', (request, response) => {
    response.send('Cancelling Loan request')
})

api.get('/fill', (request, response) => {
    response.send(`Filling loan request with creditor's signature`)
})

export default api
