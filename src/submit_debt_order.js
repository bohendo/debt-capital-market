import Dharma from '@dharmaprotocol/dharma.js'
import BigNumber from 'bignumber.js'
import web3Utils from 'web3-utils'

const debtOrderData = {
    creditor: '',
    creditorFee: loanRequest.creditorFee,
    creditorSignature: '',
    debtor: loanRequest.agreement
}

const submitDebtOrder = (body) => {
    const {
        loanRequest,
        loanRequestHash,
        terms,
        signature
    } = body
}
