import express from 'express'
import Dharma from '@dharmaprotocol/dharma.js'

const api = express.Router()

api.get('/request-loan', (request, response) => {
    console.log('Creating Loan request')
    response.send('Creating Loan request')
})

export default api
