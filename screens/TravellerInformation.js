import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Picker,StyleSheet, ScrollView, TouchableOpacity, Dimensions, SafeAreaView, Platform, TextInput, Modal, Button } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
//npm i react-native-progress-steps cài tiến trinh
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
const TravellerInformation = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');   
  
    const [phone, setPhone] = useState('+07');   
  
    //tien trinh
    const[step1Data,setStep1Data]=useState({name:'',address:''});
    const[step2Data,setStep2Data]=useState({email:'',username:''});
    const[step3Data,setStep3Data]=useState({password:'',retypePassword:''});
    
    return (
        <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
             {/* Phần header */}
             <View style={styles.headerContainer}>
             
                    <View style={styles.header}>
                            <Ionicons name="arrow-back" size={24} color="black" style={styles.backIcon} />
                            {/* Tiến trình */}
                            {/* Khu vực có thể cuộn cho nội dung toàn bộ màn hình */}
                            <ScrollView style={{ width: "100%", height: 600 }}>  
                           <ProgressSteps>
                             
                                <ProgressStep label='Step 1'>
                                <Text style={styles.title}>Traveller information</Text>
                                        {/* Phần  body*/}
                                        <View style={styles.bodyiInput}>
                                                        <Text >Traveller: 1 adult</Text>
                                                        <View style={styles.containInput}>
                                                                <label style={styles.textLabel}>First name</label>
                                                                <TextInput
                                                                style={styles.input}
                                                                placeholder="First name"
                                                                value={firstName}
                                                                onChangeText={setFirstName}
                                                                />
                                                                {/* ... other inputs */}
                                                                <label style={styles.textLabel}>Last name</label>
                                                                <TextInput
                                                                style={styles.input}
                                                                placeholder="Last name"
                                                                value={lastName}
                                                                onChangeText={setLastName}
                                                                />

                                                                {/* Gender */}
                                                                <label style={styles.textLabel}>Gender</label>
                                                                <Picker
                                                                    style={styles.picker}   

                                                                    selectedValue={gender}
                                                                    onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                                                                >
                                                                    <Picker.Item label="Select option" value="" />
                                                                    <Picker.Item label="Male" value="male" />
                                                                    <Picker.Item label="Female" value="female" />   
                                                                </Picker>


                                                        {/* Contact details */}
                                                                <Text style={{paddingBottom:20}}>Contact details</Text>
                                                                <label style={styles.textLabel}>Contact email</label>
                                                                <TextInput
                                                                                style={styles.input}
                                                                                placeholder="Your email"
                                                                                value={email}
                                                                                onChangeText={setEmail}
                                                                />
                                                                <label style={styles.textLabel}>Contact phone</label>
                                                                <TextInput
                                                                                style={styles.input}
                                                                                placeholder="Contact   
                                                                        phone"
                                                                                value={phone}
                                                                                onChangeText={setPhone}
                                                                />



                                                        </View>

                                                    
                                        </View>
                                        {/* footer */}
             <View style={styles.buttonContainer}>
                    <Text style={styles.price}>$806</Text> 
                </View>
     

                                            

                                </ProgressStep>

                                    <ProgressStep label='Step 2'>
                                        <View style={styles.stepContent}>
                                                
                                        </View>

                                    </ProgressStep>

                                    <ProgressStep label='Step 3'>
                                        <View style={styles.stepContent}>
                                              
                                        </View>

                                    </ProgressStep>
                           
                           </ProgressSteps>
                           </ScrollView>
                           
                    </View>
                   
                </View>
           
                       
            


        </View>
    </SafeAreaView>
    );
  };


  const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backIcon:{
        paddingTop:10

    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    headerContainer: {
        backgroundColor: '#fff',
        height: 130,
    },
    header: {
        padding: 10,
        marginTop: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
       
        justifyContent: 'space-between'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      marginLeft:80
    },
    bodyiInput:{
        padding: 20,

    },
    input: {
      borderBottomWidth: 1,
      borderColor: '#ccc',
      marginBottom: 30,
      padding: 10,
      borderRadius:10
      
    },
    textLabel:{
        
        fontWeight: 'bold', 

    },
    picker: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 30,
        padding: 10,
        borderRadius:10
    },
    buttonContainer: {
      
      marginTop: 20,
      padding:10
    },
    
    price: {
      fontWeight: 'bold',
    },
    containInput:{
        paddingTop:20


    },
//css cho progess
stepContent:{

},
labelText:{

},


  });
  
  export default TravellerInformation;