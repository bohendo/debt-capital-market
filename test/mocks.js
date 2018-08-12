const mocks = {}

mocks.debtor_request = {
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

mocks.issuance = {
    version: '0x755e131019e5ab3e213dc269a4020e3e82e06e20',
    debtor: '0xd2f45e02ab7b190ac9a87b743eab4c8f2ed0e491',
    underwriter: '',
    underwriterRiskRating: '',
    termsContract: '',
    termsContractParameters: '0x04000000000de0b6b3a7640000009c40200030000000001bc16d674ec8000',
    salt: 'abc123'
}
mocks.debt_order = {
    agreementId: '',
    underwriterFee: 0,
    principalAmount: 5,
    principalToken: "WETH",
    debtorFee: 0,
    creditorFee: 0,
    relayer: process.env.ETH_ADDRESS,
    relayerFee: mocks.debtor_request.principalAmount * 0.05,
    expirationTimestampInSec: 60*60*24*5
}

export default mocks
