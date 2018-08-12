import express from 'express'
import createOrder from './create_order'
import db from './db'

const api = express.Router()

api.get('/get', (request, response) => {
    response.json(db.getLoanRequests())
})

api.post('/create', (request, response) => {
    return createOrder(request.body).then(order => {
        return response.json(order)
    })
})

api.post('/submit', (request, response) => {
    // verify signature
    db.saveLoanRequest(request.body)
    response.send('Submitting signed loan request to the order book')
})

api.post('/cancel', (request, response) => {
    response.send('Cancelling Loan request')
})

api.post('/fill', (request, response) => {
    response.send(`Filling loan request with creditor's signature`)
})

export default api
