


export interface ICompany{
    nif: string,
    name: string,
    address: string 
}

export interface CompanyTableProps {
    data: ICompany[]
}

export interface CreateCompanyFormValues {
    nif: string
    name: string
    address: string
}