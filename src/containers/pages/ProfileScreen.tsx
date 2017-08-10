import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { connect, DispatchProp } from 'react-redux'
import { Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'

import * as D from '../../definitions'
import { userLogin, userLogout } from '../../modules/user/actions'

export type ProfileProps<S> = DispatchProp<S> & {
  user: D.User
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

class ProfileScreen extends React.Component<ProfileProps<object>, object> {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Login"
          onPress={() => this.props.dispatch(userLogin({
              username: 'zenglei',
              password: '123',
            }))
          }
        />
        <Button
            title="Logout"
            onPress={() => this.props.dispatch(userLogout())
            }
        />
        <Text>Profile .... {this.props.user.name ? `This is ${this.props.user.name}` : null} !</Text>
        <Button
          title="Go to Home"
          onPress={() => {
            this.props.dispatch(NavigationActions.navigate({ routeName: 'home' }))
          }}
        />
        <Button
          title="Go Back"
          onPress={() => {
            this.props.dispatch(NavigationActions.back())
          }}
        />
        <Text>{this.props.app.logined ? 'logined' : 'not login'}</Text>
      </View>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    app: state.app,
  })
)(ProfileScreen)