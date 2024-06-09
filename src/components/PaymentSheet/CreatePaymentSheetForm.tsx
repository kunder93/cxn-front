/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
import 'react-app-polyfill/ie11'
import * as React from 'react'
import { Formik, Field, Form, FormikHelpers, useField, useFormikContext } from 'formik'
import Select from 'react-select'
import { PAYMENT_SHEET_URL } from '../../resources/server_urls'
import { useAxiosGetAllUsersData } from '../../utility/CustomAxios'
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager'
import axios from 'axios'
import BootstrapForm from 'react-bootstrap/Form'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'

interface Values {
    userEmail: string
    reason: string
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
interface GroupedOption {
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
            onChange={(val) => {
                //here I used explicit typing but there maybe a better way to type the value.
                const tempVal = val as MyValues[] | MyValues
                const isArray = Array.isArray(tempVal)
                if (isArray) {
                    const values = tempVal.map((o) => o.value)
                    setFieldValue(name, values)
                } else {
                    setFieldValue(name, tempVal.value)
                }
            }}
        />
    )
}

const CreateInvoiceForm: React.FC = () => {
    const { data, error, loaded } = useAxiosGetAllUsersData()
    console.log(error)
    console.log(loaded)
    const navigate = useNavigate()
    const mylista: MyList = []
    data.usersList.forEach((user) => {
        mylista.push({ label: user.name + ' ' + user.firstSurname + ' ' + user.secondSurname, value: user.email } as MyValues)
    })
    return (
        <div>
            <Formik
                initialValues={{
                    userEmail: '',
                    reason: '',
                    place: '',
                    startDate: '',
                    endDate: ''
                }}
                onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
                    setSubmitting(false)
                    axios
                        .post(PAYMENT_SHEET_URL, values)
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
                                <BootstrapForm.Label htmlFor="userEmail">Seleccione quien recibe el pago:</BootstrapForm.Label>
                            </Col>
                            <Col md="auto">
                                <FormikReactSelect name="userEmail" isMulti={false} options={mylista} />
                            </Col>{' '}
                        </Row>

                        <Row>
                            <Col md="auto">
                                <BootstrapForm.Label htmlFor="reason">Motivo do abono:</BootstrapForm.Label>
                            </Col>
                            <Col md="auto">
                                <Field as={BootstrapForm.Control} id="reason" name="reason" type="text" placeholder="La causa/evento que produce el pago." />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="auto">
                                <BootstrapForm.Label htmlFor="place">Lugar e pais:</BootstrapForm.Label>
                            </Col>
                            <Col md="auto">
                                <Field as={BootstrapForm.Control} id="place" name="place" type="text" placeholder="Lugar e pais." />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="auto">
                                <BootstrapForm.Label htmlFor="startDate">Fecha comienzo actividad: </BootstrapForm.Label>
                            </Col>
                            <Col md="auto">
                                <Field as={BootstrapForm.Control} id="startDate" name="startDate" type="date" />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="auto">
                                <BootstrapForm.Label htmlFor="endDate">Fecha fin de la actividad: </BootstrapForm.Label>
                            </Col>
                            <Col md="auto">
                                <Field as={BootstrapForm.Control} id="endDate" name="endDate" type="date" />
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
