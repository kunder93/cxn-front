import { Field, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import BootstrapForm from 'react-bootstrap/Form'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { IInvoice } from '../Types/Types'
const EditInvoiceForm: React.FC = () => {
    return (
        <>
            <div>
                <Formik
                    initialValues={{
                        number: 0,
                        series: '',
                        expeditionDate: new Date(),
                        advancePaymentDate: new Date(),
                        taxExempt: false,
                        sellerNif: '',
                        buyerNif: ''
                    }}
                    onSubmit={(values: IInvoice, { setSubmitting }: FormikHelpers<IInvoice>) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2))
                            setSubmitting(false)
                        }, 500)
                    }}
                >
                    <BootstrapForm as={Form}>
                        <Container>
                            <Row>
                                <Col>
                                    {' '}
                                    <BootstrapForm.Label htmlFor="nif">NIF</BootstrapForm.Label>
                                </Col>
                                <Col>
                                    {' '}
                                    <Field as={BootstrapForm.Control} id="nif" name="nif" placeholder="NIF" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {' '}
                                    <BootstrapForm.Label htmlFor="name">Nombre</BootstrapForm.Label>
                                </Col>
                                <Col>
                                    <Field as={BootstrapForm.Control} id="name" name="name" placeholder="Company name" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <BootstrapForm.Label htmlFor="address">Direccion</BootstrapForm.Label>
                                </Col>
                                <Col>
                                    <Field as={BootstrapForm.Control} id="address" name="address" placeholder="Address" />
                                </Col>
                            </Row>
                        </Container>
                        <Row>
                            <Col className="d-flex flex-row-reverse bd-highlight">
                                <Button type="submit" variant="primary">
                                    Update Company
                                </Button>
                            </Col>
                        </Row>
                    </BootstrapForm>
                </Formik>
            </div>
        </>
    )
}

export default EditInvoiceForm
