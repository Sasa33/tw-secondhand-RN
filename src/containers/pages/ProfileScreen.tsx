import * as React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import { connect, DispatchProp } from 'react-redux'
import Button from '../../components/Button'

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
  img: {
    width: 50,
    height: 50,
  }
})

const avatar = require('../../assets/profile.png')

const ProfileScreen = (props: ProfileProps<object>) => (
  <View style={styles.container}>
    <View className="Info">
      <Image source={avatar} style={styles.img} />
      <Text>{props.user.name}</Text>
    </View>
    <Button
        title="已买宝贝"
        onPress={() => {
          props.dispatch(NavigationActions.navigate({ routeName: 'bought' }))
        }}
    />
    <Button
        title="出售宝贝"
        onPress={() => {
          props.dispatch(NavigationActions.navigate({ routeName: 'owned' }))
        }}
    />
    <Button
        title="退出登录"
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