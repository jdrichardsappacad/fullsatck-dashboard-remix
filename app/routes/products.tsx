import React from 'react'
import {NavLink, Outlet} from 'remix'
import type {LinksFunction} from 'remix'

import stylesUrl from "../styles/index.css";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};


export default function Products(){
   return (
    <div>
      <ul>
        <li>
            <NavLink to='/'>Products</NavLink> |
        </li>
        <li>
            <NavLink to='create'>Create Product</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
       
}

