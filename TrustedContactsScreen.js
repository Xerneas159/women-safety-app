import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import axios from 'axios';

const TrustedContactsScreen = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchTrustedContacts();
  }, []);

  const fetchTrustedContacts = async () => {
    try {
      const response = await axios.get('http://your-backend-url/api/trusted-contacts');
      setContacts(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch trusted contacts');
    }
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.phone}</Text>
    </View>
  );

  return (
    <View>
      <Text>Trusted Contacts</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <Button title="Refresh" onPress={fetchTrustedContacts} />
    </View>
  );
};

export default TrustedContactsScreen;
