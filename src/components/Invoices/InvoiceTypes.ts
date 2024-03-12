import { IInvoice } from '../Types/Types'

export interface ICreateInvoiceModal {
    data: IInvoice[]
    addInvoice: (newCompany: IInvoice) => void
    onHide: () => void
    show: boolean
}
