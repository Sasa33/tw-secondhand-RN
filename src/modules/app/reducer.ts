import * as D from '../../definitions'
import * as Redux from 'redux'
import { USER_LOGIN_SUC, USER_LOGOUT_SUC, USER_LOGOUT_FAIL } from '../user/actions'


const initialState: D.AppState  = {
    loading: false,
    logined: false,
}

const appReducer: Redux.Reducer<D.AppState> = (state: D.AppState, action: Redux.Action): D.AppState => {
    state = state || initialState
    switch (action.type) {
        case USER_LOGIN_SUC:
            return {
                ...state,
                logined: true
            }
        case USER_LOGOUT_SUC:
        case USER_LOGOUT_FAIL:
            return {
                ...state,
                logined: false
            }
        default:
    }
    return state
}

export default appReducer
