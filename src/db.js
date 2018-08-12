const db = {}

const loanRequests = []

db.getLoanRequests = () => {
    console.log(`DB: fetching loan requests...`)
    return loanRequests
}

db.saveLoanRequest = (loanRequest) => {
    console.log(`DB: saving loan request`)
    if (loanRequest) {
        loanRequests.push(loanRequest)
        return true
    }
    return false
}

export default db
