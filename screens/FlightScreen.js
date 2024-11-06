import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker';

const FlightScreen = () => {
  const [selectedOption, setSelectedOption] = useState('Round Trip');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());

  const options = ['Round Trip', 'One Way', 'Multi City'];

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

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
          <View style={styles.searchBox}>
            <Image source={require('../assets/maybayfrom.png')} style={styles.mayBayIcon} />
            <TextInput
              style={styles.input}
              placeholder="From"
              value={from}
              onChangeText={setFrom}
            />
          </View>

          <TouchableOpacity onPress={handleSwap} style={styles.swapButton}>
            <Ionicons name="swap-horizontal" size={24} color="black" />
          </TouchableOpacity>

          <View style={styles.searchBox}>
            <Image source={require('../assets/maybayTo.png')} style={styles.mayBayIcon} />
            <TextInput
              style={styles.input}
              placeholder="To"
              value={to}
              onChangeText={setTo}
            />
          </View>

          {/* Departure Date Picker */}
          <View style={styles.dateContainer}>
            <Ionicons name="calendar" size={20} color="black" />
            {/* <DatePicker
              style={styles.datePicker}
              date={departureDate}
              mode="date"
              placeholder="Select Date"
              format="ddd, MMM DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateInput: styles.dateInput,
                dateText: styles.dateText,
              }}
              onDateChange={(date) => setDepartureDate(date)}
            /> */}
          </View>

          {/* Return Date Picker */}
          <View style={styles.dateContainer}>
            <Ionicons name="calendar" size={20} color="black" />
            <DatePicker
              style={styles.datePicker}
              date={returnDate}
              mode="date"
              placeholder="Select Date"
              format="ddd, MMM DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateInput: styles.dateInput,
                dateText: styles.dateText,
              }}
              onDateChange={(date) => setReturnDate(date)}
            />
          </View>
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
    justifyContent: 'flex-start',
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
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    color: 'black',
  },
  selectedMenuText: {
    fontWeight: 'bold',
  },
  underline: {
    marginTop: 5,
    height: 2,
    width: '100%',
    backgroundColor: 'black',
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    backgroundColor: 'transparent',
    outlineWidth: 0,
    flex: 1,
  },
  swapButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
    paddingHorizontal: 10,
    height: 50,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginLeft: 10,
    borderRadius: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    height: 50,
    marginTop: 10,
  },
  datePicker: {
    flex: 1,
  },
  dateInput: {
    borderWidth: 0,
    alignItems: 'flex-start',
  },
  dateText: {
    fontSize: 16,
    color: '#6b7280', // gray text color
  },
});

export default FlightScreen;
