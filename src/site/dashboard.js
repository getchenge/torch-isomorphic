import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Banner from './components/Banner';

const items = [{ name: 'google', link: 'http://google.com', tabs: [{ name: 'google+', link: 'http://google.com/plus' }, { name: 'google-', link: 'http://google.com/minus' }] },
{ name: 'facebook', link: 'http://facebook.com', tabs: [{ name: 'google+', link: 'http://google.com/plus' }, { name: 'google-', link: 'http://google.com/minus' }] },
{ name: 'twitter', link: 'http://twitter.com', tabs: [{ name: 'google+', link: 'http://google.com/plus' }, { name: 'google-', link: 'http://google.com/minus' }] }];
const demo = (
  <div>
    <Header>
      <Nav items={items} />
    </Header>
    <Banner />
  </div>
);
ReactDOM.render(demo, document.querySelector('#root'));
