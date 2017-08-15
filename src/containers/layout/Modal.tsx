import React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import * as D from '../../definitions'

const styles = StyleSheet.create({
  container: {
    marginTop: 27,
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    marginRight: 80,
    padding: 0,
  },
  buttonText: {
    color: '#333',
    fontSize: 24,
  },
  title: {
    width: 80,
    fontSize: 18,
    textAlign: 'center',
  }
})

export type ModalProps<S> = DispatchProp<S> & {
}

class Modal extends React.Component<ModalProps<object>> {
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
                title="&times;"
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
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
)(Modal)

export const ModalWrapper = (InnerContent, config = null) => props => {
  return (
      <ConnectedModal {...config} {...props}>
        <InnerContent {...props}/>
      </ConnectedModal>
  )
}

export default ConnectedModal