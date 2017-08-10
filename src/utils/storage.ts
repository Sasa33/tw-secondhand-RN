import * as D from '../definitions'
import { AsyncStorage } from 'react-native'

const USER_STORAGE_KEY = 'user'

async function setUser(user: D.UserProfile) {
  await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  return Promise.resolve(user)
}

async function removeUser() {
  await AsyncStorage.removeItem(USER_STORAGE_KEY)
  return Promise.resolve(null)
}

async function getToken() {
  const value = await AsyncStorage.getItem(USER_STORAGE_KEY)
  const user = JSON.parse(value)
  return user ? user.sessionToken : undefined
}

export default {
  setUser,
  removeUser,
  getToken,
}
