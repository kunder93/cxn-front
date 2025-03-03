import * as Yup from 'yup'

const ISBN_REGEX = /^(?:\d{10}|\d{13})$/
const TITLE_MIN_LENGTH = 3
const TITLE_MAX_LENGTH = 150
const DESCRIPTION_MIN_LENGTH = 50
const DESCRIPTION_MAX_LENGTH = 2000
const GENRE_MIN_LENGTH = 3
const GENRE_MAX_LENGTH = 50
const LANGUAGE_MIN_LENGTH = 3
const LANGUAGE_MAX_LENGTH = 50

const AUTHOR_FIRST_NAME_MIN_LENGTH = 3
const AUTHOR_FIRST_NAME_MAX_LENGTH = 150
const AUTHOR_LAST_NAME_MIN_LENGTH = 3
const AUTHOR_LAST_NAME_MAX_LENGTH = 150

const AUTHOR_MIN_AMOUNT = 1
const AUTHOR_MAX_AMOUNT = 10

const MIN_PUBLISH_DATE = new Date('1800-01-01')

export const AddBookValidationSchema = Yup.object().shape({
    isbn: Yup.string().required('Es necesario un ISBN.').matches(ISBN_REGEX, `El ISBN debe contener exactamente 10 o 13 dígitos sin guiones.`),
    title: Yup.string()
        .required('Es necesario un título.')
        .min(TITLE_MIN_LENGTH, `El título debe contener al menos ${TITLE_MIN_LENGTH.toLocaleString()} caracteres.`)
        .max(TITLE_MAX_LENGTH, `El título no debe exceder los ${TITLE_MAX_LENGTH.toLocaleString()} caracteres.`),
    description: Yup.string()
        .required('Es necesaria una descripción.')
        .min(DESCRIPTION_MIN_LENGTH, `La descripción debe ser de al menos ${DESCRIPTION_MIN_LENGTH.toLocaleString()} caracteres.`)
        .max(DESCRIPTION_MAX_LENGTH, `La descripción no debe exceder los ${DESCRIPTION_MAX_LENGTH.toLocaleString()} caracteres.`),
    genre: Yup.string()
        .required('Es necesario un género.')
        .min(GENRE_MIN_LENGTH, `El género debe contener al menos ${GENRE_MIN_LENGTH.toLocaleString()} caracteres.`)
        .max(GENRE_MAX_LENGTH, `El género no debe exceder los ${GENRE_MAX_LENGTH.toLocaleString()} caracteres.`),
    language: Yup.string()
        .required('Es necesario un idioma.')
        .min(LANGUAGE_MIN_LENGTH, `El idioma debe contener al menos ${LANGUAGE_MIN_LENGTH.toLocaleString()} caracteres.`)
        .max(LANGUAGE_MAX_LENGTH, `El idioma no debe exceder los ${LANGUAGE_MAX_LENGTH.toLocaleString()} caracteres.`),
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
                    .min(AUTHOR_FIRST_NAME_MIN_LENGTH, `El nombre debe contener al menos ${AUTHOR_FIRST_NAME_MIN_LENGTH.toLocaleString()} caracteres.`)
                    .max(AUTHOR_FIRST_NAME_MAX_LENGTH, `El nombre no debe exceder los ${AUTHOR_FIRST_NAME_MAX_LENGTH.toLocaleString()} caracteres.`),
                lastName: Yup.string()
                    .required('Es necesario un apellido.')
                    .min(AUTHOR_LAST_NAME_MIN_LENGTH, `El apellido debe contener al menos ${AUTHOR_LAST_NAME_MIN_LENGTH.toLocaleString()} caracteres.`)
                    .max(AUTHOR_LAST_NAME_MAX_LENGTH, `El apellido no debe exceder los ${AUTHOR_LAST_NAME_MAX_LENGTH.toLocaleString()} caracteres.`)
            })
        )
        .min(AUTHOR_MIN_AMOUNT, `Debe haber al menos ${AUTHOR_MIN_AMOUNT.toLocaleString()} autor.`)
        .max(AUTHOR_MAX_AMOUNT, `No puede haber más de ${AUTHOR_MAX_AMOUNT.toLocaleString()} autores.`),

    imageFile: Yup.mixed()
        .required('La imagen de portada es obligatoria.')
        .test('fileSize', 'El archivo debe ser menor a 10MB.', (value) => (value as File).size <= 10 * 1024 * 1024)
        .test('fileType', 'El formato de archivo no es válido. Se permiten PNG, JPEG, WEBP, AVIF.', (value) =>
            ['image/png', 'image/jpeg', 'image/webp', 'image/avif'].includes((value as File).type)
        )
})
