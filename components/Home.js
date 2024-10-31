import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {getCustomers} from './storage';
import {useEffect, useState} from 'react';

const Home = ({navigation}) => {
  const goBack = () => {
    navigation.navigate('Settings');
  };

  useEffect(() => {
    getCustomers();
  }, []);
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={goBack}>
        <Text>Click me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
