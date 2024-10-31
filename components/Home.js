import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Home = ({navigation}) => {
  const goBack = () => {
    navigation.navigate('Profile');
  };
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
