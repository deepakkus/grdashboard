import {BrowserRouter, Route } from 'react-router-dom' 
import React from "react";
import Navbar from "./navbar"

function NavRoutes(){
return(
<div className="nav-menu">
    <BrowserRouter>
      <Navbar/>
       <Route path='/' /> 
       <Route path='/dashboard' />
       <Route path='/leaf' />
       <Route path='/sensors'/>
       <Route path='/gisAnalysis'/>
       <Route path='/settings'/>
    </BrowserRouter>
</div>
)
}

export default NavRoutes;
