import * as React from 'react'
import * as D from '../../definitions'
import { StyleSheet, FlatList, View } from 'react-native'

import ListItem from './ListItem/ListItem'

interface ListProps {
  list: Array<D.Product>
  isSpecial?: boolean
  handleClick?: Function
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default (props: ListProps) => (
    <View style={styles.container}>
        <FlatList
            data={props.list}
            keyExtractor={(item) => item.objectId}
            renderItem={({item}) => (
                <ListItem
                    key={item.objectId}
                    listItem={item}
                    isSpecial={props.isSpecial || false}
                    handleClick={props.handleClick}
                />
            )}
        />
    </View>
)
