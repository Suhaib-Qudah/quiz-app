import React, {useState} from "react";
import Questions from '../helpers/quiz'

export const Quiz: React.FC = () => {
    const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
    const [userAnswers, setUserAnswers] = useState<any[]>([]);

    const handleAnswer = (question: any, answer: string) => {
        setUserAnswers((prevAnswers: any[]) => {
            prevAnswers.push({
                id: question.id,
                answer
            })
            return prevAnswers;
        })
        setActiveQuestionIndex((prevIndex: number) => {
            if (Questions.length === 0) return prevIndex;
            if (prevIndex + 1 >= Questions.length) {
                return prevIndex;
            }
            return ++prevIndex;
        })
    }
    return (
        <>
            <section className={'mt-6'}>
                <p>
                    Active Question {activeQuestionIndex + 1} of Quiz
                </p>
                <div className={'border rounded-3xl shadow-sm p-6 mt-6'}>
                    <p className={'text-start font-medium text-gray-900  dark:text-gray-100'}>
                        {Questions[activeQuestionIndex].text}
                    </p>
                    <ul className={'list-unstyled p-0'}>
                        {Questions[activeQuestionIndex].answers.map(answer => (
                            <li key={answer}
                                onClick={() => {
                                    handleAnswer(Questions[activeQuestionIndex], answer)
                                }}
                                className={'list-unstyled p-3 border-1 dark:border-gray-700 rounded-lg my-2 hover:bg-blue-800 transition duration-150 ease-in-out dark:hover:bg-blue-500 cursor-pointer'}>
                                {answer}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    )
}