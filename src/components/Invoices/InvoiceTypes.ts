import { IInvoice } from "../Types/Types"

export interface ICreateInvoiceModal{
    data: IInvoice[]
    addDataFunction: React.Dispatch<React.SetStateAction<IInvoice[]>>
    onHide: ()=>void
    show: boolean
}