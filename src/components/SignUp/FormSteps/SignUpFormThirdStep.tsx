import React, { useCallback, useMemo, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import BootstrapForm from 'react-bootstrap/Form'
import { SignUpFormStepProps, SignUpFormValues } from '../SignUpFormTypes'
import { ICountryData, ISubCountryData } from '../../Types/Types'
import { useAxiosGetCountriesList } from '../../../utility/CustomAxios'
import { ErrorMessage, Field, FormikProps } from 'formik'
import useSubCountries from '../CustomHooks/useSubCountries'
import { ButtonRow } from '../../SignUpSingInCommonStyles'
import FormField from '../Common/FormField'
import { ResponsiveMainContainer } from './Styles/FormStepsCommonStyles'

/**
 * Checks if the "Siguiente" (Next) button should be disabled
 * based on the errors in the Formik form.
 *
 * @param {FormikProps<SignUpFormValues>} formikProps - The Formik props containing the form state and errors.
 * @returns {boolean} - Returns true if any of the specified fields have errors, otherwise false.
 */
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

/**
 * Component representing the third step of the sign-up form.
 *
 * @param {SignUpFormStepProps} formikProps - The Formik props for managing form state and validation.
 * @param {Function} previousStepFunction - Function to navigate to the previous step.
 * @param {Function} nextStepFunction - Function to navigate to the next step.
 * @returns {React.JSX.Element} - The rendered component.
 */
const SignUpFormThirdStep = ({ formikProps, previousStepFunction, nextStepFunction }: SignUpFormStepProps) => {
    const [selectedCountryNumber, setSelectedCountry] = useState<number | undefined>()
    const countriesList = useAxiosGetCountriesList()
    const { subCountriesList, loading: subCountriesLoading, error: subCountriesError } = useSubCountries(selectedCountryNumber)
    const isNextButtonDisabled = useMemo(() => isThirdStepNextButtonDisabled(formikProps), [formikProps])

    /**
     * Handles the change event for selecting a sub-country (province).
     *
     * @param {React.ChangeEvent<HTMLSelectElement>} event - The change event from the select element.
     */
    const handleSubCountryChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            void formikProps.setFieldValue('countrySubdivisionName', event.target.value)
        },
        [formikProps]
    )

    /**
     * Handles the change event for selecting a country.
     *
     * @param {React.ChangeEvent<HTMLSelectElement>} event - The change event from the select element.
     */
    const handleCountryChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedCountry = Number(event.target.value)
            void formikProps.setFieldValue('countryNumericCode', selectedCountry)
            setSelectedCountry(selectedCountry)
        },
        [formikProps]
    )

    /**
     * Generates options for the country select field.
     *
     * @returns {React.JSX.Element} - The options for the country select field.
     */
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

    /**
     * Generates options for the sub-country (province) select field.
     *
     * @returns {React.JSX.Element} - The options for the sub-country select field.
     */
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
                    <Field
                        as={BootstrapForm.Select}
                        name="countryNumericCode"
                        onChange={handleCountryChange}
                        className={formikProps.touched.countryNumericCode && formikProps.errors.countryNumericCode ? 'is-invalid' : ''}
                    >
                        {countryOptions}
                    </Field>

                    <ErrorMessage component="div" name="countryNumericCode" className="invalid-feedback"></ErrorMessage>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <BootstrapForm.Label>Provincia:</BootstrapForm.Label>
                    <Field
                        as={BootstrapForm.Select}
                        name="countrySubdivisionName"
                        onChange={handleSubCountryChange}
                        className={formikProps.touched.countrySubdivisionName && formikProps.errors.countrySubdivisionName ? 'is-invalid' : ''}
                    >
                        {subCountryOptions}
                    </Field>

                    <ErrorMessage component="div" name="countrySubdivisionName" className="invalid-feedback"></ErrorMessage>
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
