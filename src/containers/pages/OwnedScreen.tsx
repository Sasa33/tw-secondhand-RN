import * as React from 'react'

import { connect, DispatchProp } from 'react-redux'

import * as D from '../../definitions'
import { getOwnedProducts } from '../../modules/product/actions'
import { List } from '../../components/'

export type OwnedProps<S> = DispatchProp<S> & {
  products: Array<D.Product>
}

class OwnedScreen extends React.Component<OwnedProps<object>> {
  componentDidMount() {
    this.props.dispatch(getOwnedProducts())
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

export default connect(
  state => ({
    products: state.products.owned,
  })
)(OwnedScreen)