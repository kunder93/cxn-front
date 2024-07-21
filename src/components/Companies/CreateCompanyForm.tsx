import React from 'react'
import { FormikProps } from 'formik'
import { Col, Container, Row } from 'react-bootstrap'
import BootstrapForm from 'react-bootstrap/Form'
import { CreateCompanyFormValues } from './Types'
import styled from 'styled-components'

const InputLabel = styled(BootstrapForm.Label)`
    font-weight: bold;
`

const StyledErrorMessage = styled.div`
    color: #e20101;
    font-weight: bold;
`

interface CreateCompanyFormProps {
    formik: FormikProps<CreateCompanyFormValues>
}

const CreateCompanyForm: React.FC<CreateCompanyFormProps> = ({ formik }) => {
    return (
        <Container>
            <BootstrapForm onSubmit={formik.handleSubmit}>
                <Container as={BootstrapForm.Group}>
                    <Row>
                        <Col>
                            <InputLabel htmlFor="nif">NIF - CIF:</InputLabel>
                            <BootstrapForm.Control
                                id="nif"
                                name="nif"
                                type="text"
                                placeholder="El NIF o CIF"
                                value={formik.values.nif}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.nif && formik.errors.nif && <StyledErrorMessage>{formik.errors.nif}</StyledErrorMessage>}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputLabel htmlFor="name">Nombre:</InputLabel>
                            <BootstrapForm.Control
                                id="name"
                                name="name"
                                type="text"
                                placeholder="El nombre"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.name && formik.errors.name && <StyledErrorMessage>{formik.errors.name}</StyledErrorMessage>}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputLabel htmlFor="address">Direccion:</InputLabel>
                            <BootstrapForm.Control
                                id="address"
                                name="address"
                                type="text"
                                placeholder="La direccion"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.address && formik.errors.address && <StyledErrorMessage>{formik.errors.address}</StyledErrorMessage>}
                        </Col>
                    </Row>
                </Container>
            </BootstrapForm>
        </Container>
    )
}

export default CreateCompanyForm
