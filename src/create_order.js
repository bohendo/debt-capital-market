import Dharma from '@dharmaprotocol/dharma.js'
import BigNumber from 'bignumber.js'
import web3Utils from 'web3-utils'

const dharma = new Dharma('https://kovan.infura.io/RNXFMnEXo6TEeIYzcTyQ')
//global.Dharma = Dharma
//global.dharma = dharma

var debtKernel
var termsContract
const loadContracts = async () => {
    if (!debtKernel) {
         debtKernel = await dharma.contracts.loadDebtKernelAsync()
    }
    if (!termsContract) {
        termsContract = await dharma.contracts.loadCollateralizedSimpleInterestTermsContract()
    }
    return { debtKernel, termsContract }

}

var tokenIndicies = {}
const getTokenIndicies = async (principal, collateral) => {
    if (!tokenIndicies[principal]) {
        tokenIndicies[principal] = await dharma.contracts.getTokenIndexBySymbolAsync(principal)
    }
    if (!tokenIndicies[collateral]) {
        tokenIndicies[collateral] = await dharma.contracts.getTokenIndexBySymbolAsync(collateral)
    }
    return {
        principalIndex: tokenIndicies[principal],
        collateralIndex: tokenIndicies[collateral],
    }
}

const createOrder = async (body) => {
    const {
        principalAmount,
        principalToken,
        collateralAmount,
        collateralToken,
        interestRate,
        termDuration,
        termUnit,
        debtorAddress,
        expiresInDuration,
        expiresInUnit,
    } = body

    const { debtKernel, termsContract } = await loadContracts()

    const { principalIndex, collateralIndex } = await getTokenIndicies(principalToken, collateralToken)

    const siTermContractParams = {
        amortizationUnit: termUnit,
        interestRate: new BigNumber(interestRate),
        principalAmount: new BigNumber(principalAmount),
        principalTokenIndex: principalIndex,
        termLength: new BigNumber(termDuration),
    }

    const collateralizedParams = {
        collateralAmount: new BigNumber(collateralAmount),
        collateralTokenIndex: collateralIndex,
        gracePeriodInDays: new BigNumber('0'),
    }

    const termParams = dharma.adapters.collateralizedSimpleInterestLoan.packParameters(siTermContractParams, collateralizedParams)

    const issuance = {
        version: debtKernel.address,
        debtor: debtorAddress,
        underwriter: null,
        underwriterRiskRating: 0,
        termsContract: termsContract.address,
        termsContractParameters: termParams,
        salt: BigNumber.random(20).times(new BigNumber(10).pow(20)),
    }

    issuance.agreementId = web3Utils.soliditySha3(issuance)

    const loanRequest = {
        agreementId: issuance.agreementId,
        underwriterFree: 0,
        principalAmount: 0,
        principalToken: '',
        debtorFee: 0,
        creditorFee: 0,
        relayer: '',
        relayerFee: 0,
        expirationTimestampInSec: 0
    }

    const debtOrder = {
        issuance,
        loanRequest,
        loanRequestHash: web3Utils.soliditySha3(loanRequest),
        terms: {
            amortizationUnit: termUnit,
            interestRate: new BigNumber(interestRate),
            principalAmount: new BigNumber(principalAmount),
            principalTokenIndex: principalIndex,
            termLength: new BigNumber(termDuration),
            collateralAmount: new BigNumber(collateralAmount),
            collateralTokenIndex: collateralIndex,
            gracePeriodInDays: new BigNumber('0'),
        }
    }

    return debtOrder
}

loadContracts()
getTokenIndicies('WETH', 'REP')

export default createOrder
