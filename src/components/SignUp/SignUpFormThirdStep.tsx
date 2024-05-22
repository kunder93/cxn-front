import React, { useCallback, useMemo, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import BootstrapForm from 'react-bootstrap/Form'
import { SignUpFormStepProps, SignUpFormValues } from './SignUpFormTypes'
import { ICountryData, ISubCountryData } from '../Types/Types'
import { useAxiosGetCountriesList } from '../../utility/CustomAxios'
import FormField from './FormField'
import { Field, FormikProps } from 'formik'
import useSubCountries from './CustomHooks/useSubCountries'
import styled from 'styled-components'

const ButtonRow = styled(Row)`
    display: flex;
    padding-top: 0.5em;
    padding-bottom: 1em;
`
const ButtonCol = styled(Col)`
    display: flex;
    flex-direction: row-reverse;
`
const MainContainer = styled(Container)`
    padding-top: 1em;
    padding-bottom: 10em;
`

const FormStyledContainer = styled.div`
    background-color: rgba(250, 238, 168, 0.219);
    box-shadow:
        0 0.5em 0.5em -0.3em rgba(0, 0, 0, 0.3),
        0.5em 0 0.5em -0.3em rgba(0, 0, 0, 0.3);
    padding: 1em;
    padding-left: 14em;
    padding-right: 14em;
    border-radius: 5px;
`

const isThirdStepNextButtonDisabled = ({ errors, values }: FormikProps<SignUpFormValues>): boolean => {
    return !!(
        errors.postalCode ??
        errors.apartmentNumber ??
        errors.building ??
        errors.street ??
        errors.city ??
        !values.countryNumericCode ??
        !values.countrySubdivisionName
    )
}

const SignUpFormThirdStep: React.FC<SignUpFormStepProps> = ({ formikProps, previousStepFunction, nextStepFunction }) => {
    const [selectedCountryNumber, setSelectedCountry] = useState<number | undefined>()
    const countriesList = useAxiosGetCountriesList()
    const { subCountriesList, loading: subCountriesLoading, error: subCountriesError } = useSubCountries(selectedCountryNumber)

    const isNextButtonDisabled = useMemo(() => isThirdStepNextButtonDisabled(formikProps), [formikProps])

    const handleSubCountryChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            void formikProps.setFieldValue('countrySubdivisionName', event.target.value)
        },
        [formikProps]
    )

    const handleCountryChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedCountry = Number(event.target.value)
            void formikProps.setFieldValue('countryNumericCode', selectedCountry)
            setSelectedCountry(selectedCountry)
        },
        [formikProps]
    )

    const countryOptions = useMemo(() => {
        if (countriesList.loaded) {
            return countriesList.data.countryList.map((country: ICountryData) => (
                <option key={country.numericCode} value={country.numericCode}>
                    {country.fullName}
                </option>
            ))
        }
        return <option value="">Cargando países...</option>
    }, [countriesList])

    const subCountryOptions = useMemo(() => {
        if (subCountriesLoading) {
            return <option value="">Cargando subpaíses...</option>
        }
        if (subCountriesError) {
            return <option value="">Error cargando subpaíses</option>
        }
        return subCountriesList.subCountryList.map((subcountry: ISubCountryData) => (
            <option key={subcountry.code} value={subcountry.name}>
                {subcountry.name}
            </option>
        ))
    }, [subCountriesList, subCountriesLoading, subCountriesError])

    return (
        <MainContainer>
            <FormStyledContainer>
                <FormField label="Código postal:" id="postalCode" name="postalCode" type="text" placeholder="Código postal" formikProps={formikProps} />
                <FormField
                    label="Número:"
                    id="apartmentNumber"
                    name="apartmentNumber"
                    type="text"
                    placeholder="El número de tu vivienda"
                    formikProps={formikProps}
                />
                <FormField label="Casa/Edificio:" id="building" name="building" type="text" placeholder="Casa o edificio" formikProps={formikProps} />
                <FormField label="Calle:" id="street" name="street" type="text" placeholder="Nombre de la calle" formikProps={formikProps} />
                <FormField label="Ciudad/Población:" id="city" name="city" type="text" placeholder="Ciudad o población" formikProps={formikProps} />
                <Row className="mb-3">
                    <Col>
                        <BootstrapForm.Label>País:</BootstrapForm.Label>
                        <Field as={BootstrapForm.Select} name="countryNumericCode" onChange={handleCountryChange}>
                            {countryOptions}
                        </Field>
                        <BootstrapForm.Text className="text-muted">Selecciona tu país</BootstrapForm.Text>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <BootstrapForm.Label>SUBPaís:</BootstrapForm.Label>
                        <Field as={BootstrapForm.Select} name="countrySubdivisionName" onChange={handleSubCountryChange}>
                            {subCountryOptions}
                        </Field>
                        <BootstrapForm.Text className="text-muted">Selecciona tu subpaís</BootstrapForm.Text>
                    </Col>
                </Row>
                <ButtonRow>
                    <ButtonCol>
                        <Button variant="primary" onClick={previousStepFunction}>
                            Atrás
                        </Button>
                    </ButtonCol>
                    <Col></Col>
                    <Col>
                        <Button variant="primary" onClick={nextStepFunction} disabled={isNextButtonDisabled}>
                            Siguiente
                        </Button>
                    </Col>
                </ButtonRow>
            </FormStyledContainer>
        </MainContainer>
    )
}

export default SignUpFormThirdStep
