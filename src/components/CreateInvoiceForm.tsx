import 'react-app-polyfill/ie11'
import * as React from 'react'
import { Formik, Field, Form, FormikHelpers, useField, useFormikContext } from 'formik'
import Select from 'react-select'
import { COMPANIES_URL, INVOICES_URL } from '../resources/server_urls'
import { useAxiosGetCompanies } from '../utility/CustomAxios'
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager'
import axios from 'axios'
import BootstrapForm from 'react-bootstrap/Form'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'

interface Values {
    number: string
    series: string
    expeditionDate: string
    advancePaymentDate: string
    taxExempt: string
    sellerNif: string
    buyerNif: string
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

const CreateInvoiceForm = () => {
    const { data, error, loaded } = useAxiosGetCompanies(COMPANIES_URL)
    const navigate = useNavigate()
    const mylista: MyList = []
    data.companiesList.forEach((company) => {
        mylista.push({ label: company.nif, value: company.nif } as MyValues)
    })
    return (
        <div>
            <Formik
                initialValues={{
                    number: '',
                    series: '',
                    expeditionDate: '',
                    advancePaymentDate: '',
                    taxExempt: 'false',
                    sellerNif: '',
                    buyerNif: ''
                }}
                onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
                    setSubmitting(false)
                    axios
                        .post(INVOICES_URL, values)
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
                                <BootstrapForm.Label htmlFor="number">Invoice number</BootstrapForm.Label>
                            </Col>
                            <Col md="auto">
                                <Field as={BootstrapForm.Control} id="number" name="number" type="number" placeholder="Put invoice number" />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="auto">
                                <BootstrapForm.Label htmlFor="series">Invoice series</BootstrapForm.Label>
                            </Col>
                            <Col md="auto">
                                <Field as={BootstrapForm.Control} id="series" name="series" type="text" placeholder="Put invoice series" />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="auto">
                                <BootstrapForm.Label htmlFor="expeditionDate">Invoice expedition date </BootstrapForm.Label>
                            </Col>
                            <Col md="auto">
                                <Field as={BootstrapForm.Control} id="expeditionDate" name="expeditionDate" type="date" />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="auto">
                                <BootstrapForm.Label htmlFor="advancePaymentDate">Invoice advance payment date </BootstrapForm.Label>
                            </Col>
                            <Col md="auto">
                                <Field as={BootstrapForm.Control} id="advancePaymentDate" name="advancePaymentDate" type="date" />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="auto">
                                <BootstrapForm.Label htmlFor="taxExempt">Invoice tax exempt </BootstrapForm.Label>
                            </Col>
                            <Col md="auto">
                                <Field as={BootstrapForm.Check} id="taxExempt" name="taxExempt" />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="auto">
                                <BootstrapForm.Label htmlFor="sellerNif">Invoice seller cif or nif </BootstrapForm.Label>
                            </Col>
                            <Col md="auto">
                                <FormikReactSelect name="sellerNif" isMulti={false} options={mylista} />
                            </Col>{' '}
                        </Row>
                        <Row>
                            <Col md="auto">
                                <BootstrapForm.Label htmlFor="buyerNif">Invoice buyer cif or nif </BootstrapForm.Label>
                            </Col>
                            <Col md="auto">
                                <FormikReactSelect name="buyerNif" isMulti={false} options={mylista} />
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
export default CreateInvoiceForm
