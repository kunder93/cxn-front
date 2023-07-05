import { Field, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import BootstrapForm from 'react-bootstrap/Form'
import { ICompany } from './Types'
const EditCompanyForm = () => {
    return (
        <>
            <div>
                <Formik
                    initialValues={{
                        nif: '',
                        name: '',
                        address: ''
                    }}
                    onSubmit={(values: ICompany, { setSubmitting }: FormikHelpers<ICompany>) => {
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

export default EditCompanyForm
