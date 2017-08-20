import { reducer as nav } from './Router'
import app from '../modules/app/reducer'
import user from '../modules/user/reducer'
import products from '../modules/product/reducer'
import loading from '../modules/loader/reducer'

export default {
    nav,
    app,
    user,
    products,
    loading,
}
