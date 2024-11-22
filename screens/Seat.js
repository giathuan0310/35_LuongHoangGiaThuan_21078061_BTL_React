import Checkbox from "expo-checkbox";
import { useState } from "react";
import { StyleSheet, Text, View, Pressable, FlatList,TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
export default function Seat({ route, navigation }) {
  const [isChecked, setChecked] = useState(false);
  const [totalPrice1, setTotalPrice] = useState(0);
  const [checkboxData, setCheckboxData] = useState([
    { id: 1, label: "Option 1", isChecked: false },
    { id: 2, label: "Option 2", isChecked: false },
    { id: 3, label: "Option 3", isChecked: false },
    { id: 4, label: "Option 4", isChecked: false },
    { id: 5, label: "Option 5", isChecked: false },
    { id: 6, label: "Option 6", isChecked: false },
    { id: 7, label: "Option 7", isChecked: false },
    { id: 8, label: "Option 8", isChecked: false },
    { id: 9, label: "Option 9", isChecked: false },
    { id: 10, label: "Option 10", isChecked: false },
    { id: 11, label: "Option 11", isChecked: false },
    { id: 12, label: "Option 12", isChecked: false },
    { id: 13, label: "Option 13", isChecked: false },
    { id: 14, label: "Option 14", isChecked: false },
    { id: 15, label: "Option 15", isChecked: false },
  ]);

  const [checkboxData2, setCheckboxData2] = useState([
    { id: 17, label: "Option 1", isChecked: false },
    { id: 18, label: "Option 2", isChecked: false },
    { id: 19, label: "Option 3", isChecked: false },
    { id: 20, label: "Option 4", isChecked: false },
    { id: 21, label: "Option 5", isChecked: false },
    { id: 22, label: "Option 6", isChecked: false },
    { id: 23, label: "Option 7", isChecked: false },
    { id: 24, label: "Option 8", isChecked: false },
    { id: 25, label: "Option 9", isChecked: false },
    { id: 26, label: "Option 10", isChecked: false },
    { id: 27, label: "Option 11", isChecked: false },
    { id: 28, label: "Option 12", isChecked: false },
    { id: 29, label: "Option 13", isChecked: false },
    { id: 30, label: "Option 14", isChecked: false },
    { id: 31, label: "Option 15", isChecked: false },
  ]);

  const handleCheckboxChange = (id, data, setData) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          const newCheckedState = !item.isChecked;
          setTotalPrice((prevPrice) =>
            newCheckedState ? prevPrice + 5.68 : prevPrice - 5.68
          );
          return { ...item, isChecked: newCheckedState };
        }
        return item;
      })
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.section}>
      <Checkbox
        style={styles.checkbox}
        value={item.isChecked}
        onValueChange={() => handleCheckboxChange(item.id, checkboxData, setCheckboxData)}
        color={item.isChecked ? "#4630EB" : undefined}
      />
    </View>
  );

  const renderItem2 = ({ item }) => (
    <View style={styles.section}>
      <Checkbox
        style={styles.checkbox}
        value={item.isChecked}
        onValueChange={() => handleCheckboxChange(item.id, checkboxData2, setCheckboxData2)}
        color={item.isChecked ? "#4630EB" : undefined}
      />
    </View>
  );

  return (
    <View style={styles.container}>
              <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={()=> navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <Text style={styles.title}>LCY-JFK</Text>

              </View>
               
      <View style={styles.header}>
        <View style={styles.section}>
          <Checkbox style={styles.checkbox} />
          <Text>Available Seat</Text>
        </View>

        <View style={[styles.section]}>
          <Checkbox
            disabled
            color="gray"
            uncheckedColor="gray"
            style={styles.checkbox}
          />
          <Text style={styles.paragraph}>X</Text>
          <Text>UnAvailable Seat</Text>
        </View>

        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#4630EB" : undefined}
          />
          <Text>Selected</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.layoutContent}>
          <View>
            <View style={{
                
                flexDirection: "row",
                width:120,
                justifyContent: "space-between",
                paddingLeft:20
              }}>
              <Text>A</Text>
              <Text>B</Text>
              <Text>C</Text>
            </View>

            <View style={styles.checkBoxContent}>
              <FlatList
                data={checkboxData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                contentContainerStyle={{
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              />
            </View>
          </View>
          <View>
            <View
              style={{
                marginTop: 20,
                flexDirection: "column",
                height: 205,
                justifyContent: "space-between",
              }}
            >
              <Text>01</Text>
              <Text>02</Text>
              <Text>03</Text>
              <Text>04</Text>
              <Text>05</Text>
            </View>
          </View>
          <View>
            <View style={
              {
                flexDirection: "row",
                width:120,
                justifyContent: "space-between",
                paddingLeft:20

              }

            }>
              <Text>D</Text>
              <Text>E</Text>
              <Text>F</Text>
            </View>

            <View style={styles.checkBoxContent}>
              <FlatList
                data={checkboxData2}
                renderItem={renderItem2}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View
          style={{
            height: 40,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Select Seat 1 of 1
          </Text>
          <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Total Price: ${totalPrice1.toFixed(2)}</Text>
        </View>
        </View>

        <View>
          <Pressable style={styles.btnSelect}>
            <Text style={{ color: "white", fontWeight: "bold" }}
            onPress={()=> navigation.navigate('TravellerInformation',{
             

            })}
            
            >Select</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  btnSelect: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 40,
    backgroundColor: "aqua",
  },

  footer: {
    flexDirection: "row",
    width: "100%",
    
    justifyContent: "space-between",
  },

  checkBoxContent: {},

  lableContent: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginLeft: -3,
  },

  content: {
    borderTopWidth: 2,
    borderStyle: "solid",
    borderColor: "black",
    marginTop: 30,
    flexDirection: "row",
    width: "100%",
    height: 330,
    justifyContent: "center",
  },

  layoutContent: {
    width: "90%",
    height: 430,

    flexDirection: "row",
    justifyContent: "space-between",
  },

  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    position: "absolute",
    fontSize: 15,
    marginLeft: 18,
  },
  checkbox: {
    width: 30,
    height: 30,
    backgroundColor: "gray",
    margin: 8,
  },

  header: {},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    paddingLeft:120
},
});
