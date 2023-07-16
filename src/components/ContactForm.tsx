import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import BootstrapForm from 'react-bootstrap/Form';
// Define validation schema using Yup
const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  text: Yup.string().required('Text are required'),
});

// Form component
const ContactForm: React.FC = () => {
  const initialValues = {
    title: '',
    text: '',
  };

  const handleSubmit = (values: any) => {
    console.log(values);
    // Handle form submission here
  };

  return (
    <div>
      <h2>Create Petition</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <BootstrapForm as={Form}>
        <BootstrapForm.Group className="mb-3" controlId="formBasicEmail">
            <BootstrapForm.Label htmlFor="title">Title</BootstrapForm.Label>
            <BootstrapForm.Control type="text" name="title" />
            <ErrorMessage name="title" component="div" className="error" />
            </BootstrapForm.Group>

          <div>
            <label htmlFor="text">Questions</label>
            <Field as="textarea" id="text" name="text" />
            <ErrorMessage name="text" component="div" className="error" />
          </div>

          <button type="submit">Submit</button>
        </BootstrapForm>
      </Formik>
    </div>
  );
};

export default ContactForm;