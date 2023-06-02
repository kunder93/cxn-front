import 'react-app-polyfill/ie11'
import * as React from 'react'
import { Formik, Field, Form, FormikHelpers, useField, useFormikContext } from 'formik'
import Select from 'react-select'
import { INVOICES_URL, PAYMENT_SHEET_URL } from '../resources/server_urls'
import { useAxiosGetInvoices } from '../utility/CustomAxios'
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager'
import axios from 'axios'
import BootstrapForm from 'react-bootstrap/Form'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'

interface Values {
    category: string
    description: string
    place: string
    startDate: string
    endDate: string
}

interface MyValues {
    label: string
    value: string
}
type MyList = MyValues[]

//define the group option type
type GroupedOption = {
    label: string // group label
    options: MyValues[]
}
// component props
type Props = {
    name: string
} & Omit<StateManagerProps<MyValues, false | true, GroupedOption>, 'value' | 'onChange'>

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
            const values = field.value as Array<any>
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
            onChange={(val) => {
                //here I used explicit typing but there maybe a better way to type the value.
                const _val = val as MyValues[] | MyValues
                const isArray = Array.isArray(_val)
                if (isArray) {
                    const values = _val.map((o) => o.value)
                    setFieldValue(name, values)
                } else {
                    setFieldValue(name, _val.value)
                }
            }}
        />
    )
}

const AddRegularTransportForm = (props: any) => {
    const { data, error, loaded } = useAxiosGetInvoices(INVOICES_URL)
    const navigate = useNavigate()
    const mylista: MyList = []
    data.invoicesList.forEach((invoice) => {
        mylista.push({ label: invoice.series + ' ' + invoice.number, value: invoice.series + ' ' + invoice.number } as MyValues)
    })
    console.log(mylista + 'Y')
    return (
        <div>
            <Formik
                initialValues={{
                    category: '',
                    description: '',
                    place: '',
                    startDate: '',
                    endDate: ''
                }}
                onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
                    setSubmitting(false)
                    axios
                        .post(PAYMENT_SHEET_URL +"/paymentSheetId/addRegularTransport", values)
                        .then(function (response) {
                            console.log(response)
                            navigate(0)
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
                                <BootstrapForm.Label htmlFor="category">Categoría:</BootstrapForm.Label>
                            </Col>
                            <Col md="auto">
                                <Field as={BootstrapForm.Control} id="category" name="category" type="text" placeholder="Tipo de transporte." />
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
                                <BootstrapForm.Label htmlFor="invoice">Seleccione una factura:</BootstrapForm.Label>
                            </Col>
                            <Col md="auto">
                                <FormikReactSelect name="invoice" isMulti={false} options={mylista} />
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
