import {useEffect, useState} from "react";

export function useAllCapsHook(title) {
    const [transformedTitle, setTransformedTitle] = useState(title);

    useEffect(() => {
        // if (title) {
        //     if (title === title.toLowerCase()) setTransformedTitle(title.toUpperCase());
        // }
        setTransformedTitle(title.toUpperCase());
    }, [title]);

    debugger;
    return transformedTitle;
}