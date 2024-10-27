import React, { useState, useEffect } from 'react'
import { useAxiosGetBooks } from '../utility/CustomAxios'
import { LIBRARY_URL } from '../resources/server_urls'
import { Button, Modal, ModalProps } from 'react-bootstrap'

import LibraryTable from '../components/UsersServices/Library/LibraryTable'
import AddBookForm from '../components/UsersServices/Library/AddBookForm'
import { IBook } from '../components/Types/Types'

interface ICreateBookModal {
    updateBooksList: (newBook: IBook) => void
}

const CreateBookModal: React.FC<ICreateBookModal & ModalProps> = (props) => {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Formulario para añadir libros</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddBookForm updateBooksList={props.updateBooksList} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

const LibraryManagerPage: React.FC = () => {
    const { data, error, loaded } = useAxiosGetBooks(LIBRARY_URL)
    const [modalShow, setModalShow] = useState(false)
    const [booksList, setBooksList] = useState<IBook[]>([])
    console.log(error)

    useEffect(() => {
        if (loaded && data) {
            setBooksList(data.bookList)
        }
    }, [loaded, data])

    const updateBooksList = (newBook: IBook) => {
        setBooksList([...booksList, newBook])
    }

    return (
        <div>
            <Button onClick={() => setModalShow(true)}>Añadir libro</Button>

            {loaded && data && <LibraryTable data={booksList} />}
            <CreateBookModal show={modalShow} onHide={() => setModalShow(false)} updateBooksList={updateBooksList} />
        </div>
    )
}

export default LibraryManagerPage
