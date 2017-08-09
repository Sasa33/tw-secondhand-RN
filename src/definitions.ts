import * as Redux from 'redux'
import * as Navigation from 'react-navigation'

// This file holds our app typings

// BUSINESS LOGIC
export interface App {
    loading: boolean
    logined: boolean
}

export interface User {
    name: string
}

export interface UserProfile {
    id: string
    email: string
}

export interface UserForLogin {
    username: string
    password: string
}

export interface Person {
    username: string
    objectId: string
}

export interface Product {
    name: string
    price: string
    img: string
    description: string
    owner: Person
    buyer?: Person
    objectId: string
}

export interface ProductForCreate {
    name: string
    price: string
    img: string
    description: string
}

// ACTION CREATORS

// ACTIONS
export interface GeneralAction extends Redux.Action {
    payload?: object
}
export interface UserLoginAction extends GeneralAction {
    payload?: UserForLogin
}
export interface UserAction extends GeneralAction {
    payload?: User | UserForLogin | UserProfile
}

// STATES
export type AppState = App
export type UserState = User

export interface RootState {
    user?: UserState
    app?: AppState
    nav?: {}
}