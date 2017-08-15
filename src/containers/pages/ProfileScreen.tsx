import * as React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import { connect, DispatchProp } from 'react-redux'
import { Button } from '../../components/'

import * as D from '../../definitions'
import { userLogout } from '../../modules/user/actions'
import { LoginChecker } from '../layout/CheckLogin'

export type ProfileProps<S> = DispatchProp<S> & {
  user: D.User,
  app: any,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent: 'space-between',
    justifyContent: 'center',
  },
  info: {
    width: 300,
    height: 120,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    shadowColor: '#CDCDC3',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    marginVertical: 30,
  },
  img: {
    width: 70,
    height: 70,
  }
})

const buttonStyle = {
  marginVertical: 30,
  width: 250,
}

const avatar = require('../../assets/profile.png')

const ProfileScreen = (props: ProfileProps<object>) => (
  <View style={styles.container}>
    <View style={styles.info}>
      <Image source={avatar} style={styles.img} />
      <Text>{props.user.name}</Text>
    </View>
    <Button
        title="已买宝贝"
        buttonStyle={buttonStyle}
        onPress={() => {
          props.navigation.navigate('bought')
        }}
    />
    <Button
        title="出售宝贝"
        buttonStyle={buttonStyle}
        onPress={() => {
          props.navigation.navigate('owned')
        }}
    />
    <Button
        title="退出登录"
        buttonStyle={buttonStyle}
        onPress={() => props.dispatch(userLogout())}
    />
  </View>
)

export default LoginChecker(
  connect(
    state => ({
      user: state.user,
    })
  )(ProfileScreen),
  {
    referer: 'profileStack'
  }
)