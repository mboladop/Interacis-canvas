import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';

const Item = ({ title, id, resolution, action }) => {
  const onPress = () => { (!resolution) ? action(id) : null; }
  return ( <TouchableOpacity onPress={onPress} >
    <View style={{flex: 1, flexDirection: "row", padding:40 }}>
    <View style={{ flex:0.9}}>
      <Text>
        {title}
      </Text>
    </View>
    <View style={{ flex: 0.1}}>
      <Text>
      <Image
      style={{
        width: 20,
        height: 20,
      }}
        source={{uri: (resolution) ? "https://icons-for-free.com/iconfiles/png/512/mark+ok+success+tick+icon-1320183418964718934.png" : "https://icons-for-free.com/iconfiles/png/512/arrow+right+chevron+chevronright+right+right+icon+icon-1320185732203239715.png"}}
      />
      </Text>
    </View>
    </View>
  </TouchableOpacity > )
};

export default Item