import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import Router, { useRouter } from 'next/router'
import axios from 'axios';

//api here is an axios instance which has the baseURL set according to the env.
import api from '../utils/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        async function loadTokenFromCookies() {
            const token = Cookies.get('token')
            if (token) {
                console.log("Got a token in the cookies, let's see if it is valid")

                api.defaults.headers.Authorization = `Bearer ${token}`
                const { data: user } = await api.get('users/me')
                if (user) setUser(user);
            }
            setLoading(false)
        }
        loadTokenFromCookies()
    }, [])

    const login = async () => {
        // window.location = "http://localhost:1337/connect/google";

        const { search } = window.location

        const { data: data } = await api.get(`auth/google/callback${search}`)

        // console.log(search)
        // console.log(data)
        if (data.jwt) {
            
            console.log("Got token")
            Cookies.set('token', data.jwt, { expires: 60, sameSite:"Strict" })
            api.defaults.headers.Authorization = `Bearer ${data.jwt}`


            const { data: user } = await api.get('users/me')
            setUser(user)
            // console.log("Got user", user)
        }
        // if (token) {
        //     console.log("Got token")
        //     Cookies.set('token', token, { expires: 60 })
        //     api.defaults.headers.Authorization = `Bearer ${token.token}`
        //     const { data: user } = await api.get('users/me')
        //     setUser(user)
        //     console.log("Got user", user)
        // }
    }

    const handleCallback = async () => {
        // console.log(window.location);

        const URL = `http://localhost:1337/auth/google/callback${window.location.search}`
        const { data } = await axios.get(URL);

        // if (data.jwt) {
        //     console.log("Got token")
        //     Cookies.set('token', data.jwt, { expires: 60, sameSite:"Strict" })
        //     api.defaults.headers.Authorization = `Bearer ${data.jwt}`
        //     const { data: user } = await api.get('users/me')
        //     setUser(user)
        //     console.log("Got user", user)
        // }

        Router.push('/')

        // console.log(data)

    }

    const logout = () => {
        Cookies.remove('token')
        setUser(null)
        delete api.defaults.headers.Authorization
        window.location.pathname = '/login'
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout, handleCallback }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export const ProtectRoute = ({ children }) => {
    const { isAuthenticated, isLoading , user , handleCallback } = useAuth();
    
    useEffect(
        () => {
            if (window.location.pathname === '/auth/google/callback') {
                // handleCallback()
            }
            if (isAuthenticated) {
                Router.push('/')
            } else {
                Router.push('/login')
            };
        }, [isAuthenticated]
    );

    if (!isAuthenticated && window.location.pathname !== '/login'){
        Router.push('/login'); 
    } 
        
    return children;
};