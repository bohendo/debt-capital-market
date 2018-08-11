import express from 'express'
import Dharma from '@dharmaprotocol/dharma.js'

const api = express.Router()

api.get('/get', (request, response) => {
    response.send('Fetching open loans...')
})

api.get('/make_payment', (request, response) => {
    response.send('Filling Loan request')
})

api.get('/free', (request, response) => {
    response.send(`Loan has been repaid, freeing collateral...`)
})

api.get('/sieze', (request, response) => {
    response.send(`Loan payment missed, siezing collateral...`)
})

export default api
