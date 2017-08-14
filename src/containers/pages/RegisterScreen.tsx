import * as React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Modal } from 'react-native'
import { Button } from 'react-native-elements'
import { connect, DispatchProp } from 'react-redux'
import { ModalWrapper } from '../layout/Modal'
import { userRegister } from '../../modules/user/actions'

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
})

export type RegisterProps<S> = DispatchProp<S> & {
}

class RegisterScreen extends React.Component<RegisterProps<object>> {
  render() {
    return (
        <View style={styles.container}>
          <Text>This is register page</Text>

          <Button
              title="Register"
              onPress={() => {
                this.props.dispatch(userRegister(
                    {
                      username: 'xuefei',
                      password: '123',
                    })
                )
              }}
          />
        </View>
    )
  }
}

export default ModalWrapper(connect()(RegisterScreen), {
  backTo: 'loginStack',
  title: '注册'
})