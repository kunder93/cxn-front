import { IUsersListPaymentsData } from 'components/Types/Types'
import React from 'react'

interface PaymentTableProps {
    data: IUsersListPaymentsData
}

const PaymentTable: React.FC<PaymentTableProps> = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>User DNI</th>
                    <th>Amount</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(data).map(([dni, payments]) => {
                    if (payments.length === 0) {
                        // If no payments, show a single row with "No payment" message
                        return (
                            <tr key={dni}>
                                <td>{dni}</td>
                                <td colSpan={2}>No payment</td>
                            </tr>
                        )
                    } else {
                        // If there are payments, display each payment in its own row
                        return payments.map((payment, index) => (
                            <tr key={`${dni}-${index}`}>
                                {index === 0 ? <td rowSpan={payments.length}>{dni}</td> : null}
                                <td>{payment.amount}</td>
                            </tr>
                        ))
                    }
                })}
            </tbody>
        </table>
    )
}

export default PaymentTable
