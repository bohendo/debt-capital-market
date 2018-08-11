import express from 'express'

import loanRequest from './loan_request'
import loan from './loan'

const api = express.Router()
const { LoanRequest } = Dharma.Types 

api.use('/loan_request', loanRequest)
api.use('/loan', loan)

export default api
