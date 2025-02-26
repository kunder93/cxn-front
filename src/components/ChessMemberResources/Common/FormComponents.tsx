import { DateWrapper, DropzoneContainer, ErrorContainer } from './FormStyles'
import { Form as BootstrapForm } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import { ErrorMessage, Field, FormikErrors } from 'formik'
import Dropzone from 'react-dropzone'

export interface GenericDateFieldProps<T> {
    publishDate: Date | null
    setFieldValue: (field: string, value: Date | null, shouldValidate?: boolean) => Promise<void | FormikErrors<T>>
    setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => Promise<void | FormikErrors<T>>
    validateField: (field: string) => Promise<string | undefined> | Promise<void>
}

export function DateField<T>({ publishDate, setFieldValue, setFieldTouched, validateField }: Readonly<GenericDateFieldProps<T>>) {
    return (
        <DateWrapper>
            <BootstrapForm.Label htmlFor="publishDate">Fecha de publicación:</BootstrapForm.Label>
            <DatePicker
                id="publishDate"
                selected={publishDate}
                onChange={(date: Date | null) => {
                    void setFieldValue('publishDate', date)
                        .then(() => void setFieldTouched('publishDate', true))
                        .catch((error: unknown) => {
                            console.error('Error setting/touching publishDate:', error)
                        })
                }}
                // onSelect simply triggers validation.
                onSelect={() => async () => {
                    await validateField('publishDate')
                }}
                dateFormat={'dd/MM/yyyy'}
                className="form-control"
                locale="es"
                showYearDropdown
                placeholderText="Seleccione"
                maxDate={new Date()}
                aria-label="Fecha de inicio"
                aria-describedby="publishDateError"
            />
            <ErrorContainer>
                <ErrorMessage name="publishDate" component="div" />
            </ErrorContainer>
        </DateWrapper>
    )
}

interface FormTextFieldProps {
    label: string
    name: string
    type?: string
    placeholder?: string
    as?: string // Pass 'textarea' if you need a multiline input.
    ariaLabel?: string
    ariaDescribedBy?: string
}

export const FormTextField: React.FC<FormTextFieldProps> = ({ label, name, type = 'text', placeholder, as, ariaLabel, ariaDescribedBy }) => {
    return (
        <div className="mb-3">
            <BootstrapForm.Label htmlFor={name}>{label}</BootstrapForm.Label>
            <Field
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                as={as} // If provided (for example "textarea"), otherwise defaults to input.
                className="form-control"
                aria-label={ariaLabel ?? label}
                aria-describedby={ariaDescribedBy ?? `${name}Error`}
            />
            <ErrorContainer>
                <ErrorMessage name={name} component="div" />
            </ErrorContainer>
        </div>
    )
}
export interface CoverImageDropzoneProps {
    /** The Formik field name (for example, "imageFile"). */
    fieldName: string
    /**
     * Formik’s setFieldValue function.
     * Use this to update the image file in your Formik state.
     */
    setFieldValue: (field: string, value: File | null, shouldValidate?: boolean) => Promise<void | FormikErrors<unknown>>
    /**
     * The preview URL for the image.
     * This is managed by the parent component.
     */
    previewUrl: string | null
    /**
     * Optional error message (for example, errors.imageFile)
     */
    error?: string
    /**
     * A string to indicate which type of cover this is.
     * This will change the displayed text/aria labels.
     * Defaults to "libro".
     */
    coverType?: 'libro' | 'revista'
    /**
     * Callback that notifies the parent when a file is dropped,
     * so that the parent can update its preview URL.
     */
    onPreviewUrlChange?: (previewUrl: string | null) => void
}

export const CoverImageDropzone: React.FC<CoverImageDropzoneProps> = ({
    fieldName,
    setFieldValue,
    previewUrl,
    error,
    coverType = 'libro',
    onPreviewUrlChange
}) => {
    const handleDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        if (file instanceof File) {
            // Update Formik's field value for the image file.
            setFieldValue(fieldName, file)
                .then(() => {
                    const url = URL.createObjectURL(file)
                    // Notify the parent to update its preview URL.
                    if (onPreviewUrlChange) {
                        onPreviewUrlChange(url)
                    }
                })
                .catch((error: unknown) => {
                    console.error('Error setting image file:', error)
                    throw error
                })
        }
    }

    // Configure text and aria labels based on the cover type.
    const dropzoneAriaLabel = coverType === 'revista' ? 'Zona de carga de portada de la revista.' : 'Zona de carga de portada del libro.'
    const inputAriaLabel = coverType === 'revista' ? 'Cargar imagen portada revista.' : 'Cargar imagen portada libro.'
    const placeholderText =
        coverType === 'revista'
            ? 'Arrastra aquí la imagen de la portada de la revista o haz clic para añadir una.'
            : 'Arrastra aquí la imagen de la portada del libro o haz clic para añadir una.'

    return (
        <div>
            <BootstrapForm.Label htmlFor={fieldName}>Imagen de portada:</BootstrapForm.Label>
            <DropzoneContainer>
                <Dropzone
                    onDrop={handleDrop}
                    accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg', '.jpg'], 'image/webp': ['.webp'], 'image/avif': ['.avif'] }}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} aria-label={dropzoneAriaLabel} aria-describedby="imageFileError">
                            <input {...getInputProps()} id={fieldName} aria-label={inputAriaLabel} />
                            {previewUrl ? <img src={previewUrl} alt="Vista previa de la imagen" /> : <p>{placeholderText}</p>}
                        </div>
                    )}
                </Dropzone>
            </DropzoneContainer>
            {error && (
                <ErrorContainer style={{ marginBottom: '1rem' }}>
                    <p>{error}</p>
                </ErrorContainer>
            )}
        </div>
    )
}
