import * as React from 'react'
import * as Redux from 'redux'
import { connect } from 'react-redux'

interface CheckLoginProps {
  children?: React.Component
  dispatch: Redux.Dispatch<object>
  logined: boolean
  referer: string
}

class CheckLogin extends React.Component<CheckLoginProps> {
  componentWillReceiveProps(nextProps) {
    const { referer, nav: originalNav, navigation } = this.props
    const { logined, nav } = nextProps
    const index = nav.index
    const innerIndex = nav.routes[index].index
    const currentRouterName = nav.routes[0].routes[innerIndex].routeName

    const popUpLogin = !logined && nav.routes[0].index !== originalNav.routes[0].index
        && currentRouterName === referer
    if (popUpLogin) {
      navigation.navigate('LoginStackNavigator', { referer: referer })
    }
  }

  render() {
    const { children, logined } = this.props

    return logined ? children : null
  }
}

const ConnectedCheckLogin = connect(
  state => ({
    logined: state.user.name !== '',
    nav: state.nav
  })
)(CheckLogin)

export const LoginChecker = (InnerComp, config) => props => {
  const { referer } = config
  return (
      <ConnectedCheckLogin referer={referer} {...props}>
        <InnerComp {...props}/>
      </ConnectedCheckLogin>
  )
}

export default ConnectedCheckLogin
