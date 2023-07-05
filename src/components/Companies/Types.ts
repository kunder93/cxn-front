


export interface ICompany{
    nif: string,
    name: string,
    address: string 
}

export type CompanyTableProps = {
    data: ICompany[]
}

export interface CreateCompanyFormValues {
    nifCif: string
    name: string
    address: string
}