import express from 'express'
import Dharma from '@dharmaprotocol/dharma.js'

const api = express.Router()

api.get('/get', (request, response) => {
    response.send('Fetching Loan requests...')
})

api.get('/create', (request, response) => {
    response.send('Creating Loan request')
})

api.get('/cancel', (request, response) => {
    response.send('Cancelling Loan request')
})

api.get('/fill', (request, response) => {
    response.send('Filling Loan request')
})

export default api
