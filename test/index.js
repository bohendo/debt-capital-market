const request = require('request')
import chai from 'chai'

const expect = chai.expect
const url = 'http://localhost:8000'

describe('Debt Capital Market API', () => {
    it('should respond', () => {
        request.post(url, {}, (error, response, body) => {
            expect(error).to.not.exist
            expect(response).to.exist
        })
    })
})


