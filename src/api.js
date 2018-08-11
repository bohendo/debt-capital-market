import express from 'express'
import Dharma from '@dharmaprotocol/dharma.js'

const api = express.Router()

api.get('/request-loan', (request, response) => {
    console.log('Creating Loan request')
    response.send('Hello World')
})

export default api
