import { Field, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { ICompany } from './Types/Types'
import BootstrapForm from 'react-bootstrap/Form'
const EditCompanyForm = () => {
    return (
        <>
            <div>
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
                    <BootstrapForm as={Form}>
                        <Container>
                            <Row>
                                <Col>
                                    {' '}
                                    <BootstrapForm.Label htmlFor="nifCif">NIF o CIF</BootstrapForm.Label>
                                </Col>
                                <Col>
                                    {' '}
                                    <Field as={BootstrapForm.Control} id="nifCif" name="nifCif" placeholder="Nif or cif" />
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
                                    <BootstrapForm.Label htmlFor="identityTaxNumber">Nº identificacion fiscal</BootstrapForm.Label>
                                </Col>
                                <Col>
                                    <Field as={BootstrapForm.Control} id="identityTaxNumber" name="identityTaxNumber" placeholder="identityTaxNumber" />
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
