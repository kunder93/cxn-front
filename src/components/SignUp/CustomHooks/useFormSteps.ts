import { useState } from 'react'
import { FormSteps } from '../SignUpFormTypes'
const useFormSteps = (initialStep: FormSteps) => {
    const [step, setStep] = useState<FormSteps>(initialStep)

    const nextStep = () => { setStep((prevStep: number) => Math.min(prevStep + 1, FormSteps.FourthStep)); }
    const previousStep = () => { setStep((prevStep: number) => Math.max(prevStep - 1, FormSteps.FirstStep)); }

    return { step, nextStep, previousStep }
}

export default useFormSteps
