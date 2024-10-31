import React, {useState, useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import BalanceCard from './BalanceCard';
import {getUser, getCustomers, formatFirebaseTimestamp} from './storage';

const Home = ({navigation}) => {
  const [customers, setCustomers] = useState([]);
  const [userId, setUserId] = useState();
  const [userEmail, setUserEmail] = useState();

  const fetchUser = async () => {
    const user = await getUser();
    setUserId(user.id);
    setUserEmail(user.email);
  };

  const fetchCustomers = async () => {
    const customers = await getCustomers(userId);
    setCustomers(customers);
  };

  useFocusEffect(
    useCallback(() => {
      fetchUser();
      fetchCustomers();
    }, []),
  );

  const renderItem = useCallback(({item}) => {
    const formattedDateTime = formatFirebaseTimestamp(item.createdAt);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CustomerInfo', {customer: item})}>
        <View style={styles.itemContainer}>
          <View style={styles.customerInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text
                style={
                  styles.dateTime
                }>{`${formattedDateTime.date} • ${formattedDateTime.time}`}</Text>
            </View>
          </View>
          <View style={styles.amountContainer}>
            <Text
              style={
                item.type === 'send' ? styles.sendAmount : styles.requestAmount
              }>
              Rs {item.amount}
            </Text>
            <TouchableOpacity
              style={
                item.type === 'send' ? styles.sendButton : styles.requestButton
              }>
              <Text
                style={
                  item.type === 'send'
                    ? styles.sendButtonText
                    : styles.requestButtonText
                }>
                {item.type === 'send' ? 'Send' : 'Request'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <BalanceCard />
      <FlatList
        data={customers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: 60}}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('AddCustomer')}
        style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>Add Customer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020', // Background color for the entire screen
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2c2c2c',
    backgroundColor: '#202020', // Dark background
    paddingHorizontal: 15,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5e5e5e', // Gray avatar background
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    marginLeft: 10,
  },
  name: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateTime: {
    color: '#A9A9A9',
    fontSize: 12,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  sendAmount: {
    color: '#00FF00', // Green for send amount
    fontSize: 16,
    fontWeight: 'bold',
  },
  requestAmount: {
    color: '#FF4500', // Red for request amount
    fontSize: 16,
    fontWeight: 'bold',
  },
  sendButton: {
    marginTop: 5,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderColor: '#00FF00', // Green border for send button
    borderWidth: 1,
    borderRadius: 5,
  },
  requestButton: {
    marginTop: 5,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderColor: '#FF0000', // Red border for request button
    borderWidth: 1,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#00FF00',
    fontSize: 12,
    fontWeight: 'bold',
  },
  requestButtonText: {
    color: '#FF0000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  floatingButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Home;
