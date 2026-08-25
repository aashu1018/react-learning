import React from 'react';
import ReactDOM from 'react-dom/client';

//React element(a JavaScript object that represents a DOM element.)
const Title = () => (
    <h1 className='head' tabIndex="5">
    Laying the foundation using JSX!
    </h1>);

const HeadingComponent = () => (
    <div id="container">
        <Title />
        <h1>Functional component</h1>
    </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<HeadingComponent />);