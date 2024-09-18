import React from 'react'
import { ErrorMessage, Field, Form, Formik, FormikHelpers, useField, useFormikContext } from 'formik'
import { INVOICES_URL, PAYMENT_SHEET_URL } from '../../resources/server_urls'
import { useAxiosGetInvoices } from '../../utility/CustomAxios'
import axios, { AxiosError } from 'axios'
import { Button, Col, Container, FormSelect, Row, Spinner } from 'react-bootstrap'
import BootstrapForm from 'react-bootstrap/Form'
import { InvoicesSelectorProps, NewRegularTransportData, SelectorOption, TransportCategorySelectorProps } from './Types'
import styled from 'styled-components'
import * as Yup from 'yup'
import FloatingNotificationA from '../../components/Common/FloatingNotificationA'
import useNotification, { NotificationType } from '../../components/Common/hooks/useNotification'

const StyledErrorMessage = styled(ErrorMessage)`
    color: red;
    font-weight: bold;
`
const FieldRow = styled(Row)`
    padding-bottom: 1em;
    align-items: center;
    label {
        font-weight: bold;
    }
`

const FormRow = styled(Row)`
    align-items: baseline;
`

const Label = styled(BootstrapForm.Label)`
    font-weight: bold;
`

const SubmitButtonRow = styled(Row)`
    align-content: end;
`

// TransportCategorySelector component
const TransportCategorySelector: React.FC<TransportCategorySelectorProps> = ({ name, options }) => {
    const [field] = useField(name)
    const { setFieldValue } = useFormikContext()

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value
        setFieldValue(name, selectedValue).catch((error) => {
            console.error(`Error setting field value for ${name}:`, error)
        })
    }

    return (
        <FormSelect {...field} onChange={handleChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </FormSelect>
    )
}

const CustomSelector: React.FC<InvoicesSelectorProps> = ({ name, secondName, options }) => {
    const { values, setFieldValue } = useFormikContext<NewRegularTransportData>()


    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = options.find((option) => `${option.value}-${option.value2}` === event.target.value)
        if (selectedOption) {
            void setFieldValue(name, selectedOption.value)
            void setFieldValue(secondName, selectedOption.value2)
        }
    }

    // Combinar valores para mostrar en el selector
    const combinedValue = `${values.invoiceSeries}-${values.invoiceNumber}`

    return (
        <FormSelect onChange={handleChange} value={combinedValue}>
            {options.map((option) => (
                <option key={`${option.value}-${option.value2}`} value={`${option.value}-${option.value2}`}>
                    {option.label}
                </option>
            ))}
        </FormSelect>
    )
}

const validationSchema = Yup.object({
    description: Yup.string()
        .required('Es necesaria una descripción.')
        .min(10, 'La descripción debe tener más caracteres.')
        .max(100, 'No debe exceder los 100 caracteres.')
})

// AddRegularTransportForm component
const AddRegularTransportForm: React.FC<{ paymentSheetId: number }> = ({ paymentSheetId }) => {
    const { data: invoicesData, error, loaded } = useAxiosGetInvoices(INVOICES_URL)
    const { notification, showNotification, hideNotification } = useNotification()

    if (error) {
        console.error('Error loading invoices:', error)
    }

    const invoicesList: SelectorOption[] =
        invoicesData?.invoicesList.map((invoice) => ({
            label: `${invoice.series} ${invoice.number}`,
            value: invoice.series,
            value2: invoice.number
        })) ?? []

    return (
        <Formik
            validateOnMount
            validationSchema={validationSchema}
            initialValues={{
                category: '',
                description: '',
                invoiceNumber: 0,
                invoiceSeries: ''
            }}
            onSubmit={async (values: NewRegularTransportData, { setSubmitting }: FormikHelpers<NewRegularTransportData>) => {
                try {
                    const response = await axios.post(`${PAYMENT_SHEET_URL}/${paymentSheetId}/addRegularTransport`, values)
                    console.log(response)
                    showNotification('El transporte regular se ha añadido correctamente', NotificationType.Success)
                } catch (error) {
                    const axiosError = error as AxiosError
                    showNotification(axiosError.message, NotificationType.Error)
                } finally {
                    setSubmitting(false)
                }
            }}
        >
            {({ isSubmitting, isValid, dirty }) => (
                <BootstrapForm as={Form}>
                    <Container as={BootstrapForm.Group} fluid>
                        <FieldRow className="mb-3">
                            <Col md={3}>
                                <Label htmlFor="category">Seleccione un tipo de transporte:</Label>
                            </Col>
                            <Col md={9}>
                                <TransportCategorySelector
                                    name="category"
                                    options={[
                                        { label: 'metro', value: 'metro' },
                                        { label: 'tren', value: 'tren' },
                                        { label: 'autobus', value: 'autobus' },
                                        { label: 'taxi', value: 'taxi' },
                                        { label: 'otro', value: 'otro' }
                                    ]}
                                />
                            </Col>
                        </FieldRow>

                        <FieldRow className="mb-3">
                            <Col md={3}>
                                <Label htmlFor="description">Descripción:</Label>
                            </Col>
                            <Col md={9}>
                                <BootstrapForm.Control
                                    as={Field}
                                    id="description"
                                    name="description"
                                    type="text"
                                    placeholder="Descripción del transporte."
                                    component={'textarea'}
                                    rows={4}
                                />
                                <StyledErrorMessage component={'p'} name={'description'}></StyledErrorMessage>
                            </Col>
                        </FieldRow>

                        <FormRow className="mb-3">
                            <Col md={3}>
                                <Label htmlFor="invoice">Seleccione la factura:</Label>
                            </Col>
                            <Col md="auto">
                                {loaded ? (
                                    <CustomSelector name="invoiceSeries" secondName="invoiceNumber" options={invoicesList} />
                                ) : (
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                )}
                            </Col>
                        </FormRow>

                        <SubmitButtonRow>
                            <Button variant="success" disabled={isSubmitting || !isValid || !dirty} type="submit">
                                {isSubmitting ? (
                                    <>
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Añadiendo...
                                    </>
                                ) : (
                                    ' Añadir transporte regular'
                                )}
                            </Button>
                        </SubmitButtonRow>
                    </Container>
                    <FloatingNotificationA notification={notification} hideNotification={hideNotification} />
                </BootstrapForm>
            )}
        </Formik>
    )
}

export default AddRegularTransportForm
