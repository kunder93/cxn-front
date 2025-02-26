import { ListGroup } from 'react-bootstrap'
import styled from 'styled-components'

/**
 * @interface PairQuestionAnswer Represents a pair of question and answer.
 * @property  {string} question  The question.
 * @property {string} answer     The answer.
 */
export interface PairQuestionAnswer {
    question: string
    answer: string
}

/**
 * @interface Props Represents data used by FaqList component.
 * @property  {PairQuestionAnswer[]} faqPairsQuestionAnswer  The question and answers pair list.
 */
interface Props {
    faqPairsQuestionAnswer: PairQuestionAnswer[]
}

const Question = styled.h3``

const Answer = styled.p`
    font-size: 120%;
`

/**
 * This component shows a list with faq questions and answers.
 *
 * @param {Props} props - Component props. The list of pair question-answer
 * @returns {React.JSX.Element} - FAQ List with questions and answers
 */
const FaqList = ({ faqPairsQuestionAnswer }: Props): React.JSX.Element => {
    return (
        <ListGroup as="ol">
            {faqPairsQuestionAnswer.map((pair, index) => (
                <ListGroup.Item as={'li'} key={pair.question}>
                    <Question>{(index + 1).toString() + pair.question}</Question>
                    <Answer>{pair.answer}</Answer>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export default FaqList
