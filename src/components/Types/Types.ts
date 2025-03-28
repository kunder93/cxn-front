import { UserProfile } from 'store/types/userTypes'

export interface ITournamentParticipant {
    fideId: number
    name: string
    club: string
    birthDate: Date
    category: string
    byes: string
}

export interface IUsersListData {
    usersList: UserProfile[]
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

export interface IBook {
    isbn: string
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

// Enum for payment categories (matches PaymentsCategory in Java)
export enum PaymentsCategory {
    FEDERATE_PAYMENT = 'FEDERATE_PAYMENT',
    MEMBERSHIP_PAYMENT = 'MEMBERSHIP_PAYMENT',
    OTHER_PAYMENT = 'OTHER_PAYMENT'
}

// Enum for payment states (matches PaymentsState in Java)
export enum PaymentsState {
    UNPAID = 'UNPAID',
    PAID = 'PAID',
    CANCELLED = 'CANCELLED'
    // Add other states as needed
}

// Interface for a single payment detail (matches PaymentDetails in Java)
export interface IPaymentDetails {
    id: string
    title: string
    description: string
    category: PaymentsCategory
    amount: number
    createdAt: string
    paidAt: null | string
    state: PaymentsState
}

export interface ReceivedCreatedPayment extends IPaymentDetails {
    userDni: string
}

export type IUsersListPaymentsData = Record<string, IPaymentDetails[]>
