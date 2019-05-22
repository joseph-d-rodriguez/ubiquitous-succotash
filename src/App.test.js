import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createOwGtStore } from './gt-boot';
import assert from 'assert';

it('renders without crashing', () => {
  const store = createOwGtStore();
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);

  assert(1 === 1);

  let appDom = div.firstElementChild;
  assert(!!appDom);
  assert(!!appDom.className);
  assert(appDom.className.indexOf('App') !== -1);
  assert(appDom.children.length === 2); // <header> and <div class="changes">


  ReactDOM.unmountComponentAtNode(div);
});
