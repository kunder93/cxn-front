import { autoUpdate, flip, FloatingFocusManager, offset, shift, useClick, useDismiss, useFloating, useInteractions, useRole } from '@floating-ui/react'

import { memo, useId, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { BsInfoSquareFill } from 'react-icons/bs'
import styled from 'styled-components'
import { useAxiosGetUserData } from 'utility/CustomAxios'
import { renderGenderValues, renderKindMember, renderUserRoles } from 'utility/userUtilities'

/** Icono estilizado con animaciones */
const StyledBsInfoSquareFill = styled(BsInfoSquareFill)`
    font-size: 18px;
    color: #888;
    cursor: pointer;
    transition:
        color 0.3s ease,
        transform 0.2s ease;
    &:hover {
        color: #555;
        transform: scale(1.1);
    }
`

/** Botón sin estilos predeterminados */
const StyledIconButton = styled.button`
    all: unset;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:focus {
        outline: 2px solid #007bff;
    }

    &:hover {
        opacity: 0.8;
    }
`

/** Contenedor principal del popover */
const StyledHelpMessageContainer = styled.div`
    min-width: 250px;
    width: 300px;
    background-color: #f9f9f9;
    border-radius: 8px;
    border: 1px solid #ccc;
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 5px;

    p {
        margin: 0;
        color: #333;
        font-size: 14px;
    }
`

const ContainerHeader = styled.div`
    font-size: 1.2em;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
    margin-bottom: 10px;
    h3 {
        margin: 0;
    }
`

const ContainerBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

/** Spinner con mensaje de carga */
const LoadingTooltipViewWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1em;
    span {
        font-size: 1.2em;
    }
`

interface UserDataInfoPopoverProps {
    userDni: string
}

/** Componente memoizado */
export const UserDataInfoPopover = memo(({ userDni }: UserDataInfoPopoverProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [offset(10), flip({ fallbackAxisSideDirection: 'end' }), shift()],
        placement: 'right',
        whileElementsMounted: autoUpdate
    })

    // Interacciones con Floating UI
    const click = useClick(context)
    const dismiss = useDismiss(context)
    const role = useRole(context)
    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role])

    // Datos del usuario
    const headingId = useId()
    const { data: userInfoProfile, loaded, error } = useAxiosGetUserData(userDni)

    return (
        <>
            <StyledIconButton
                aria-label={`Ver información del usuario con DNI ${userDni}`}
                title={`Ver información del usuario con DNI ${userDni}`}
                ref={refs.setReference}
                {...getReferenceProps()}
            >
                <StyledBsInfoSquareFill />
            </StyledIconButton>

            {isOpen && (
                <FloatingFocusManager context={context} modal={false}>
                    <StyledHelpMessageContainer ref={refs.setFloating} style={floatingStyles} aria-labelledby={headingId} {...getFloatingProps()}>
                        {/* Sección del encabezado */}
                        <ContainerHeader>
                            {loaded ? (
                                error ? (
                                    <h3>Error al cargar</h3>
                                ) : (
                                    <h3>{userDni}</h3>
                                )
                            ) : (
                                <LoadingTooltipViewWrapper>
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </Spinner>
                                    <h3>Cargando...</h3>
                                </LoadingTooltipViewWrapper>
                            )}
                        </ContainerHeader>

                        {/* Sección del cuerpo */}
                        <ContainerBody>
                            {loaded ? (
                                error ? (
                                    <p>{error.message}</p>
                                ) : userInfoProfile ? (
                                    <>
                                        <span>Nombre: {userInfoProfile.name}</span>
                                        <span>Correo: {userInfoProfile.email}</span>
                                        <span>Tipo: {renderKindMember(userInfoProfile.kindMember)}</span>
                                        <span>Rol: {renderUserRoles(userInfoProfile.userRoles)}</span>
                                        <span>F. Nacimiento: {new Date(userInfoProfile.birthDate).toLocaleDateString()}</span>
                                        <span>Género: {renderGenderValues(userInfoProfile.gender)}</span>
                                    </>
                                ) : (
                                    <p>No se encontró información del usuario.</p>
                                )
                            ) : null}
                        </ContainerBody>
                    </StyledHelpMessageContainer>
                </FloatingFocusManager>
            )}
        </>
    )
})
