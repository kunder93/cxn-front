/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Field, FormikErrors, FormikProps } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import BootstrapForm from 'react-bootstrap/Form'
import styled from 'styled-components'
import { SignUpFormValues } from './SignUpFormTypes'
import { ICountryData, ISubCountriesList, ISubCountryData } from '../Types/Types'
import { useAxiosGetCountriesList } from '../../utility/CustomAxios'
import axios from 'axios'
import { GET_SUBCOUNTRIES_URL } from '../../resources/server_urls'

const ErrorMessage = styled.div`
    color: red;
`
export interface SignUpFormSecondStepData {
    formikProps: FormikProps<SignUpFormValues>
    previousStepFunction: any
    nextStepFunction: any
}
const isThirdStepNextButtonDisabled = (formikProps: FormikProps<SignUpFormValues>): boolean => {
    const formErrors: FormikErrors<SignUpFormValues> = formikProps.errors
    let isBlocked = true
    formErrors.postalCode
        ? (isBlocked = true)
        : formErrors.apartmentNumber
        ? (isBlocked = true)
        : formErrors.building
        ? (isBlocked = true)
        : formErrors.street
        ? (isBlocked = true)
        : (isBlocked = false)
    return isBlocked
}

const SignUpFormThirdStep: React.FC<SignUpFormSecondStepData> = (data: SignUpFormSecondStepData) => {
    const [selectedCountryNumber, setSelectedCountry] = useState<number>()
    const countriesList = useAxiosGetCountriesList()

    const handleSubCountryChange = (event: any, formikProps: any) => {
        const selectedCountry = event.target.value
        formikProps.setFieldValue('countrySubdivisionName', selectedCountry)
    }

    // Function to handle the country field change
    const handleCountryChange = (event: any, formikProps: any) => {
        const selectedCountry = event.target.value
        formikProps.setFieldValue('countryNumericCode', selectedCountry)

        setSelectedCountry(selectedCountry)
    }
    const [subCountriesList, setSubCountriesList] = useState<ISubCountriesList>({ subCountryList: [] })
    useEffect(() => {
        axios
            .get(GET_SUBCOUNTRIES_URL + '/' + selectedCountryNumber)
            .then((response) => {
                setSubCountriesList(response.data)
            })
            .catch((error) => {
                if (error.response.data) {
                    // Request made and server responded
                } else if (error.request) {
                    // The request was made but no response was received
                } else {
                    // Something happened in setting up the request that triggered an Error
                }
            })
    }, [selectedCountryNumber])

    return (
        <Container>
            <Row>
                <Col>
                    <BootstrapForm.Label htmlFor="postalCode">Código postal:</BootstrapForm.Label>
                    <Field as={BootstrapForm.Control} id="postalCode" name="postalCode" type="text" placeholder="Código postal" />
                </Col>
            </Row>
            <Row>
                <Col>
                    {data.formikProps.errors.postalCode && data.formikProps.touched.postalCode ? (
                        <ErrorMessage>{data.formikProps.errors.postalCode}</ErrorMessage>
                    ) : (
                        ''
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <BootstrapForm.Label htmlFor="apartmentNumber">Número:</BootstrapForm.Label>
                    <Field as={BootstrapForm.Control} id="apartmentNumber" name="apartmentNumber" type="text" placeholder="El número de tu vivienda" />
                </Col>
            </Row>
            <Row>
                <Col>
                    {data.formikProps.errors.apartmentNumber && data.formikProps.touched.apartmentNumber ? (
                        <ErrorMessage>{data.formikProps.errors.apartmentNumber}</ErrorMessage>
                    ) : (
                        ''
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <BootstrapForm.Label htmlFor="building">Casa/Edificio:</BootstrapForm.Label>
                    <Field as={BootstrapForm.Control} id="building" name="building" type="text" placeholder="Casa o edificio" />
                </Col>
            </Row>
            <Row>
                <Col>
                    {data.formikProps.errors.building && data.formikProps.touched.building ? (
                        <ErrorMessage>{data.formikProps.errors.building}</ErrorMessage>
                    ) : (
                        ''
                    )}
                </Col>
            </Row>

            <Row>
                <Col>
                    <BootstrapForm.Label htmlFor="street">Calle:</BootstrapForm.Label>
                    <Field as={BootstrapForm.Control} id="street" name="street" type="text" placeholder="Nombre de la calle" />
                </Col>
            </Row>
            <Row>
                <Col>
                    {data.formikProps.errors.street && data.formikProps.touched.street ? <ErrorMessage>{data.formikProps.errors.street}</ErrorMessage> : ''}
                </Col>
            </Row>

            <Row>
                <Col>
                    <BootstrapForm.Label htmlFor="city">Ciudad/Población:</BootstrapForm.Label>
                    <Field as={BootstrapForm.Control} id="city" name="city" type="text" placeholder="ciudad o población" />
                </Col>
            </Row>
            <Row>
                <Col>{data.formikProps.errors.city && data.formikProps.touched.city ? <ErrorMessage>{data.formikProps.errors.city}</ErrorMessage> : ''}</Col>
            </Row>

            <Row className="mb-3">
                <Col>
                    <BootstrapForm.Label>País:</BootstrapForm.Label>
                    <Field
                        as={BootstrapForm.Select}
                        name="country"
                        onChange={(event: any) => {
                            handleCountryChange(event, data.formikProps)
                        }}
                    >
                        {countriesList.loaded
                            ? countriesList.data.countryList.map((country: ICountryData) => (
                                  <option key={country.numericCode} value={country.numericCode}>
                                      {country.fullName}
                                  </option>
                              ))
                            : ''}
                    </Field>
                    <BootstrapForm.Text className="text-muted">Selecciona tu país</BootstrapForm.Text>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col>
                    <BootstrapForm.Label>SUBPaís:</BootstrapForm.Label>
                    <Field
                        as={BootstrapForm.Select}
                        name="countrySubdivisionName"
                        onChange={(event: any) => {
                            handleSubCountryChange(event, data.formikProps)
                        }}
                    >
                        {subCountriesList.subCountryList ? (
                            subCountriesList.subCountryList.map((subcountry: ISubCountryData) => (
                                <option key={subcountry.code} value={subcountry.name}>
                                    {subcountry.name}
                                </option>
                            ))
                        ) : (
                            <option value="">Loading countries...</option>
                        )}
                    </Field>
                    <BootstrapForm.Text className="text-muted">Selecciona tu país</BootstrapForm.Text>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button variant="primary" onClick={data.previousStepFunction}>
                        Atras
                    </Button>
                    <Button variant="primary" onClick={data.nextStepFunction} disabled={isThirdStepNextButtonDisabled(data.formikProps)}>
                        Siguiente
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default SignUpFormThirdStep
