import React, { useState, useEffect } from 'react'
import { FormikProps } from 'formik'
import BootstrapForm from 'react-bootstrap/Form'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import Select from 'react-select'
import { IInvoice } from '../Types/Types'
import { COMPANIES_URL } from '../../resources/server_urls'
import { useAxiosGetCompanies } from '../../utility/CustomAxios'

const InputLabel = styled(BootstrapForm.Label)`
    font-weight: bold;
`

const StyledErrorMessage = styled.div`
    color: #e20101;
    font-weight: bold;
`

const FormColumn = styled(Col)`
    padding-top: 0.5em;
`

const TaxExemptCheckboxColumn = styled(FormColumn)`
    display: flex;
    flex-direction: row;
    align-items: baseline !important;
    input {
        margin-left: 1em;
        width: 20px;
        height: 20px;
        vertical-align: middle;
    }
`

interface CreateInvoiceFormProps {
    formik: FormikProps<IInvoice>
}

interface ISelectionOptions {
    label: string
    value: string
}

const CreateInvoiceForm: React.FC<CreateInvoiceFormProps> = ({ formik }) => {
    const [initialSellerOptions, setInitialSellerOptions] = useState<ISelectionOptions[]>([])
    const [initialBuyerOptions, setInitialBuyerOptions] = useState<ISelectionOptions[]>([])
    const [sellerOptions, setSellerOptions] = useState<ISelectionOptions[]>([])
    const [buyerOptions, setBuyerOptions] = useState<ISelectionOptions[]>([])
    const { data, loaded } = useAxiosGetCompanies(COMPANIES_URL)

    useEffect(() => {
        if (data?.companiesList) {
            const updatedList = data.companiesList.map((company) => ({
                label: company.nif,
                value: company.nif
            }))
            setInitialSellerOptions(updatedList)
            setInitialBuyerOptions(updatedList)
            setSellerOptions(updatedList)
            setBuyerOptions(updatedList)
        }
    }, [data])

    const handleSelectChange = async (field: string, value: string) => {
        await formik.setFieldValue(field, value)
        if (field === 'sellerNif') {
            setBuyerOptions(initialBuyerOptions.filter((option) => option.value !== value))
        } else if (field === 'buyerNif') {
            setSellerOptions(initialSellerOptions.filter((option) => option.value !== value))
        }
    }

    return (
        <Container>
            <BootstrapForm onSubmit={formik.handleSubmit}>
                <Container as={BootstrapForm.Group}>
                    <Row>
                        <FormColumn>
                            <InputLabel htmlFor="number">Número:</InputLabel>
                            <BootstrapForm.Control
                                id="number"
                                name="number"
                                type="number"
                                placeholder="El número de la factura"
                                value={formik.values.number}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.number && formik.errors.number && <StyledErrorMessage>{formik.errors.number}</StyledErrorMessage>}
                        </FormColumn>
                    </Row>
                    <Row>
                        <FormColumn>
                            <InputLabel htmlFor="series">Serie:</InputLabel>
                            <BootstrapForm.Control
                                id="series"
                                name="series"
                                type="text"
                                placeholder="La serie de la factura"
                                value={formik.values.series}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.series && formik.errors.series && <StyledErrorMessage>{formik.errors.series}</StyledErrorMessage>}
                        </FormColumn>
                    </Row>
                    <Row>
                        <FormColumn>
                            <InputLabel htmlFor="expeditionDate">Fecha de expedición:</InputLabel>
                            <BootstrapForm.Control
                                id="expeditionDate"
                                name="expeditionDate"
                                type="date"
                                value={new Date(formik.values.expeditionDate).toISOString().split('T')[0]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.expeditionDate && formik.errors.expeditionDate && (
                                <StyledErrorMessage>{'Error, coge otra fecha.'}</StyledErrorMessage>
                            )}
                        </FormColumn>
                    </Row>
                    <Row>
                        <FormColumn>
                            <InputLabel htmlFor="advancePaymentDate">Fecha de pago por adelantado:</InputLabel>
                            <BootstrapForm.Control
                                id="advancePaymentDate"
                                name="advancePaymentDate"
                                type="date"
                                value={new Date(formik.values.advancePaymentDate).toISOString().split('T')[0]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.advancePaymentDate && formik.errors.advancePaymentDate && (
                                <StyledErrorMessage>{'Error, coge otra fecha.'}</StyledErrorMessage>
                            )}
                        </FormColumn>
                    </Row>
                    <Row>
                        <TaxExemptCheckboxColumn>
                            <InputLabel htmlFor="taxExempt">Exención de impuestos:</InputLabel>
                            <BootstrapForm.Check
                                id="taxExempt"
                                name="taxExempt"
                                type="checkbox"
                                checked={formik.values.taxExempt}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={!!formik.touched.taxExempt && !!formik.errors.taxExempt}
                                feedback={formik.errors.taxExempt}
                                aria-label="Seleccionar exención de impuestos"
                            />
                        </TaxExemptCheckboxColumn>
                    </Row>
                    <Row>
                        <FormColumn>
                            <InputLabel htmlFor="sellerNif">Vendedor NIF:</InputLabel>
                            <div>
                                <Select
                                    id="sellerNif"
                                    name="sellerNif"
                                    options={sellerOptions}
                                    value={sellerOptions.find((option) => option.value === formik.values.sellerNif)}
                                    onChange={(option) => void handleSelectChange('sellerNif', option?.value ?? '')}
                                    onBlur={formik.handleBlur}
                                    placeholder={
                                        loaded ? (
                                            'Selecciona el NIF del vendedor'
                                        ) : (
                                            <span role="status" aria-live="polite">
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando...
                                            </span>
                                        )
                                    }
                                    isDisabled={!loaded}
                                    aria-describedby="sellerNifError"
                                    aria-label="Selecciona NIF o CIF del vendedor"
                                />
                                {formik.touched.sellerNif && formik.errors.sellerNif && (
                                    <StyledErrorMessage id="sellerNifError">{formik.errors.sellerNif}</StyledErrorMessage>
                                )}
                            </div>
                        </FormColumn>
                    </Row>
                    <Row>
                        <FormColumn>
                            <InputLabel htmlFor="buyerNif">Comprador NIF:</InputLabel>
                            <div>
                                <Select
                                    id="buyerNif"
                                    name="buyerNif"
                                    options={buyerOptions}
                                    value={buyerOptions.find((option) => option.value === formik.values.buyerNif)}
                                    onChange={(option) => void handleSelectChange('buyerNif', option?.value ?? '')}
                                    onBlur={formik.handleBlur}
                                    placeholder={
                                        loaded ? (
                                            'Selecciona el NIF del comprador'
                                        ) : (
                                            <span role="status" aria-live="polite">
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando...
                                            </span>
                                        )
                                    }
                                    isDisabled={!loaded}
                                    aria-describedby="buyerNifError"
                                    aria-label="Selecciona NIF o CIF del comprador"
                                />
                                {formik.touched.buyerNif && formik.errors.buyerNif && (
                                    <StyledErrorMessage id="buyerNifError">{formik.errors.buyerNif}</StyledErrorMessage>
                                )}
                            </div>
                        </FormColumn>
                    </Row>
                </Container>
            </BootstrapForm>
        </Container>
    )
}

export default CreateInvoiceForm
