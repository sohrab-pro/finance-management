import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Settings = ({navigation}) => {
  const goBack = () => {
    navigation.navigate('HomeTab');
  };
  return (
    <View>
      <Text>Settings</Text>
      <TouchableOpacity onPress={goBack}>
        <Text>Click me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
