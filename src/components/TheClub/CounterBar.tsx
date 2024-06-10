import React, { useEffect, useRef, useState } from 'react'



const CountingNumber: React.FC<counterProps> = ({ duration, startValue, endValue }) => {
    const [count, setCount] = useState(startValue);
    const startRef = useRef(startValue);
    const endRef = useRef(endValue);

    useEffect(() => {
        startRef.current = startValue;
        endRef.current = endValue;
    }, [startValue, endValue]);

    useEffect(() => {
        const startCounting = () => {
            let startTime: number;

            const updateCount = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const percentage = Math.min(progress / duration, 1);
                const currentValue = Math.floor(startRef.current + (endRef.current - startRef.current) * percentage);
                setCount(currentValue);

                if (progress < duration) {
                    requestAnimationFrame(updateCount);
                }
            };
            requestAnimationFrame(updateCount);
        };
        startCounting();
    }, [duration]);

    return <div>{count}</div>;
};

export const ContadorSocios = () => {
    const valoresContador: counterProps = { duration:  2000, startValue: 0, endValue: 72 }
    return (
                <CountingNumber {...valoresContador}></CountingNumber>
    )
}


export const ContadorFechaFundacionClub = () => {
    const valoresContador: counterProps = {
        duration:2000, startValue: 0, endValue: 1986}
    return(
        <CountingNumber {...valoresContador}></CountingNumber>
    )
    
}

interface counterProps {
    duration: number
    startValue: number
    endValue: number
}


