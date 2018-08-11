const request = require('request')
import chai from 'chai'

const expect = chai.expect
const url = 'http://localhost:8000'

const contract_params = {
    interest_rate: '0.01'
}

describe('Debt Capital Market API', () => {
    it('should respond', () => {
        request.post(url, {}, (error, response, body) => {
            expect(error).to.not.exist
            expect(response).to.exist
        })
    })

    it('should give the client signable data if given debt contract params', () => {
        request.post(url + '/api/create', contract_params, (error, response, body) => {
            expect(error).to.not.exist
            expect(response).to.exist
        })
    })

    it('should save signed loan requests in the db', () => { })

    it('should return a list of signed loan requests', () => { })

    it('should sign & broadcast loan requests signed by a creditor', () => { })
})


