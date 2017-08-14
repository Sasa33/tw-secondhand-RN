import * as React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'

import { connect, DispatchProp } from 'react-redux'
import Button from '../../components/Button'

import * as D from '../../definitions'
import { userLogin, userLogout } from '../../modules/user/actions'

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
  textInput: {
    marginVertical: 10,
    width: 200,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  }
})

const buttonStyle = {
  marginVertical: 10,
  width: 160,
}

class ProfileScreen extends React.Component<ProfileProps<object>, object> {
  state = {
    username: '',
    password: '',
  }
  render() {
    const { username, password } = this.state
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TextInput
            style={styles.textInput} value={username}
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="用户名"
            onChangeText={text => {this.setState({ username: text })}}
          />
          <TextInput
            style={styles.textInput} value={password}
            keyboardType="default"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={text => {this.setState({ password: text })}}
            placeholder="密码"
          />
          <Button
            title="Login"
            buttonStyle={buttonStyle}
            onPress={() => this.props.dispatch(userLogin({
                username: this.state.username,
                password: this.state.password,
              }))
            }
          />
          <Button
            title="Logout"
            buttonStyle={buttonStyle}
            onPress={() => this.props.dispatch(userLogout())
            }
          />
          <Text>Profile .... {this.props.user.name ? `This is ${this.props.user.name}` : null} !</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    app: state.app,
  })
)(ProfileScreen)
