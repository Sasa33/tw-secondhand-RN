import * as React from 'react'
import * as D from '../../../definitions'
import { StyleSheet, View, Image, Text, TouchableHighlight } from 'react-native'

interface ListItemProps {
  listItem: D.Product
  isSpecial?: boolean
  handleClick?: Function
}

const styles = StyleSheet.create({
  item: {
    height: 150,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  imgWrapper: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
  img: {
    width: 120,
    height: 120,
  },
  itemInfo: {
    width: 150,
    height: 140,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 22
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  owner: {
    flexDirection: 'row',
  },
  buyer: {
    position: 'relative',
    top: -10,
    flexDirection: 'row',
  },
  mask: {
    position: 'absolute',
    left: 0,
    top:  0,
    width: 400,
    height: 150,
    backgroundColor: '#FCFAFA',
    opacity: 0.8,
  }
})

const userIcon = require('../../../assets/userIcon.png')

export default (props: ListItemProps) => {
  const { listItem, isSpecial, handleClick } = props
  const { name, img, price, owner, buyer } = listItem
  const isBought = 'buyer' in listItem
  const content = isBought ? (
    <View>
      <View style={styles.buyer}>
        <Image source={userIcon} style={styles.icon}/>
        <Text>{buyer.username}</Text>
      </View>
      <Text>交易关闭</Text>
    </View>
  ) : <Text>出售中</Text>

  return (
    <TouchableHighlight
        onPress={() => {
          if (handleClick) {
            handleClick(listItem)
          }
        }}
    >
      <View style={styles.item}>
        <View style={styles.imgWrapper}>
          <Image source={{uri: img}} style={styles.img} />
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.title}>{name}</Text>
          <Text>{price}</Text>
          {
            !isSpecial ? (
                <View style={styles.owner}>
                  <Image source={userIcon} style={styles.icon}/>
                  <Text>{owner.username}</Text>
                </View>
            ) : (content)
          }
        </View>
        {isSpecial && isBought ? <View style={styles.mask}><Text/></View> : null}
      </View>
    </TouchableHighlight>
  )
}
