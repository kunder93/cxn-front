import React, { useCallback, useMemo, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import BootstrapForm from 'react-bootstrap/Form'
import { SignUpFormStepProps, SignUpFormValues } from '../SignUpFormTypes'
import { ICountryData, ISubCountryData } from '../../Types/Types'
import { useAxiosGetCountriesList } from '../../../utility/CustomAxios'
import { Field, FormikProps } from 'formik'
import useSubCountries from '../CustomHooks/useSubCountries'
import { ButtonRow, ErrorMessage } from '../../SignUpSingInCommonStyles'
import FormField from '../Common/FormField'
import { ResponsiveMainContainer } from './Styles/FormStepsCommonStyles'

const isThirdStepNextButtonDisabled = ({ errors }: FormikProps<SignUpFormValues>): boolean => {
    return !!(
        errors.postalCode ??
        errors.apartmentNumber ??
        errors.building ??
        errors.street ??
        errors.city ??
        errors.countryNumericCode ??
        errors.countrySubdivisionName
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
        if (countriesList.loaded && countriesList.data) {
            return (
                <>
                    <option value={-1}>Selecciona el país</option>
                    {countriesList.data.countryList.map((country: ICountryData) => (
                        <option key={country.numericCode} value={country.numericCode}>
                            {country.fullName}
                        </option>
                    ))}
                </>
            )
        }
        return <option value="">Cargando países...</option>
    }, [countriesList])

    const subCountryOptions = useMemo(() => {
        if (subCountriesLoading) {
            return <option value="">Cargando provincias...</option>
        }
        if (subCountriesError) {
            return <option value="">Error cargando provincias</option>
        }
        return (
            <>
                <option value="">Selecciona la provincia</option>
                {subCountriesList.subCountryList.map((subcountry: ISubCountryData) => (
                    <option key={subcountry.code} value={subcountry.name}>
                        {subcountry.name}
                    </option>
                ))}
            </>
        )
    }, [subCountriesList, subCountriesLoading, subCountriesError])

    return (
        <ResponsiveMainContainer>
            <FormField label="Código postal:" id="postalCode" name="postalCode" type="text" placeholder="Código postal" formikProps={formikProps} />
            <FormField
                label="Número:"
                id="apartmentNumber"
                name="apartmentNumber"
                type="text"
                placeholder="El número de tu vivienda"
                formikProps={formikProps}
            />
            <FormField label="Casa | Piso - puerta | otro:" id="building" name="building" type="text" placeholder="Casa o edificio" formikProps={formikProps} />
            <FormField label="Calle:" id="street" name="street" type="text" placeholder="Nombre de la calle" formikProps={formikProps} />
            <FormField label="Ciudad/Población:" id="city" name="city" type="text" placeholder="Ciudad o población" formikProps={formikProps} />
            <Row className="mb-3">
                <Col>
                    <BootstrapForm.Label>País:</BootstrapForm.Label>
                    <Field as={BootstrapForm.Select} name="countryNumericCode" onChange={handleCountryChange}>
                        {countryOptions}
                    </Field>
                    <BootstrapForm.Text className="text-muted">Selecciona el país</BootstrapForm.Text>
                    {formikProps.errors.countryNumericCode && formikProps.touched.countryNumericCode && (
                        <ErrorMessage>{formikProps.errors.countryNumericCode}</ErrorMessage>
                    )}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <BootstrapForm.Label>Provincia:</BootstrapForm.Label>
                    <Field as={BootstrapForm.Select} name="countrySubdivisionName" onChange={handleSubCountryChange}>
                        {subCountryOptions}
                    </Field>
                    <BootstrapForm.Text className="text-muted">Selecciona la provincia</BootstrapForm.Text>
                    {formikProps.errors.countrySubdivisionName && formikProps.touched.countrySubdivisionName && (
                        <ErrorMessage>{formikProps.errors.countrySubdivisionName}</ErrorMessage>
                    )}
                </Col>
            </Row>
            <ButtonRow>
                <Col>
                    <Button variant="primary" size="lg" onClick={previousStepFunction}>
                        Atrás
                    </Button>
                </Col>
                <Col>
                    <Button variant="primary" size="lg" onClick={nextStepFunction} disabled={isNextButtonDisabled}>
                        Siguiente
                    </Button>
                </Col>
            </ButtonRow>
        </ResponsiveMainContainer>
    )
}

export default SignUpFormThirdStep
