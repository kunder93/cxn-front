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
        { regular: <Icon1Circle style={iconStyles} />, filled: <Icon1CircleFill style={iconStyles} /> },
        { regular: <Icon2Circle style={iconStyles} />, filled: <Icon2CircleFill style={iconStyles} /> },
        { regular: <Icon3Circle style={iconStyles} />, filled: <Icon3CircleFill style={iconStyles} /> },
        { regular: <Icon4Circle style={iconStyles} />, filled: <Icon4CircleFill style={iconStyles} /> }
    ]

    return (
        <Container>
            <ProgressBarIconsContainer>
                {icons.map((icon, index) => (
                    <React.Fragment key={index}>{step === ((index + 1) as FormSteps) ? icon.filled : icon.regular}</React.Fragment>
                ))}
            </ProgressBarIconsContainer>
            <ProgressBar
                now={stepProgress[step]}
                min={0}
                max={100}
                role="progressbar"
                aria-label={`Progreso paso ${step} de 4`}
                aria-labelledby={`Progreso paso ${step} de 4`}
                visuallyHidden={false}
                striped
                animated
                tabIndex={0}
            />
        </Container>
    )
}

export default FormStepBar
