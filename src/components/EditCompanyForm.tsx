import { Field, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { ICompany } from './Types/Types'

const EditCompanyForm = () => {
    return (
        <>
            <div>
                <h4>New data:</h4>
                <Formik
                    initialValues={{
                        nifCif: '',
                        name: '',
                        identityTaxNumber: '',
                        address: ''
                    }}
                    onSubmit={(values: ICompany, { setSubmitting }: FormikHelpers<ICompany>) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2))
                            setSubmitting(false)
                        }, 500)
                    }}
                >
                    <Form>
                        <Container>
                            <Row>
                                <Col>
                                    {' '}
                                    <label htmlFor="nifCif">Nif Cif</label>
                                </Col>
                                <Col>
                                    {' '}
                                    <Field id="nifCif" name="nifCif" placeholder="Nif or cif" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {' '}
                                    <label htmlFor="name">Name</label>
                                </Col>
                                <Col>
                                    <Field id="name" name="name" placeholder="Company name" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label htmlFor="identityTaxNumber">identity Tax Number</label>
                                </Col>
                                <Col>
                                    <Field id="identityTaxNumber" name="identityTaxNumber" placeholder="identityTaxNumber" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label htmlFor="address">address</label>
                                </Col>
                                <Col>
                                    <Field id="address" name="address" placeholder="Address" />
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
                    </Form>
                </Formik>
            </div>
        </>
    )
}

export default EditCompanyForm
