import { UserProfile } from "store/types/userTypes"


export interface IUsersListData {
    usersList: UserProfile[]
}

export interface ISelfVehicle {
    places: string
    distance: number
    kmPrice: number
}

export interface IFoodHousing {
    amountDays: number
    dayPrice: number
    overnight: boolean
}

export interface IRegularTransport {
    category: string
    description: string
    invoice: IInvoice
}

export interface IRegularTransportList {
    regularTransportList: IRegularTransport[]
}

export interface IPaymentSheet {
    paymentSheetIdentifier: number
    userName: string
    userFirstSurname: string
    userSecondSurname: string
    userDNI: string
    postalCode: string
    apartmentNumber: string
    building: string
    street: string
    city: string
    countryName: string
    countrySubdivisionName: string
    reason: string
    place: string
    startDate: Date
    endDate: Date
    selfVehicle: ISelfVehicle
    regularTransportList: IRegularTransportList
    foodHousing: IFoodHousing
}

export interface IPaymentSheetList {
    paymentSheetList: IPaymentSheet[]
}

export interface ICountriesList {
    countryList: ICountryData[]
}

export interface ICountryData {
    shortName: string
    fullName: string
    numericCode: number
    alpha2Code: string
    alpha3Code: string
}

export interface ISubCountryData {
    name: string
    kindSubdivisionName: string
    code: string
}
export interface ISubCountriesList {
    subCountryList: ISubCountryData[]
}

export interface IInvoice {
    number: number
    series: string
    expeditionDate: Date
    advancePaymentDate: Date
    taxExempt: boolean
    sellerNif: string
    buyerNif: string
}

export interface IBook {
    isbn: number
    title: string
    gender: string
    publishYear: Date
    language: string
}

export interface IAuthor {
    firstName: string
    lastName: string
    nationaliy: string
}

export interface INewUserForm {
    name: string
    first_surname: string
    second_surname: string
    gender: string
    birth_date: string
    email: string
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
