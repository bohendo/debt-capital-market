
# Glossary

**TermsContract**:
 - An on-chain smart contract that implements methods: `registerTermStart`, `registerRepayment`, `getExpectedRepaymentValue`, `getValueRepaidToDate`, `getTermEndTimestamp`.
 - It's a fill in the blank template that contains terms logic given a set of parameters. For Example, given an interest rate & length of time, it will do the math needed to return the expected repayment value.
 - It contains quite a bit other logic eg how to calculate interest rate over the 
