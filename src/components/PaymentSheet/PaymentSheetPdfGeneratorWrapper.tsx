/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { lazy, Suspense } from 'react'

const PaymentSheetPDFGenerator = lazy(() => import('./PaymentSheetPDFGenerator'))

const PaymentSheetPDFGeneratorWrapper: React.FC<any> = (props: any) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentSheetPDFGenerator {...props} />
        </Suspense>
    )
}

export default PaymentSheetPDFGeneratorWrapper
