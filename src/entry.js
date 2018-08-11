import express from 'express'
import bodyParser from 'body-parser'
import api from './api'

import Dharma from '@dharmaprotocol/dharma.js'
console.log(Object.keys(Dharma.Types))
const types = Object.keys(Dharma.Types)
for (let type in types) {
    console.log(`type ${types[type]} has keys ${Object.keys(Dharma.Types[types[type]])}`)
}

const router = express.Router()

router.use(bodyParser.json())

router.use((request, response, next) => {
    console.log(`${request.method} Received: ${JSON.stringify({
        path: request.path,
        body: request.body
    })}`)
    next()
})

router.use('/api', api)

// Add real endpoints here
router.get('/', (request, response) => {
    console.log('hello world')
    response.send('Hello World')
})

// End of pipeline
router.use((request, response) => {
    let message = `Unknown API Endpoint: ${request.path}`
    response.json({
        status: 404,
        body: message
    })
})

// error handler
router.use((error, request, response) => {
   response.json(error)
})

const port = 8000
express().use(router).listen(port, () => {
    //console.log(`Starting app in environment: ${JSON.stringify(process.env, null, 2)}`)
    console.log(`listening on port ${port}`)
})
