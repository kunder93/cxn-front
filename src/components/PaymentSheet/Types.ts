export interface NewRegularTransportData {
    category: string
    description: string
    invoiceNumber: number
    invoiceSeries: string
}

export interface TransportCategorySelectorProps {
    name: string
    options: SelectorOption[]
}

export interface SelectorOption {
    label: string
    value: string
    value2?: number
}
export interface InvoicesSelectorProps {
    name: string
    secondName: string
    options: SelectorOption[]
}