const db = {}

const loanRequests = []

db.getLoanRequests = () => {
    return loanRequests
}

db.saveLoanRequests = (loanRequest) => {
    loanRequests.push(loanRequest)
    return true
}

export default db
