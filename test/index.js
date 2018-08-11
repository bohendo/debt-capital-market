const request = require('request')
import chai from 'chai'

const expect = chai.expect
const url = 'http://localhost:8000'

const debtor_request = {
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
}

const agreement_id = {
    version: '0x755e131019e5ab3e213dc269a4020e3e82e06e20',
    debtor: '0xd2f45e02ab7b190ac9a87b743eab4c8f2ed0e491',
    underwriter: '',
    underwriterRiskRating: '',
    termsContract: '',
    termsContractParameters: '0x04000000000de0b6b3a7640000009c40200030000000001bc16d674ec8000',
    salt: 'abc123'
}

const debtor_to_sign = {
    agreementId: '',
    underwriterFee: 0,
    principalAmount: 5,
    principalToken: "WETH",
    debtorFee: 0,
    creditorFee: 0,
    relayer: process.env.ETH_ADDRESS,
    relayerFee: debtor_request * 0.05,
    expirationTimestampInSec: 60*60*24*5
}

describe('Debt Capital Market API', () => {
    it('should respond', () => {
        request.get(url, {}, (error, response, body) => {
            expect(error).to.not.exist
            expect(response).to.exist
        })
    })

    it('should give the client signable data if given a debtor request', (done) => {
        return request.post({
            url: url + '/api/create',
            json: true,
            body: debtor_request,
        }, (error, response, body) => {
            expect(error).to.not.exist
            expect(response).to.exist
            expect(body.toSign).to.exist
            done()
        })
    }).timeout(20000)

    it('should save signed loan requests in the db', () => { })

    it('should return a list of signed loan requests', () => { })

    it('should sign & broadcast loan requests signed by a creditor', () => { })
})


