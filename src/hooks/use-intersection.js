import { useCallback, useReducer } from "react";

function intersectionReducer(state, action) {
    if (action.type === "INTERSECTED") {
        return { isIntersected: true };
    }

    if (action.type === "NOTINTERSECTED") {
        return { isIntersected: false };
    }

    return state;
}

function useIntersection() {
    const [intersectionState, dispatch] = useReducer(intersectionReducer, {
        isIntersected: false,
    });

    const checkIntersection = useCallback((options) => {
        if (!options.target) return;

        const intersectHandler = (entries) => {
            const [entry] = entries;

            entry.isIntersecting
                ? dispatch({ type: "INTERSECTED" })
                : dispatch({ type: "NOTINTERSECTED" });
        };

        const observer = new IntersectionObserver(intersectHandler, {
            root: options.root ? options.root : null,
            rootMargin: options.margin ? options.margin : "0px",
            threshold: options.threshold ? options.threshold : 0,
        });
        observer.observe(options.target);
    }, []);

    return { checkIntersection, ...intersectionState };
}

export default useIntersection;
