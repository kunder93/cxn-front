import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { Alert, Button, Col, Collapse, Container, Row } from 'react-bootstrap'
import { CreateCompanyValidationSchema } from '../../pages/validation/FormValidationSchemas'
import BootstrapForm from 'react-bootstrap/Form'
import { COMPANIES_URL } from '../../resources/server_urls'
import { CreateCompanyFormButtonsContainer, ErrorMessage, FloatingNotificationContainer } from './CompaniesStyles'
import { CreateCompanyFormValues, ICompany } from './Types'


const FloatingNotification: React.FC<{ message: string; variant: string; onClose: () => void }> = ({
    message,
    variant,
    onClose,
  }) =>  {
    const [visible, setVisible] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
  
      return () => {
        clearTimeout(timer);
      };
    }, []);
  
    const handleExited = () => {
      onClose();
    };
  
    return (
      <Collapse in={visible} onExited={handleExited}>
        <FloatingNotificationContainer>
          <Alert variant={variant} onClose={onClose} dismissible>
            {message}
          </Alert>
        </FloatingNotificationContainer>
      </Collapse>
    );
  };




export const CreateCompanyForm: React.FC<any> = () => {
    const initialValues: CreateCompanyFormValues = { nifCif: '', name: '', address: '' }
    const [alertMessage, setAlertMessage] = useState('')
    const closeAlert = () => {
        setAlertMessage('')
    }
    const [submitSuccessNotification, setSubmitSuccessNotification] = useState(false)
    const [submitErrorNotification, setSubmitErrorNotification] = useState(false)
    const handleSubmit = async (values:any, actions: FormikHelpers<CreateCompanyFormValues>) => {
        
        
        const companyData = { nifCif: values.nifCif, name: values.name, address: values.address }
        axios
                    .post<ICompany>(COMPANIES_URL, companyData)
                    .then((response) => {
                        setSubmitSuccessNotification(true)
                        console.log("HOLLUII")
                    })
                    .catch((error) => {
                        console.log("WWWWWW")
                        setSubmitErrorNotification(true)
                        if (error.response.data) {
                            // Request made and server responded
                            setAlertMessage(error.response.data.content)
                        } else if (error.request) {
                            // The request was made but no response was received
                            setAlertMessage('Error: no hay respuesta.')
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            setAlertMessage('Error: algo inesperado. Recarga o intentalo mas tarde.')
                        }
                    })
        
        actions.resetForm()
        actions.setSubmitting(false)
    }

    function changeSuccessNotificationState(): void {
        setSubmitSuccessNotification(false)
    }
    function changeErrorNotificationState():void {
        setSubmitErrorNotification(false)
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => handleSubmit(values,actions)}
            validationSchema={CreateCompanyValidationSchema}
            validateOnChange={true}
        >
            {({ errors, touched }) => (
                <BootstrapForm as={Form}>
                    <Container as={BootstrapForm.Group}>
                        <Row>
                            <Col>
                                <BootstrapForm.Label htmlFor="nifCif">NIF:</BootstrapForm.Label>
                                <Field as={BootstrapForm.Control} id="nifCif" name="nifCif" type="text" placeholder="El NIF" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>{errors.nifCif && touched.nifCif ? <ErrorMessage>{errors.nifCif}</ErrorMessage> : ''}</Col>
                        </Row>
                        <Row>
                            <Col>
                                <BootstrapForm.Label htmlFor="name">Nombre:</BootstrapForm.Label>
                                <Field as={BootstrapForm.Control} id="name" type="text" name="name" placeholder="El nombre" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>{errors.name && touched.name ? <ErrorMessage>{errors.name}</ErrorMessage> : ''}</Col>
                        </Row>

                        <Row>
                            <Col>
                                <BootstrapForm.Label htmlFor="address">Direccion:</BootstrapForm.Label>
                                <Field as={BootstrapForm.Control} id="address" name="address" type="text" placeholder="La direccion" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>{errors.address && touched.address ? <ErrorMessage>{errors.address}</ErrorMessage> : ''}</Col>
                        </Row>
                        <Row>
                            <CreateCompanyFormButtonsContainer>
                                <Button type="submit" disabled={errors.nifCif || errors.name || errors.address ? true : false}>
                                    Registrar compañía
                                </Button>
                            </CreateCompanyFormButtonsContainer>
                        </Row>
                        
                    {submitSuccessNotification &&  <FloatingNotification message={'COMPAÑIA REGISTRADA CON EXITO'} variant={'success'} onClose={changeSuccessNotificationState }></FloatingNotification> }
                    {submitErrorNotification &&  <FloatingNotification message={alertMessage} variant={'danger'} onClose={changeErrorNotificationState }></FloatingNotification> }
                    </Container>

   
                </BootstrapForm>
            )}
        </Formik>
    )
}

export default CreateCompanyForm
