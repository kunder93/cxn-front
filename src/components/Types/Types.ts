

export interface IInvoice{
    number: number,
    series: string,
    expeditionDate: Date,
    advancePaymentDate: Date,
    taxExempt: boolean,
    sellerNifCif: string,
    buyerNifCif: string
}


export interface ICompany{
        nifCif: string,
        name: string,
        identityTaxNumber: string,
        address: string 
}


export interface INewUserForm {
        name: string,
        first_surname: string,
        second_surname: string,
        gender: string,
        birth_date: string,
        email: string,
        password: string
    }
// The type of props MyForm receives
export interface MyFormProps {
    initialEmail?: string

    initialName?: string

    initialFirst_surname?: string

    initialSecond_surname?: string

    initialGender?: string

    initialBirth_date?: Date

    message: string // if this passed all the way through you might do this or make a union type
}    