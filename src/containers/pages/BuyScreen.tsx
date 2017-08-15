import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Button } from '../../components/'
import * as D from '../../definitions'
import { ModalWrapper } from '../layout/Modal'
import { buyProduct } from '../../modules/product/actions'


type BuyProps<S> = DispatchProp<S> & {
  user: D.UserState;
  params: object
}

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
    flexDirection: 'column',
    alignItems: 'center',
  },
  img: {
    width: 100,
    height: 100,
  },
  product: {
    width: 300,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'baseline',
    marginTop: 30,
  },
  detail: {

  },
  owner: {

  },
  description: {
    marginVertical: 30,
    // textAlign: 'center',
  },
})

const buttonStyle = {
  marginVertical: 30,
  width: 250,
}

class BuyScreen extends React.Component<BuyProps<object>> {
  handleClick = (productId) => () => {
    const { user, dispatch, navigation } = this.props
    if (user.name) {
      dispatch(buyProduct(productId))
    } else {
      navigation.navigate('LoginStackNavigator', {
        referer: 'buy',
      })
    }
  }

  render() {
    const { product } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <Image source={{uri: product.img}} style={styles.img}/>
        <View style={styles.product}>
          <Text> {product.name} </Text>
          <View style={styles.detail}>
            <Text>{product.price}</Text>
            <View style={styles.owner}>
              {/*<Image source={icon} />*/}
              <Text> {product.owner.username} </Text>
            </View>
          </View>
        </View>
        <Text style={styles.description}> {product.description} </Text>
        <Button
            title="立即购买"
            style={buttonStyle}
            onPress={this.handleClick(product.productId)}
        />
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