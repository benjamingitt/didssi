import React, {useEffect, useRef} from 'react';
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory();


export const ScrollToTop = ({children}) => {
    const ref = useRef();

    useEffect(() => {
        const unlisten = history.listen(() => {
            //Main component with 100vh
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ref.current.firstElementChild.firstElementChild.scrollTo(0, 0);
        });

        return () => {
            unlisten();
        };
    }, []);


    return (
        <div ref={ref}>
            {children}
        </div>
    );
};
