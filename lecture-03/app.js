import React from 'react';
import ReactDOM from 'react-dom/client';

//React element(a JavaScript object that represents a DOM element.)
// const Title = () => (
//     <h1 className='head' tabIndex="5">
//     Laying the foundation using JSX!
//     </h1>);

//Component composition
// const HeadingComponent = () => (
//     <div id="container">
//         <Title />
//         <h1>Functional component</h1>
//     </div>
// );

// const number = 1000;

//Any JS code can be written inside a curly braces and put inside the JSX function
// const HeadingComponent = () => (
//     <div id="container">
//         {number}
//         <h1>Functional component</h1>
//     </div>
// );

// const elem = <span>React Element</span>

// const HeadingComponent = () => (
//     <div id="container">
//         <h1>Functional component</h1>
//     </div>
// );

// const Title = () => (
//     <h1 className='head' tabIndex="5">
//         {elem}
//     Laying the foundation using JSX!
//     <HeadingComponent />
//     </h1>);

const Title = () => (
    <h1 className='head' tabIndex="5">
    Laying the foundation using JSX!
    </h1>);

const HeadingComponent = () => (
    <div id="container">
        {Title()}
        <Title />
        <Title></Title>
        <h1 className="heading">Functional component</h1>
    </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<HeadingComponent />);