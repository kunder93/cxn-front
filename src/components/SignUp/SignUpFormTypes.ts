import { FormikProps } from 'formik'

export enum FormSteps {
    FirstStep = 1,
    SecondStep = 2,
    ThirdStep = 3,
    FourthStep = 4
}

export interface SignUpFormStepProps {
    formikProps: FormikProps<SignUpFormValues>
    previousStepFunction: () => void
    nextStepFunction: () => void
}

export interface UserFormData {
    email: string
    password: string
    dni: string
    name: string
    firstSurname: string
    secondSurname: string
    gender: string
    birthDate: Date
    postalCode: string
    apartmentNumber: string
    building: string
    street: string
    city: string
    countryNumericCode: number
    countrySubdivisionName: string
}

export interface SignUpFormValues {
    //First step
    email: string
    password: string
    confirmPassword: string
    //Second step
    dni: string
    name: string
    firstSurname: string
    secondSurname: string
    gender: string
    birthDate: Date
    //Third step
    postalCode: string
    apartmentNumber: string
    building: string
    street: string
    city: string
    countryNumericCode: number
    countrySubdivisionName: string
    //Fourth step
    membersTerms: boolean
    privacyTerms: boolean
    confidencialityTerms: boolean
}

export enum UserAceptanceModalOption {
    CesionDatos = 1,
    NormasSocios = 2,
    CompromisoConfidencialidad = 3
}
export interface FormConditionsModalProps {
    userAceptanceOption: UserAceptanceModalOption
    show: boolean
    onClose: () => void
}

// Interfaz para el contenido del error de la respuesta
export interface AxiosErrorResponseData {
    content: string
}
