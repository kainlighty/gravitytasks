import { useCallback, useEffect, useRef } from "react";

export default function useDebounce<T extends (...args: any[]) => void>(fn: T, delay = 300) {
    const fnRef = useRef(fn);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        fnRef.current = fn;
    }, [fn]);

    useEffect(() => {
        return () => {
            if (timerRef.current !== null) window.clearTimeout(timerRef.current);
        };
    }, []);

    return useCallback((...args: Parameters<T>) => {
        if (timerRef.current !== null) window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => fnRef.current(...args), delay);
    }, [delay]) as T;
}