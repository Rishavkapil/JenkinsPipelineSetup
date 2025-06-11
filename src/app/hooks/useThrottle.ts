import { useCallback, useRef } from 'react';

function useThrottle(callback: any, delay: number) {
    const lastCall = useRef(0);

    const throttledFunction = useCallback(
        (...args: any) => {
            const now = Date.now();
            if (now - lastCall.current >= delay) {
                lastCall.current = now;
                callback(...args);
            }
        },
        [callback, delay]
    );

    return throttledFunction;
}

export default useThrottle;
