import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
// import { NavigationActions } from 'react-navigation'
import * as D from '../../definitions'
import { getProducts } from '../../modules/product/actions'

import { List } from '../../components/'

type HomePageProps<S> = DispatchProp<S> & {
    products: Array<D.Product>
}

class HomeScreen extends React.Component<HomePageProps<object>> {
  componentDidMount() {
    this.props.dispatch(getProducts())
  }

  render() {
    const { products } = this.props

    return (
      <List
          list={products}
          handleClick={(listItem) => {
            console.log('item clicked...')
            // go to buy page
          }}
      />
    )
  }
}

export default connect(
  (state: D.RootState) => ({
    products: state.products.available
  })
)(HomeScreen)