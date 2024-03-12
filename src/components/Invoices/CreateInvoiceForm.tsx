/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
import 'react-app-polyfill/ie11'
import * as React from 'react'
import { Formik, Field, Form, FormikHelpers, useField, useFormikContext } from 'formik'
import Select from 'react-select'
import { COMPANIES_URL, INVOICES_URL } from '../../resources/server_urls'
import { useAxiosGetCompanies } from '../../utility/CustomAxios'
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager'
import axios from 'axios'
import BootstrapForm from 'react-bootstrap/Form'
import { Container, Row, Col, Button, Collapse, Alert } from 'react-bootstrap'
import { ErrorMessage } from './InvoicesStyles'
import { useEffect, useState } from 'react'
import { IInvoice } from '../Types/Types'
import { CreateInvoiceValidationSchema } from '../../pages/validation/FormValidationSchemas'
import { FloatingNotificationContainer } from '../Common/FloatingNotificationContainer'

interface MyValues {
    label: string
    value: string
}
type MyList = MyValues[]

//define the group option type
interface GroupedOption {
    label: string // group label
    options: MyValues[]
}
// component props
type Props = {
    name: string
} & Omit<StateManagerProps<MyValues, false | true, GroupedOption>, 'value' | 'onChange'>

const FloatingNotification: React.FC<{ message: string; variant: string; onClose: () => void }> = ({ message, variant, onClose }) => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
        }, 5000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    const handleExited = () => {
        onClose()
    }

    return (
        <Collapse in={visible} onExited={handleExited}>
            <FloatingNotificationContainer>
                <Alert variant={variant} onClose={onClose} dismissible>
                    {message}
                </Alert>
            </FloatingNotificationContainer>
        </Collapse>
    )
}

const FormikReactSelect = (props: Props) => {
    const { name, ...restProps } = props
    const [field] = useField(name)
    const { setFieldValue } = useFormikContext()
    //flatten the options so that it will be easier to find the value
    const flattenedOptions = props.options?.flatMap((o) => {
        const isNotGrouped = 'value' in o
        if (isNotGrouped) {
            return o
        } else {
            return o.options
        }
    })
    //get the value using flattenedOptions and field.value
    const value = flattenedOptions?.filter((o) => {
        const isArrayValue = Array.isArray(field.value)
        if (isArrayValue) {
            const values = field.value as any[]
            return values.includes(o.value)
        } else {
            return field.value === o.value
        }
    })
    return (
        <Select
            {...restProps}
            value={value}
            // onChange implementation
            onChange={(val: any) => {
                //here I used explicit typing but there maybe a better way to type the value.
                const TempVal = val as MyValues[] | MyValues
                const isArray = Array.isArray(TempVal)
                if (isArray) {
                    const values = TempVal.map((o) => o.value)
                    setFieldValue(name, values)
                } else {
                    setFieldValue(name, TempVal.value)
                }
            }}
        />
    )
}

export interface ICreateInvoiceFormData {
    addInvoice: (newInvoice: IInvoice) => void
    data: IInvoice[]
}

