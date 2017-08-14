import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { StyleSheet, Text, View, Image } from 'react-native'
import * as D from '../../definitions'
import { ModalWrapper } from '../layout/Modal'

type BuyProps<S> = DispatchProp<S> & {
  user: D.UserState;
  params: object
}

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
  },
})

class BuyScreen extends React.Component<BuyProps<object>> {
  render() {
    // const { navigate } = this.props.navigation
    const { product } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <Text> {product.name} </Text>
        <Text> {product.price} </Text>
      </View>
    )
  }
}

export default ModalWrapper(
  connect(
    (state: D.RootState) => ({
      user: state.user,
    })
  )(BuyScreen),
  {
    title: '商品详情'
  }
)