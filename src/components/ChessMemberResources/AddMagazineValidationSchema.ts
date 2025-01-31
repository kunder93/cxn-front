import * as Yup from 'yup'

const ISSN_REGEX = /^(?:\d{8})$/
const TITLE_MIN_LENGTH = 3
const TITLE_MAX_LENGTH = 150
const DESCRIPTION_MIN_LENGTH = 50
const DESCRIPTION_MAX_LENGTH = 2000
const LANGUAGE_MIN_LENGTH = 3
const LANGUAGE_MAX_LENGTH = 50

const AUTHOR_FIRST_NAME_MIN_LENGTH = 3
const AUTHOR_FIRST_NAME_MAX_LENGTH = 150
const AUTHOR_LAST_NAME_MIN_LENGTH = 3
const AUTHOR_LAST_NAME_MAX_LENGTH = 150

const AUTHOR_MIN_AMOUNT = 1
const AUTHOR_MAX_AMOUNT = 10

const PUBLISHER_MIN_LENGTH = 3
const PUBLISHER_MAX_LENGTH = 150

const EDITION_NUMBER_MAX = 10000

const PAGES_AMOUNT_MAX = 10000

const MIN_PUBLISH_DATE = new Date('1800-01-01')

export const AddMagazineValidationSchema = Yup.object().shape({
    issn: Yup.string().required('Es necesario un ISSN.').matches(ISSN_REGEX, `El ISSN debe contener exactamente 8 dígitos sin guiones.`),
    title: Yup.string()
        .required('Es necesario un título.')
        .min(TITLE_MIN_LENGTH, `El título debe contener al menos ${TITLE_MIN_LENGTH} caracteres.`)
        .max(TITLE_MAX_LENGTH, `El título no debe exceder los ${TITLE_MAX_LENGTH} caracteres.`),
    publisher: Yup.string()
        .required('Es necesario un editorial.')
        .min(PUBLISHER_MIN_LENGTH, `El editorial debe contener al menos ${PUBLISHER_MIN_LENGTH} caracteres.`)
        .max(PUBLISHER_MAX_LENGTH, `El editorial no debe exceder los ${PUBLISHER_MAX_LENGTH} caracteres.`),
    editionNumber: Yup.number()
        .required('Es necesario un número de edición.')
        .min(1, 'El número de edición debe ser mayor a 0.')
        .max(EDITION_NUMBER_MAX, 'El número de edición no debe exceder los 1000.'),
    pagesAmount: Yup.number()
        .required('Es necesario un número de edición.')
        .min(1, 'El número de edición debe ser mayor a 0.')
        .max(PAGES_AMOUNT_MAX, 'El número de edición no debe exceder los 1000.'),
    description: Yup.string()
        .required('Es necesaria una descripción.')
        .min(DESCRIPTION_MIN_LENGTH, `La descripción debe ser de al menos ${DESCRIPTION_MIN_LENGTH} caracteres.`)
        .max(DESCRIPTION_MAX_LENGTH, `La descripción no debe exceder los ${DESCRIPTION_MAX_LENGTH} caracteres.`),
    language: Yup.string()
        .required('Es necesario un idioma.')
        .min(LANGUAGE_MIN_LENGTH, `El idioma debe contener al menos ${LANGUAGE_MIN_LENGTH} caracteres.`)
        .max(LANGUAGE_MAX_LENGTH, `El idioma no debe exceder los ${LANGUAGE_MAX_LENGTH} caracteres.`),
    publishDate: Yup.date()
        .required('Es necesaria una fecha.')
        .typeError('La fecha no es válida.')
        .min(MIN_PUBLISH_DATE, `La fecha de publicación debe ser posterior a ${MIN_PUBLISH_DATE.toLocaleDateString()}.`)
        .max(new Date(), 'La fecha de publicación debe ser anterior a la fecha actual.'),
    authors: Yup.array()
        .of(
            Yup.object().shape({
                firstName: Yup.string()
                    .required('Es necesario un nombre.')
                    .min(AUTHOR_FIRST_NAME_MIN_LENGTH, `El nombre debe contener al menos ${AUTHOR_FIRST_NAME_MIN_LENGTH} caracteres.`)
                    .max(AUTHOR_FIRST_NAME_MAX_LENGTH, `El nombre no debe exceder los ${AUTHOR_FIRST_NAME_MAX_LENGTH} caracteres.`),
                lastName: Yup.string()
                    .required('Es necesario un apellido.')
                    .min(AUTHOR_LAST_NAME_MIN_LENGTH, `El apellido debe contener al menos ${AUTHOR_LAST_NAME_MIN_LENGTH} caracteres.`)
                    .max(AUTHOR_LAST_NAME_MAX_LENGTH, `El apellido no debe exceder los ${AUTHOR_LAST_NAME_MAX_LENGTH} caracteres.`)
            })
        )
        .min(AUTHOR_MIN_AMOUNT, `Debe haber al menos ${AUTHOR_MIN_AMOUNT} autor.`)
        .max(AUTHOR_MAX_AMOUNT, `No puede haber más de ${AUTHOR_MAX_AMOUNT} autores.`),

    imageFile: Yup.mixed()
        .required('La imagen de portada es obligatoria.')
        .test('fileSize', 'El archivo debe ser menor a 10MB.', (value) => value && (value as File).size <= 10 * 1024 * 1024)
        .test(
            'fileType',
            'El formato de archivo no es válido. Se permiten PNG, JPEG, WEBP, AVIF.',
            (value) => value && ['image/png', 'image/jpeg', 'image/webp', 'image/avif'].includes((value as File).type)
        )
})
