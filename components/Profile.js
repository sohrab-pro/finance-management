import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Profile = ({navigation}) => {
  const goBack = () => {
    navigation.navigate('Home');
  };
  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity onPress={goBack}>
        <Text>Click me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Profile;
