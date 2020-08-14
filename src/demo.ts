import { createElement, mount, useState, useEffect } from './lib/index';

const sampleTitle = (props?) => {
    const [slogan, setSlogan] = useState('Hello Mini');
    useEffect(() => {
        console.log('useEffect cb', slogan);
    }, [slogan]);
    return createElement(
        'h1',
        {onClick: () => {
            setSlogan('Hello World');
        }},
        slogan,
    );
}
      
const sampleComponent = (props) => {
    return createElement(
        'div',
        {
            style: {
                color: 'red',
            },
        },
        sampleTitle(),
    );
};

mount(document.querySelector('#root'), sampleComponent, {
    text: 'Hello Mini',
});
