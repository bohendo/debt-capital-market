import Dharma from '@dharmaprotocol/dharma.js'
import BigNumber from 'bignumber.js'
import web3Utils from 'web3-utils'

const dharma = new Dharma('https://kovan.infura.io/RNXFMnEXo6TEeIYzcTyQ')
//global.Dharma = Dharma
//global.dharma = dharma

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

    const debtKernel = await dharma.contracts.loadDebtKernelAsync()
    const termsContract = await dharma.contracts.loadCollateralizedSimpleInterestTermsContract()

    const siTermContractParams = {
        amortizationUnit: termUnit,
        interestRate: new BigNumber(interestRate),
        principalAmount: new BigNumber(principalAmount),
        principalTokenIndex: await dharma.contracts.getTokenIndexBySymbolAsync(principalToken),
        termLength: new BigNumber(termDuration),
    }

    const collateralizedParams = {
        collateralAmount: new BigNumber(collateralAmount),
        collateralTokenIndex: await dharma.contracts.getTokenIndexBySymbolAsync(collateralToken),
        gracePeriodInDays: new BigNumber('0'),
    }

    const issuance = {
        version: debtKernel.address,
        debtor: debtorAddress,
        underwriter: null,
        underwriterRiskRating: 0,
        termsContract: termsContract.address,
        termsContractParameters: dharma.adapters.collateralizedSimpleInterestLoan.packParameters(siTermContractParams, collateralizedParams),
        salt: BigNumber.random(20).times(new BigNumber(10).pow(20)),
    }

    issuance.agreementId = web3Utils.soliditySha3(issuance)

    const debtOrder = {
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

    debtOrder.toSign = web3Utils.soliditySha3(debtOrder)
    
    return debtOrder
}

export default createOrder
