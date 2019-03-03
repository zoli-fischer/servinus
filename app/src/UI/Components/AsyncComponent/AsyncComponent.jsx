/**
 * @source https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html
 */
import React, { useEffect, useState } from 'react';

export default function asyncComponent(importComponent) {
    return (props) => {
        const [Component, setComponent] = useState(null);

        useEffect(() => {
            importComponent().then(response => {
                setComponent(() => response.default);
            });
        }, []);

        return Component ? <Component {...props} /> : null;
    }
}
