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

api.get('/submit', (request, response) => {

    response.json(db.saveLoanRequests())
    response.send('Submitting signed loan request to the order book')
})

api.get('/cancel', (request, response) => {
    response.send('Cancelling Loan request')
})

api.get('/fill', (request, response) => {
    response.send(`Filling loan request with creditor's signature`)
})

export default api
