import request from 'request'
import chai from 'chai'
import mocks from './mocks'

import ethutils from 'ethereumjs-util'
import keys from 'keythereum'

const { debtor_request } = mocks

const expect = chai.expect
const url = 'http://localhost:8000'

describe('Debt Capital Market API', () => {
    it('should respond', () => {
        request.get(url, {}, (error, response, body) => {
            expect(error).to.not.exist
            expect(response).to.exist
        })
    })

    it('send a debtor an order to sign then save it in the database', (done) => {
        return request.post({
            url: url + '/api/create',
            json: true,
            body: debtor_request,
        }, (error, response, body) => {
            expect(error).to.not.exist
            expect(response).to.exist
            expect(body.loanRequestHash).to.exist

            // sign order
            const pk = keys.create().privateKey
            const signature = ethutils.ecsign(ethutils.toBuffer(body.loanRequestHash), pk)
            const signed_order = body
            signed_order.debtor_signature = {}
            signed_order.debtor_signature.v = ethutils.bufferToHex(signature.v)
            signed_order.debtor_signature.r = ethutils.bufferToHex(signature.r)
            signed_order.debtor_signature.s = ethutils.bufferToHex(signature.s)

            return request.post({
                url: url + '/api/submit',
                json: true,
                body: signed_order,
            }, (error, response, body) => {
                expect(error).to.not.exist
                console.log(JSON.stringify(body))
                expect(body.result).to.be.true
                done()
            })
        })
    }).timeout(20000)

    it('should give creditors a list of orders then broadcast ones they sign', () => {
        return request.get({
            url: url + '/api/get'
        }, (error, response, body) => {
            expect(error).to.not.exist
            done()
        })
    })

})


