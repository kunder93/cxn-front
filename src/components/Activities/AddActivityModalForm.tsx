import React from 'react'
import { Modal, ModalProps, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { ActivityCategory, IActivityForm } from './Types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Dropzone from 'react-dropzone'
import { AddActivityValidationSchema } from './FormValidations'

const CreateActivityModal = styled(Modal)`
    .modal-content {
        padding: 1rem;
    }
    .modal-header {
        display: flex;
        flex-direction: column;
        align-items: start;
    }
    .modal-footer {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        @media (max-width: 768px) {
            flex-direction: column-reverse;
            button {
                width: 100%;
            }
        }
    }
`

const DropzoneContainer = styled.div`
    border: 2px dashed #007bff;
    padding: 1rem;
    text-align: center;
    cursor: pointer;
    margin-bottom: 1rem;

    &:hover {
        background-color: #f0f8ff;
    }
`

const DateWrapper = styled.div`
    display: flex;
    gap: 1rem;
    flex-direction: row;
    justify-content: space-between;
`

const AddActivityModalForm: React.FC<ModalProps> = (props: ModalProps) => {
    const initialValues: IActivityForm = {
        title: '',
        description: '',
        image: null,
        startDate: null,
        endDate: null,
        state: 'upcoming',
        category: ActivityCategory.TORNEO
    }

    return (
        <CreateActivityModal show={props.show} onHide={props.onHide} centered>
            <Formik
                initialValues={initialValues}
                validationSchema={AddActivityValidationSchema}
                onSubmit={(values) => {
                    alert('Submitting: ' + JSON.stringify(values))
                }}
            >
                {({ setFieldValue, values }) => (
                    <Form>
                        <Modal.Header>
                            <label htmlFor="title">Título:</label>
                            <Field name="title" type="text" className="form-control" placeholder="Título de la actividad." />
                            <ErrorMessage name="title" component="div" className="text-danger" />
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <label>Imagen:</label>
                                <DropzoneContainer>
                                    <Dropzone onDrop={(acceptedFiles) => void setFieldValue('image', acceptedFiles[0])}>
                                        {({ getRootProps, getInputProps }) => (
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                {values.image ? (
                                                    <p>Selected file: {values.image.name}</p>
                                                ) : (
                                                    <p>Arrastra aqui la imagen de la actividad o haz click para añadir una.</p>
                                                )}
                                            </div>
                                        )}
                                    </Dropzone>
                                </DropzoneContainer>
                                <ErrorMessage name="image" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description">Descripción:</label>
                                <Field
                                    name="description"
                                    as="textarea"
                                    className="form-control"
                                    placeholder={'Descripción detallada de la actividad.\nQué se va a hacer.'}
                                />
                                <ErrorMessage name="description" component="div" className="text-danger" />
                            </div>
                            <DateWrapper>
                                <div className="mb-3">
                                    <label htmlFor="startDate">Fecha de inicio:</label>
                                    <Field name="startDate" type="date" className="form-control" />
                                    <ErrorMessage name="startDate" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="endDate">Fecha de fin:</label>
                                    <Field name="endDate" type="date" className="form-control" />
                                    <ErrorMessage name="endDate" component="div" className="text-danger" />
                                </div>
                            </DateWrapper>
                            <div className="mb-3">
                                <label htmlFor="state">Categoría:</label>
                                <Field name="category" as="select" className="form-control">
                                    {Object.values(ActivityCategory).map((category, index) => (
                                        <option value={category} key={index}>
                                            {category}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="category" component="div" className="text-danger" />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={props.onHide}>
                                Cancelar
                            </Button>
                            <Button type="submit" variant="primary">
                                Añadir actividad
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </CreateActivityModal>
    )
}

export default AddActivityModalForm
