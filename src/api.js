import express from 'express'
import createOrder from './create_order'
import db from './db'
import fillOrder from './fill'

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
    const debtorSignature = false
    if (debtorSignature) {
        db.saveLoanRequest(request.body)
        return response.json({
            message: 'Signature looks good',
            result: true
        })
    }
    return response.json({
        message: 'Signature looks BAD',
        result: false
    })
})

api.post('/cancel', (request, response) => {
    response.send('Cancelling Loan request')
})

api.get('/fill', (request, response) => {
    fillOrder(request.body).then(done => {
        response.send(done)
    })
})

export default api
