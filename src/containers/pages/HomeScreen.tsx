import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
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
    const { dispatch, products, navigation } = this.props

    return (
      <List
          list={products}
          handleClick={(listItem) => {
            // go to buy page
            // dispatch(NavigationActions.navigate({ routeName: 'buy', params: { product: listItem } }))
            // or
            navigation.navigate('buy', { product: listItem })
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