import React from 'react'
import { Container, ProgressBar } from 'react-bootstrap'
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
        { id: 1, regular: <Icon1Circle style={iconStyles} />, filled: <Icon1CircleFill style={iconStyles} /> },
        { id: 2, regular: <Icon2Circle style={iconStyles} />, filled: <Icon2CircleFill style={iconStyles} /> },
        { id: 3, regular: <Icon3Circle style={iconStyles} />, filled: <Icon3CircleFill style={iconStyles} /> },
        { id: 4, regular: <Icon4Circle style={iconStyles} />, filled: <Icon4CircleFill style={iconStyles} /> }
    ]

    return (
        <Container>
            <ProgressBarIconsContainer>
                {icons.map((icon, index) => (
                    <React.Fragment key={icon.id}>{step === ((index + 1) as FormSteps) ? icon.filled : icon.regular}</React.Fragment>
                ))}
            </ProgressBarIconsContainer>
            <ProgressBar
                now={stepProgress[step]}
                min={0}
                max={100}
                role="progress"
                aria-label={`Progreso paso ${step.toString()} de 4`}
                aria-labelledby={`Progreso paso ${step.toString()} de 4`}
                visuallyHidden={false}
                striped
                animated
                tabIndex={0}
            />
        </Container>
    )
}

export default FormStepBar
