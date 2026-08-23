import React from 'react';
import ReactDOM from 'react-dom/client';

const parent = React.createElement('div', { id: 'parent' }, [
    React.createElement('div', { id: 'child', key: 'child-1' }, [
        React.createElement('h1', { key: 'h1' }, 'I am an h1 tag'),
        React.createElement('h2', { key: 'h2' }, 'I am an h2 tag'),
    ]),
    React.createElement('div', { id: 'child', key: 'child-2' }, [
        React.createElement('h1', { key: 'h1' }, 'I am an h1 tag'),
        React.createElement('h2', { key: 'h2' }, 'I am an h2 tag'),
    ]),
]);

console.log(parent);
    
const root = ReactDOM.createRoot(document.getElementById('root'));
    
root.render(parent);