const CreateInvoiceForm = (invoiceFormProps: ICreateInvoiceFormData) => {
    const { data, error, loaded } = useAxiosGetCompanies(COMPANIES_URL)
    console.log(error)
    console.log(loaded)
    const [alertMessage, setAlertMessage] = useState('')
    const [submitSuccessNotification, setSubmitSuccessNotification] = useState(false)
    const [submitErrorNotification, setSubmitErrorNotification] = useState(false)
    const mylista: MyList = []
    data.companiesList.forEach((company) => {
        mylista.push({ label: company.nif, value: company.nif } as MyValues)
    })
    const initialValues: IInvoice = {
        number: 0,
        series: '',
        expeditionDate: new Date(),
        advancePaymentDate: new Date(),
        taxExempt: false,
        sellerNif: '',
        buyerNif: ''
    }
    function changeSuccessNotificationState(): void {
        setSubmitSuccessNotification(false)
    }
    function changeErrorNotificationState(): void {
        setSubmitErrorNotification(false)
    }

    const handleSubmit = async (values: IInvoice, actions: FormikHelpers<IInvoice>) => {
        try {
            const invoiceData: IInvoice = {
                number: values.number,
                series: values.series,
                expeditionDate: values.expeditionDate,
                advancePaymentDate: values.advancePaymentDate,
                taxExempt: values.taxExempt,
                sellerNif: values.sellerNif,
                buyerNif: values.buyerNif
            }

            await axios.post<IInvoice>(INVOICES_URL, invoiceData)
            console.log(invoiceFormProps.data)
            const dateo = [...invoiceFormProps.data, invoiceData]
            console.log('DATEO:')
            console.log(dateo)
            invoiceFormProps.addInvoice(invoiceData)
            setSubmitSuccessNotification(true)
        } catch (error: any) {
            setSubmitErrorNotification(true)

            if (error.response?.data) {
                // Request made and server responded
                setAlertMessage(error.response.data.content)
            } else if (error.request) {
                // The request was made but no response was received
                setAlertMessage('Error: no hay respuesta.')
            } else {
                // Something happened in setting up the request that triggered an Error
                setAlertMessage('Error: algo inesperado. Recarga o intentalo mas tarde.')
            }
        }

        actions.resetForm()
        actions.setSubmitting(false)
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={(values: IInvoice, actions) => {
                    handleSubmit(values, actions)
                }}
                validationSchema={CreateInvoiceValidationSchema}
                validateOnChange={true}
                validateOnMount={true}
            >
                {({ isValid, isSubmitting, errors, touched }) => (
                    <BootstrapForm as={Form}>
                        <Container as={BootstrapForm.Group} fluid>
                            <Row>
                                <Col md="auto">
                                    <BootstrapForm.Label htmlFor="number">Número:</BootstrapForm.Label>
                                </Col>
                                <Col md="auto">
                                    <Field as={BootstrapForm.Control} id="number" name="number" type="number" placeholder="Put invoice number" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>{errors.number && touched.number ? <ErrorMessage>{errors.number}</ErrorMessage> : ''}</Col>
                            </Row>
                            <Row>
                                <Col md="auto">
                                    <BootstrapForm.Label htmlFor="series">Serie:</BootstrapForm.Label>
                                </Col>
                                <Col md="auto">
                                    <Field as={BootstrapForm.Control} id="series" name="series" type="text" placeholder="Put invoice series" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>{errors.series && touched.series ? <ErrorMessage>{errors.series}</ErrorMessage> : ''}</Col>
                            </Row>
                            <Row>
                                <Col md="auto">
                                    <BootstrapForm.Label htmlFor="expeditionDate">Fecha de expedición: </BootstrapForm.Label>
                                </Col>
                                <Col md="auto">
                                    <Field as={BootstrapForm.Control} id="expeditionDate" name="expeditionDate" type="date" />
                                </Col>
                            </Row>
                            <Row></Row>
                            <Row>
                                <Col md="auto">
                                    <BootstrapForm.Label htmlFor="advancePaymentDate">Fecha pago adelantado: </BootstrapForm.Label>
                                </Col>
                                <Col md="auto">
                                    <Field as={BootstrapForm.Control} id="advancePaymentDate" name="advancePaymentDate" type="date" />
                                </Col>
                            </Row>
                            <Row></Row>
                            <Row>
                                <Col md="auto">
                                    <BootstrapForm.Label htmlFor="taxExempt">Exención impuestos: </BootstrapForm.Label>
                                </Col>
                                <Col md="auto">
                                    <Field as={BootstrapForm.Check} id="taxExempt" name="taxExempt" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>{errors.taxExempt && touched.taxExempt ? <ErrorMessage>{errors.taxExempt}</ErrorMessage> : ''}</Col>
                            </Row>
                            <Row>
                                <Col md="auto">
                                    <BootstrapForm.Label htmlFor="sellerNif">NIF Vendedor: </BootstrapForm.Label>
                                </Col>
                                <Col md="auto">
                                    <FormikReactSelect name="sellerNif" isMulti={false} options={mylista} />
                                </Col>{' '}
                            </Row>
                            <Row>
                                <Col>{errors.sellerNif && touched.sellerNif ? <ErrorMessage>{errors.sellerNif}</ErrorMessage> : ''}</Col>
                            </Row>
                            <Row>
                                <Col md="auto">
                                    <BootstrapForm.Label htmlFor="buyerNif">NIF Comprador: </BootstrapForm.Label>
                                </Col>
                                <Col md="auto">
                                    <FormikReactSelect name="buyerNif" isMulti={false} options={mylista} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>{errors.buyerNif && touched.buyerNif ? <ErrorMessage>{errors.buyerNif}</ErrorMessage> : ''}</Col>
                            </Row>
                            <Row>
                                <Col className="d-flex flex-row-reverse bd-highlight">
                                    <Button variant="primary" type="submit" disabled={!isValid || isSubmitting}>
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                        {submitSuccessNotification && (
                            <FloatingNotification
                                message={'FACTURA REGISTRADA CON EXITO'}
                                variant={'success'}
                                onClose={changeSuccessNotificationState}
                            ></FloatingNotification>
                        )}
                        {submitErrorNotification && (
                            <FloatingNotification message={alertMessage} variant={'danger'} onClose={changeErrorNotificationState}></FloatingNotification>
                        )}
                    </BootstrapForm>
                )}
            </Formik>
        </div>
    )
}
export default CreateInvoiceForm
