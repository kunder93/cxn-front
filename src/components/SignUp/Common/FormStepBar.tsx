import React from 'react'
import { Container } from 'react-bootstrap'
import { FormSteps } from '../SignUpFormTypes'
import { ProgressBarIconsContainer } from '../SignUpFormStyles'
import { Icon1Circle, Icon1CircleFill, Icon2Circle, Icon2CircleFill, Icon3Circle, Icon3CircleFill, Icon4Circle, Icon4CircleFill } from 'react-bootstrap-icons'

const FormStepBar: React.FC<{ step: FormSteps }> = ({ step }) => {
    const stepProgress = {
        [FormSteps.FirstStep]: 10,
        [FormSteps.SecondStep]: 33,
        [FormSteps.ThirdStep]: 66,
        [FormSteps.FourthStep]: 90
    }

    const iconStyles = { width: '30px', height: '30px' }

    const icons = [
        { id: 'icon1', regular: <Icon1Circle style={iconStyles} />, filled: <Icon1CircleFill style={iconStyles} /> },
        { id: 'icon2', regular: <Icon2Circle style={iconStyles} />, filled: <Icon2CircleFill style={iconStyles} /> },
        { id: 'icon3', regular: <Icon3Circle style={iconStyles} />, filled: <Icon3CircleFill style={iconStyles} /> },
        { id: 'icon4', regular: <Icon4Circle style={iconStyles} />, filled: <Icon4CircleFill style={iconStyles} /> }
    ]

    const stepProgressValue = stepProgress[step]

    return (
        <Container>
            <ProgressBarIconsContainer>
                {icons.map((icon, index) => (
                    <React.Fragment key={icon.id}>{step.valueOf() === index + 1 ? icon.filled : icon.regular}</React.Fragment>
                ))}
            </ProgressBarIconsContainer>
            <progress
                value={stepProgressValue}
                max="100"
                aria-label={`Progreso paso ${step.toString()} de 4`}
                className="form-step-progressbar" // Optional: for custom styling
            >
                {stepProgressValue}
            </progress>
        </Container>
    )
}

export default FormStepBar
