/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from 'yup'
import { SignUpFormValues } from '../../components/SignUp/SignUpFormTypes'

const EMAIL_MAX_LENGTH = 40
const PASSWORD_MAX_LENGTH = 30
const PASSWORD_MIN_LENGTH = 6
const NAME_MAX_LENGTH = 20
const FIRSTSURNAME_MAX_LENGTH = 20
const SECONDSURNAME_MAX_LENGTH = 20
const POSTALCODE_MAX_LENGTH = 10

export const SignUpFormValidationSchema: Yup.Schema<SignUpFormValues> = Yup.object({
    //First step fields
    email: Yup.string()
        .email('Se requiere un email válido.')
        .required('Se requiere un email.')
        .max(EMAIL_MAX_LENGTH, 'El email no debe contener más de ' + EMAIL_MAX_LENGTH + ' caracteres.'),
    password: Yup.string()
        .required('Se require una contraseña.')
        .max(PASSWORD_MAX_LENGTH, 'La contraseña no debe contener mas de ' + PASSWORD_MAX_LENGTH + ' caracteres.')
        .min(PASSWORD_MIN_LENGTH, 'La contraseña debe contener minimo ' + PASSWORD_MIN_LENGTH + ' caracteres'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Debe coincidir con la contraseña.')
        .required('Se requiere volver a escribir la contraseña.'),
    //Second step fields
    dni: Yup.string()
        .required('El DNI es necesario')
        .matches(/^\d{8}[A-Za-z]$/, 'DNI formato no válido.')
        .test('valid-dni', 'La letra del DNI no es válida para este número.', (value) => {
            if (!value) return false
            const dniNumber: any = value.slice(0, -1)
            const dniLetter = value.slice(-1).toUpperCase()
            const letterIndex = 'TRWAGMYFPDXBNJZSQVHLCKE'.indexOf(dniLetter)
            const calculatedLetter = 'TRWAGMYFPDXBNJZSQVHLCKE'[dniNumber % 23]

            return letterIndex === dniNumber % 23 && dniLetter === calculatedLetter
        }),
    name: Yup.string()
        .required('Se requiere un nombre.')
        .max(NAME_MAX_LENGTH, 'El nombre puede contener máximo ' + NAME_MAX_LENGTH + ' caracteres.'),
    firstSurname: Yup.string()
        .required('Se requiere el primer apellido.')
        .max(FIRSTSURNAME_MAX_LENGTH, 'El primer apellido puede contener máximo ' + FIRSTSURNAME_MAX_LENGTH + ' caracteres.'),
    secondSurname: Yup.string()
        .required('Se requiere el segundo apellido.')
        .max(SECONDSURNAME_MAX_LENGTH, 'El segundo apellido puede contener máximo ' + SECONDSURNAME_MAX_LENGTH + ' caracteres'),
    gender: Yup.string().required('Se necesita seleccionar.').oneOf(['male', 'female', 'other']).defined('Se necesita seleccionar.'),
    birthDate: Yup.date()
        .required('Se necesita una fecha de nacimiento.')
        .max(new Date(), 'No debe exceder: ' + new Date().toString()),
    //Third step fields
    postalCode: Yup.string()
        .required('Código postal requerido.')
        .max(POSTALCODE_MAX_LENGTH, 'No debe exeder ' + POSTALCODE_MAX_LENGTH + ' caracteres.'),
    apartmentNumber: Yup.string().required('Número apartamento requerido.'),
    building: Yup.string().required('Casa o edificio requerido.'),
    street: Yup.string().required('Calle requerida.'),
    city: Yup.string().required('Se requiere una población.'),
    countryNumericCode: Yup.number().required('Se requiere un código de país.').min(0, 'Selecciona un país.'),
    countrySubdivisionName: Yup.string().required('Se requiere').defined('Selecciona una provincia.'),
    //Fourth step fields
    membersTerms: Yup.boolean().required('Para registrarse hay que aceptar los términos.').isTrue('Para registrarse hay que aceptar los términos.'),
    privacyTerms: Yup.boolean().required('Se requiere aceptar los términos de privacidad.').isTrue('Para registrarse hay que aceptar los términos.'),
    confidencialityTerms: Yup.boolean()
        .required('Se requeire aceptar los términos de confidencialidad.')
        .isTrue('Para registrarse hay que aceptar los términos.')
})

//type User = yup.InferType<typeof validationUserSchema>;

export const LogInValidationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Se necesita un email!')
        .email('Email no válido')
        .min(6, 'Demasiado corto, minimo 6 caracteres!')
        .max(40, 'Demasiado largo, maximo 20 caracteres!'),

    password: Yup.string()
        .required('Se necesita una contraseña!')
        .min(6, 'Demasiado corto, minimo 6 caracteres!')
        .max(20, 'Demasiado largo, maximo 20 caracteres!')
})

const COMPANY_NAME_MIN_LENGTH = 6
const COMPANY_NAME_MAX_LENGTH = 40
const COMPANY_ADDRESS_MAX_LENGTH = 60
const COMPANY_ADDRESS_MIN_LENGTH = 6

export const CreateCompanyValidationSchema = Yup.object().shape({
    nif: Yup.string()
        .test('valid-nif', 'NIF o DNI inválido', (value: any) => {
            // Validación básica NIF (personas jurídicas y entidades)
            const nifRegex = /^[A-HJ-NP-TV-Z]\d{7}[A-J0-9]$/i
            const dniRegex = /^\d{8}[A-HJ-NP-TV-Z]$/i

            if (!value) return false

            if (nifRegex.test(value)) {
                return true
            }

            if (dniRegex.test(value)) {
                const letters = 'TRWAGMYFPDXBNJZSQVHLCKET'
                const numbers = value.slice(0, 8)
                const letter = value.slice(8).toUpperCase()

                return letters[parseInt(numbers) % 23] === letter
            }

            return false
        })
        .required('El NIF o DNI es necesario.'),

    name: Yup.string()
        .required('Se requiere un nombre.')
        .min(COMPANY_NAME_MIN_LENGTH, 'Demasiado corto, mínimo ' + COMPANY_NAME_MIN_LENGTH + ' caracteres.')
        .max(COMPANY_NAME_MAX_LENGTH, 'Demasiado largo, máximo ' + COMPANY_NAME_MAX_LENGTH + ' caracteres.'),
    address: Yup.string()
        .required('Se necesita una dirección!')
        .min(COMPANY_ADDRESS_MIN_LENGTH, 'Demasiado corto, minimo ' + COMPANY_ADDRESS_MIN_LENGTH + ' caracteres.')
        .max(COMPANY_ADDRESS_MAX_LENGTH, 'Demasiado largo, máximo ' + COMPANY_ADDRESS_MAX_LENGTH + ' caracteres.')
})

export const CreateInvoiceValidationSchema = Yup.object().shape({
    number: Yup.number().required('Se requiere número de factura.'),
    series: Yup.string().required('Se requiere serie de factura.'),
    expeditionDate: Yup.date().required('Se requiere fecha de expedición.'),
    advancePaymentDate: Yup.date(),
    taxExempt: Yup.boolean(),
    sellerNif: Yup.string().required('Se requiere Vendedor.'),
    buyerNif: Yup.string().required('Se requiere Comprador.')
})

export const CreateBookValidationSchema = Yup.object().shape({
    isbn: Yup.number().required('Se requiere numero isbn.'),
    title: Yup.string().required('Se requiere un titulo.'),
    gender: Yup.string().required('Se requiere un genero.'),
    language: Yup.string().required('Se requiere un idioma.')
})
