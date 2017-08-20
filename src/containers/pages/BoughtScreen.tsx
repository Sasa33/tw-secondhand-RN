import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import * as D from '../../definitions'
import { getBoughtProducts } from '../../modules/product/actions'
import { List } from '../../components/'
import { LoaderWrapper } from '../layout/Loader'


export type BoughtProps<S> = DispatchProp<S> & {
  products: Array<D.Product>
}

class BoughtScreen extends React.Component<BoughtProps<object>> {
  componentDidMount() {
    this.props.dispatch(getBoughtProducts())
  }

  render() {
    const { products } = this.props

    return (
        <List
            list={products}
        />
    )
  }
}

export default LoaderWrapper(
  connect(
  state => ({
    products: state.products.bought,
  }))(BoughtScreen)
)