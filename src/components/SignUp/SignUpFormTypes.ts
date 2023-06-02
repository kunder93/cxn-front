import { FormikProps } from "formik"

export enum FormSteps {
    FirstStep = 1,
    SecondStep = 2,
    ThirdStep = 3,
    FourthStep = 4
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

export interface SignUpFormFourthStepData {
    formikProps: FormikProps<SignUpFormValues>
    nextStepFunction: any
    previousStepFunction: any
}

export enum UserAceptanceModalOption {
    CesionDatos = 1,
    NormasSocios = 2,
    CompromisoConfidencialidad = 3
}
export interface FormConditionsModalProps{
    userAceptanceOption: UserAceptanceModalOption
    show: boolean;
    onClose: () => void;
    props?: any    
}

export interface formFirstStepData {
    formikProps: FormikProps<SignUpFormValues>
    step: FormSteps
    nextStepFunction: any
}
  