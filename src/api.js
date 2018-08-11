import express from 'express'
import Dharma from '@dharmaprotocol/dharma.js'
import Web3 from 'web3'

const api = express.Router()
const web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/RNXFMnEXo6TEeIYzcTyQ'))

const dharma = new Dharma('https://kovan.infura.io/RNXFMnEXo6TEeIYzcTyQ')
const {Allowance, Debt, Investment, Investments, Loan, LoanRequest, Tokens, DEBT_ORDER_DATA_DEFAULTS, DebtRegistryEntry, Logging, ErrorParser, EthereumAddress, DebtKernelError, RepaymentSchedule, RepaymentRouterError, Token, TokenAmount, InterestRate, TimeInterval} = Dharma.Types 

api.get('/request-loan', (request, response) => {
    console.log('Creating Loan request')
    const loanRequest = LoanRequest.create(dharma, {
        principalAmount: 5,
        principalToken: "WETH",
        collateralAmount: 100,
        collateralToken: "REP",
        interestRate: 12.3,
        termDuration: 6,
        termUnit: "months",
        debtorAddress: "0xd2f45e02ab7b190ac9a87b743eab4c8f2ed0e491",
        expiresInDuration: 5,
        expiresInUnit: "days",
    });
    response.send('Hello World')
})

export default api
