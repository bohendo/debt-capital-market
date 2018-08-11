import Dharma from '@dharmaprotocol/dharma.js'
import BigNumber from 'bignumber.js'

const dharma = new Dharma('https://kovan.infura.io/RNXFMnEXo6TEeIYzcTyQ')

const hash = (object) => {
    
}

const createOrder = async (request) => {
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
    } = request.body

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
        termsContractParameters: dharma.adapters.collateralizedSimpleInterestloan.packParameters(siTermContractParams, collateralizedParams),
        salt: BigNumber.random(20).times(new BigNumber(10).pow(20)),
    }

    issuance.agreementId = hash(issuance)

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

    debtOrder.toSign = hash(debtOrder)
    
    
}

