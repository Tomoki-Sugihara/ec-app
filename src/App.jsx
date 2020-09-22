import React from 'react';
import './assets/reset.css';
import './assets/style.css';
import Header from './components/header/Header';
import Router from './Router';

function App() {
   return (
      <>
         <Header></Header>
         <main className="c-main">
            <Router />
         </main>
      </>
   );
}

export default App;
