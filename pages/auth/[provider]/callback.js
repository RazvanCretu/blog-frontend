import React, { createContext, useState, useContext, useEffect } from 'react'
import { useAuth } from '../../../contexts/auth.js';

const CallBack = () => {

    const { login, isAuthenticated } = useAuth();

    if (!isAuthenticated){

        login();
    } 

    return <div></div>
  };
  
  export default CallBack;