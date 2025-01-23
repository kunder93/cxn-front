import React from 'react'
import { Book } from './BooksViewer'
import { Field, Form, Formik, FieldArray } from 'formik'

export const AddBookForm: React.FC = () => {
    const initialValues: Book = {
        title: '',
        description: '',
        genre: '',
        publishDate: '',
        language: '',
        coverSrc: '',
        authors: [{ name: '', lastName: '' }] // Initial empty author
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                console.log({ values, actions })
                alert(JSON.stringify(values, null, 2))
                actions.setSubmitting(false)
            }}
        >
            {({ values }) => (
                <Form>
                    <div>
                        <label htmlFor="title">Title</label>
                        <Field id="title" name="title" placeholder="Title" />
                    </div>

                    <div>
                        <label htmlFor="description">Description</label>
                        <Field id="description" name="description" placeholder="Description" />
                    </div>

                    <div>
                        <label htmlFor="genre">Genre</label>
                        <Field id="genre" name="genre" placeholder="Genre" />
                    </div>

                    <div>
                        <label htmlFor="publishDate">Publish Date</label>
                        <Field id="publishDate" name="publishDate" type="date" />
                    </div>

                    <div>
                        <label htmlFor="language">Language</label>
                        <Field id="language" name="language" placeholder="Language" />
                    </div>

                    <div>
                        <label htmlFor="coverSrc">Cover Source</label>
                        <Field id="coverSrc" name="coverSrc" placeholder="Cover Image URL" />
                    </div>

                    <FieldArray name="authors">
                        {({ push, remove }) => (
                            <div>
                                <label>Authors</label>
                                {values.authors.map((_, index) => (
                                    <div key={index}>
                                        <Field name={`authors[${index}].name`} placeholder="Author Name" />
                                        <Field name={`authors[${index}].lastName`} placeholder="Author Last Name" />
                                        <button type="button" onClick={() => remove(index)}>
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => push({ name: '', lastName: '' })}>
                                    Add Author
                                </button>
                            </div>
                        )}
                    </FieldArray>

                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    )
}
