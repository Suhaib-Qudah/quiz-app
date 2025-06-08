import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";

interface ITimer {
    id: string | number;
    time: number;
    onTimeUp?: () => void;
}

export interface TimerRef {
    reset: () => void;
}

const Timer = forwardRef<TimerRef, ITimer>(({id, time, onTimeUp, ...props}, ref) => {
    const [timer, setTimer] = useState<number>(time);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const clear = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const start = () => {
        clear();
        intervalRef.current = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clear();
                    if (onTimeUp) onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const reset = () => {
        clear();
        setTimer(time);
        start();
    };

    useImperativeHandle(ref, () => ({
        reset
    }));

    useEffect(() => {
        start();
        return () => clear();
    }, [id]);

    return (
        <div className="quiz-timer" {...props}>
            <p className="timer-text">
        <span className="transition duration-500 ease-in-out text-gray-900 dark:text-gray-100 font-semibold">
          {timer}
        </span>{" "}
                seconds
            </p>
        </div>
    );
});

export default Timer;
