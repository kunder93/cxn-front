import React from 'react'
import { StyledLabel, StyledPreviewRow } from './styles'
import { Form } from 'react-bootstrap'

interface IPreviewRowProps {
    frontDniPreview: string | null
    frontDniErrors: string | undefined
    backDniPreview: string | null
    backDniErrors: string | undefined
}

export const DniPreviewRow: React.FC<IPreviewRowProps> = ({ frontDniPreview, frontDniErrors, backDniPreview, backDniErrors }) => {
    return (
        <StyledPreviewRow>
            {frontDniPreview && !frontDniErrors && (
                <div>
                    <img src={frontDniPreview} alt="Previsualización anverso" className="img-thumbnail" />
                    <p>Anverso del DNI</p>
                </div>
            )}
            {backDniPreview && !backDniErrors && (
                <div>
                    <img src={backDniPreview} alt="Previsualización reverso" className="img-thumbnail" />
                    <p>Reverso del DNI</p>
                </div>
            )}
        </StyledPreviewRow>
    )
}

interface FileInputProps {
    label: string
    inputRef: React.RefObject<HTMLInputElement>
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    isInvalid: boolean | undefined
    errorMessage?: string
}

export const FileInput = ({ label, inputRef, onChange, isInvalid, errorMessage }: FileInputProps) => {
    const inputId = `file-input-${label.replace(/\s+/g, '-').toLowerCase()}`
    return (
        <Form.Group>
            <StyledLabel htmlFor={inputId}>{label}</StyledLabel>
            <Form.Control
                id={inputId}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/avif, image/webp"
                ref={inputRef}
                onChange={onChange}
                isInvalid={isInvalid}
            />
            {isInvalid && <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>}
        </Form.Group>
    )
}
