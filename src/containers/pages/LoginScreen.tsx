import * as React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Modal, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Button } from 'react-native-elements'
import { connect, DispatchProp } from 'react-redux'
import { ModalWrapper } from '../layout/Modal'
import { userLogin } from '../../modules/user/actions'

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

export type LoginProps<S> = DispatchProp<S> & {
}

class LoginScreen extends React.Component<LoginProps<object>> {
  state = {
    username: '',
    password: '',
  }

  render() {
    const { referer } = this.props.navigation.state.params || {}
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
            onPress={() => this.props.dispatch(userLogin(
              {
                username: this.state.username,
                password: this.state.password,
              },
              {
                referer: referer
              }))
            }
          />
          <Button
            title="Register"
            onPress={() => {
              this.props.navigation.navigate('register')
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default ModalWrapper(connect()(LoginScreen), {
  backTo: 'homeStack',
  title: '登录'
})