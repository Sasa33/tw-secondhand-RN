import React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { StyleSheet, View, Text, Modal, TouchableHighlight } from 'react-native'
import { Button } from 'react-native-elements'
import * as D from '../../definitions'

const styles = StyleSheet.create({
  container: {
    marginTop: 27,
  },
  header: {
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    position: 'relative',
    top: -20,
    width: 40,
    height: 10,
    backgroundColor: 'white',
    marginRight: 100,
  },
  title: {
    width: 40,
    height: 40,
    fontSize: 18,
    textAlign: 'center'
  }
})

export type ModalProps<S> = DispatchProp<S> & {

}

class MyModal extends React.Component<ModalProps<object>> {
  onClose(target: string) {
    this.props.navigation.goBack(null)
    if (target && target.startsWith('home')) {
      this.props.navigation.navigate(target)
    }
  }

  render() {
    const { children, backTo, title } = this.props

    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Button
                title="X"
                style={styles.button}
                onPress={() => this.onClose(backTo)}
            />
            <Text style={styles.title}>{title}</Text>
          </View>
          {children}
        </View>
    )
  }
}

const ConnectedModal = connect(
    (state: D.RootState) => ({
      user: state.user,
      nav: state.nav,
    })
)(MyModal)

export const ModalWrapper = (InnerContent, config = null) => props => {
  return (
      <ConnectedModal {...config} {...props}>
        <InnerContent {...props}/>
      </ConnectedModal>
  )
}

export default ConnectedModal