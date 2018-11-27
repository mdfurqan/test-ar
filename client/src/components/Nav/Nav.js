import React from 'react';
import '../../styles/Intro.css';
import './Nav.css';

export const Nav = ({loggedIn, logout}) => (
  <nav>
    <ul>
      {loggedIn ? (
        <li>
          <button type='button'
                  id='logOut'
                  className='btn btn-primary'
                  onClick={(event) => logout(event)} >
            LOGOUT
          </button>
        </li>
      ) :
        null
      }
      <li>
        <a href='https://github.com/Geoff-Goodwin-Dev/Table-AR/'>Github</a>
      </li>
    </ul>
  </nav>
);