import React, { useEffect, useState} from "react";

interface ITimerProps {
    id: string | number;
    time: number;
    onTimeUp?: () => void;
}

export interface TimerRef {
    reset: () => void;
}

const Timer : React.FC<ITimerProps> =(({ id, time, onTimeUp }) => {
    const [timer, setTimer] = useState(time);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    if (onTimeUp) onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [onTimeUp]);

    useEffect(() => {
        setTimer(time);
    }, [time]);

    return (
        <div className="quiz-timer">
            <p className="timer-text">
                <span className="transition duration-500 text-gray-900 dark:text-gray-100 font-semibold">
                    {timer}
                </span>
                seconds
            </p>
        </div>
    );
});

export default Timer;
