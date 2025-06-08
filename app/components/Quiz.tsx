import React, {useRef, useState, useMemo, useEffect} from "react";
import Questions from "../helpers/quiz";
import Timer from "~/components/QuizTimer";

export const Quiz: React.FC = () => {
    const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
    const [userAnswers, setUserAnswers] = useState<
        { id: string | number; answer: string }[]
    >([]);

    const currentQuestion = Questions[activeQuestionIndex];

    const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

    useEffect(() => {
        const copy = [...Questions[activeQuestionIndex].answers];
        setShuffledAnswers(copy.sort(() => Math.random() - 0.5));
    }, [activeQuestionIndex]);

    const isQuizCompleted = activeQuestionIndex >= Questions.length;

    const handleAnswer = (question: any, answer: string) => {
        setUserAnswers((prevAnswers) => [
            ...prevAnswers,
            {
                id: question.id,
                answer: answer,
            },
        ]);
        nextQuestion();
    };

    const nextQuestion = () => {
        setActiveQuestionIndex((prevIndex) => {
            const next = prevIndex + 1;
            if (next < Questions.length) {
                return next;
            }
            return prevIndex;
        });
    };

    if (isQuizCompleted) {
        return (
            <section id="summary">
                <div className="border rounded-3xl shadow-sm p-6 mt-6">
                    <h2>Congratulations! You have completed the quiz!</h2>
                    <p className="text-gray-900 dark:text-gray-100">
                        Here is a summary of your answers:
                    </p>
                    <ul className="list-unstyled p-0">
                        {userAnswers.map((answer, index) => (
                            <li
                                key={index}
                                className="list-unstyled p-3 border dark:border-gray-700 rounded-lg my-2"
                            >
                                <p className="text-gray-900 dark:text-gray-100">
                                    Question {answer.id}: {answer.answer}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        );
    }

    return (
        <section className="mt-6">
            <div>
                <p>Active Question {activeQuestionIndex + 1} of {Questions.length}</p>
                <Timer
                    id={`timer-${activeQuestionIndex}`}
                    time={15}
                    onTimeUp={nextQuestion}
                />
            </div>
            <div className="border rounded-3xl shadow-sm p-6 mt-6">
                <p className="text-start font-medium text-gray-900 dark:text-gray-100">
                    {currentQuestion.text}
                </p>
                <ul className="list-unstyled p-0">
                    {shuffledAnswers.map((answer, i) => (
                        <li
                            key={i}
                            onClick={() => handleAnswer(currentQuestion, answer)}
                            className="list-unstyled p-3 border dark:border-gray-700 rounded-lg my-2 hover:bg-blue-800 transition duration-150 ease-in-out dark:hover:bg-blue-500 cursor-pointer"
                        >
                            {answer}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Quiz;
