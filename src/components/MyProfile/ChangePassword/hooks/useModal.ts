import { useState } from 'react'

const useModal = () => {
    const [modalType, setModalType] = useState('')

    const openModal = (type: string) => setModalType(type)
    const closeModal = () => setModalType('')

    return { modalType, openModal, closeModal }
}

export default useModal
