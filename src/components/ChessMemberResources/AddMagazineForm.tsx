import React from 'react'
import { Field, Form, Formik, FieldArray } from 'formik'

interface Author {
    name: string
    lastName: string
}

interface Magazine {
    title: string
    publisher: string
    issueNumber: number
    publishDate: string
    description: string
    genre: string
    coverImageUrl: string
    pageCount: number
    authors: Author[]
    isbn: string
    language: string
}

export const AddMagazineForm: React.FC = () => {
    const initialValues: Magazine = {
        title: '',
        publisher: '',
        issueNumber: 0,
        publishDate: '',
        description: '',
        genre: '',
        coverImageUrl: '',
        pageCount: 0,
        authors: [],
        isbn: '',
        language: ''
    }

    return (
        <Formik<Magazine>
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                console.log({ values, actions })
                alert(JSON.stringify(values, null, 2))
                actions.setSubmitting(false)
            }}
        >
            {({ values, handleChange, handleBlur }) => (
                <Form>
                    <div>
                        <label htmlFor="title">Title</label>
                        <Field id="title" name="title" type="text" placeholder="Title" />
                    </div>

                    <div>
                        <label htmlFor="publisher">Publisher</label>
                        <Field id="publisher" name="publisher" type="text" placeholder="Publisher" />
                    </div>

                    <div>
                        <label htmlFor="issueNumber">Issue Number</label>
                        <Field id="issueNumber" name="issueNumber" type="number" placeholder="Issue Number" />
                    </div>

                    <div>
                        <label htmlFor="publishDate">Publish Date</label>
                        <Field id="publishDate" name="publishDate" type="date" placeholder="Publish Date" />
                    </div>

                    <div>
                        <label htmlFor="description">Description</label>
                        <Field id="description" name="description" type="textarea" placeholder="Description" />
                    </div>

                    <div>
                        <label htmlFor="genre">Genre</label>
                        <Field id="genre" name="genre" type="text" placeholder="Genre" />
                    </div>

                    <div>
                        <label htmlFor="coverImageUrl">Cover Image URL</label>
                        <Field id="coverImageUrl" name="coverImageUrl" type="url" placeholder="Cover Image URL" />
                    </div>

                    <div>
                        <label htmlFor="pageCount">Page Count</label>
                        <Field id="pageCount" name="pageCount" type="number" placeholder="Page Count" />
                    </div>

                    <FieldArray name="authors">
                        {({ push, remove }) => (
                            <div>
                                <label>Authors</label>
                                {values.authors.map((_, index) => (
                                    <div key={index}>
                                        <Field
                                            name={`authors[${index}].name`}
                                            type="text"
                                            placeholder="Author Name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Field
                                            name={`authors[${index}].lastName`}
                                            type="text"
                                            placeholder="Author Last Name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
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

                    <div>
                        <label htmlFor="isbn">ISBN</label>
                        <Field id="isbn" name="isbn" type="text" placeholder="ISBN" />
                    </div>

                    <div>
                        <label htmlFor="language">Language</label>
                        <Field id="language" name="language" type="text" placeholder="Language" />
                    </div>

                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    )
}
