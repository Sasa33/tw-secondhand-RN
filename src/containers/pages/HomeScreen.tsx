import * as React from 'react'
import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import { connect, DispatchProp } from 'react-redux'
import { Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import * as D from '../../definitions'
import { getProducts } from '../../modules/product/actions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {

  }
})

type HomePageProps<S> = DispatchProp<S> & {
    products: Array<D.Product>
}

class HomeScreen extends React.Component<HomePageProps<object>> {
  componentDidMount() {
    this.props.dispatch(getProducts())
  }

  render() {
    const { dispatch, products } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.objectId}
          renderItem={({item}) => (
            <View>
              <View>
                <Image source={{uri: item.img}} style={{width: 40, height: 40}} />
              </View>
              <View>
                <Text style={styles.item}>{item.name}</Text>
                <Text style={styles.item}>{item.price}</Text>
              </View>
            </View>
          )}
        />
      </View>
    )
  }
}

export default connect(
  (state: D.RootState) => ({
    products: state.products.available
  })
)(HomeScreen)