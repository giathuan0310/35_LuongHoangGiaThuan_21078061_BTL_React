import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker';

const FlightScreen = () => {
  const [selectedOption, setSelectedOption] = useState('Round Trip');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const options = ['Round Trip', 'One Way', 'Multi City'];

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());

  return (
    <View style={styles.container}>
      <Ionicons name="close" size={24} color="black" style={styles.backIcon} />
      <Text style={styles.title}>Flight</Text>

      <View style={styles.menuContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.menuButton}
            onPress={() => setSelectedOption(option)}
          >
            <Text
              style={[
                styles.menuText,
                selectedOption === option && styles.selectedMenuText,
              ]}
            >
              {option}
            </Text>
            {selectedOption === option && <View style={styles.underline} />}
          </TouchableOpacity>
        ))}
      </View>

      {selectedOption === 'Round Trip' && (
        <View style={styles.inputContainer}>
          
         
          
          <TextInput
            style={styles.input}
            placeholder="From"
            value={from}
            onChangeText={setFrom}
          />
        
          
          <TouchableOpacity onPress={handleSwap} style={styles.swapButton}>
            <Ionicons name="swap-horizontal" size={24} color="black" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="To"
            value={to}
            onChangeText={setTo}
          />

          
        </View>

      )}


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'flex-start', // Ensure elements start from the top
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginVertical: 10,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  menuButton: {
    alignItems: 'center', // Center text and underline
  },
  menuText: {
    fontSize: 16,
    color: 'black',
  },
  selectedMenuText: {
    fontWeight: 'bold', // Make selected text bold
  },
  underline: {
    marginTop: 5, // Space between text and underline
    height: 2,
    width: '100%',
    backgroundColor: 'black', // Underline color
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10, // Space between input fields
  },
  swapButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Space below the swap icon
  },
  mayBayIcon: {
    width: 20,
    height: 20,
},
searchBox: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    borderRadius: 10,
    marginRight: 10,
    paddingHorizontal: 10, // padding ngang để giữ khoảng cách 2 bên
    height: 50, // điều chỉnh chiều cao theo mong muốn
},
});

export default FlightScreen;
