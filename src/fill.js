import fs from 'fs'
import Dharma from '@dharmaprotocol/dharma.js'
import BigNumber from 'bignumber.js'
import web3Utils from 'web3-utils'

const dharma = new Dharma('https://kovan.infura.io/RNXFMnEXo6TEeIYzcTyQ')

const fillOrder = async (body) => {
    const {
        issuance,
        loanRequest,
        loanRequestHash,
        debtorSignature,
        creditorAddress,
        creditorSignature,
    } = body

    // check for valid signatures
    // Unpack debt order
    const debtOrder = {
        creditor: creditorAddress,
        creditorFee: loanRequest.creditorFee,
        creditorSignature: creditorSignature,
        debtor: issuance.debtor,
        debtorFee: loanRequest.debtorFee,
        debtorSignature: debtorSignature,
        expirationTimestampInSec: loanRequest.expirationTimestampInSec,
        principalAmount: loanRequest.principalAmount,
        principalToken: loanRequest.principalToken,
        relayer: loanRequest.relayer,
        relayerFee: loanRequest.relayerFee,
        salt: issuance.salt,
        termsContract: issuance.termsContract,
        termsContractParameters: issuance.termsContractParameters,
        underwriter: issuance.underwriter,
        underwriterFee: loanRequest.underwriterFee,
        underwriterRiskRating: issuance.underwriterRiskRating,
        underwriterSignature: '',
    }

    const txData = { from: $(process.env.ETH_ADDRESS) }
    dharma.web3.personal.unlockAccount(process.env.ETH_ADDRESS, fs.readFileSync(`./secrets/${tx.from}`, 'utf8'))
    const tx = {
        txHash: await dharma.order.fillAscync(debtOrder, txData)
    }
    dharma.web3.personal.lockAccount(process.env.ETH_ADDRESS)

   return tx 
}

export default fillOrder
