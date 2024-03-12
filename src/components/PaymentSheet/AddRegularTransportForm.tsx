/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Field, Form, Formik, FormikHelpers, useField, useFormikContext } from 'formik'
import * as React from 'react'
import 'react-app-polyfill/ie11'
import { INVOICES_URL, PAYMENT_SHEET_URL } from '../../resources/server_urls'
import { useAxiosGetInvoices } from '../../utility/CustomAxios'
import axios from 'axios'
import { Button, Col, Container, FormSelect, Row } from 'react-bootstrap'
import BootstrapForm from 'react-bootstrap/Form'
import { InvoicesSelectorProps, NewRegularTransportData, SelectorOption, TransportCategorySelectorProps } from './Types'

const TransportCategorySelector: React.FC<TransportCategorySelectorProps> = ({ name, options }) => {
    const [field, helpers] = useField(name)
    console.log(helpers)
    const { setFieldValue } = useFormikContext()

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value
        setFieldValue(name, selectedValue)
    }
    return (
        <FormSelect name={name} value={field.value} onChange={handleChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </FormSelect>
    )
}

const CustomSelector: React.FC<InvoicesSelectorProps> = ({ name, secondName, options }) => {
    const [field1, helpers1] = useField(name)
    console.log(helpers1)
    const { setFieldValue } = useFormikContext()

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = options.find((option) => option.value === event.target.value)
        setFieldValue(name, selectedOption?.value ?? '')
        setFieldValue(secondName, selectedOption?.value2 ?? '')
    }
    return (
        <FormSelect name={name} value={field1.value} onChange={handleChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </FormSelect>
    )
}

const AddRegularTransportForm = (props: any) => {
    const { data, error, loaded } = useAxiosGetInvoices(INVOICES_URL)
    console.log(error)
    console.log(loaded)
    const invoicesList: SelectorOption[] = []
    data.invoicesList.forEach((invoice) => {
        invoicesList.push({ label: invoice.series + ' ' + invoice.number, value: invoice.series, value2: invoice.number } as SelectorOption)
    })
    return (
        <div>
            <Formik
                initialValues={{
                    category: '',
                    description: '',
                    invoiceNumber: 0,
                    invoiceSeries: ''
                }}
                onSubmit={(values: NewRegularTransportData, { setSubmitting }: FormikHelpers<NewRegularTransportData>) => {
                    console.log(props.data)
                    setSubmitting(false)
                    axios
                        .post(PAYMENT_SHEET_URL + '/' + props.data + '/addRegularTransport', values)
                        .then(function (response) {
                            console.log(response)
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                }}
            >
                <BootstrapForm as={Form}>
                    <Container as={BootstrapForm.Group} fluid>
                        <Row>
                            <Col md="auto">
                                <BootstrapForm.Label htmlFor="category">Seleccione un tipo de transporte:</BootstrapForm.Label>
                            </Col>
                            <Col md="auto">
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
                        </Row>

                        <Row>
                            <Col md="auto">
                                <BootstrapForm.Label htmlFor="description">Descripción:</BootstrapForm.Label>
                            </Col>
                            <Col md="auto">
                                <Field as={BootstrapForm.Control} id="description" name="description" type="text" placeholder="Descripción del transporte." />
                            </Col>
                        </Row>

                        <Row>
                            <Col md="auto">
                                <BootstrapForm.Label htmlFor="invoice">Seleccione la factura:</BootstrapForm.Label>
                            </Col>
                            <Col md="auto">
                                <CustomSelector name="invoiceSeries" secondName="invoiceNumber" options={invoicesList} />
                            </Col>
                        </Row>

                        <Row>
                            <Col className="d-flex flex-row-reverse bd-highlight">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </BootstrapForm>
            </Formik>
        </div>
    )
}

export default AddRegularTransportForm
