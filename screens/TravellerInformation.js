import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Picker,StyleSheet, ScrollView, TouchableOpacity, Dimensions, SafeAreaView, Platform, TextInput, Modal, Button } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
//npm i react-native-progress-steps cài tiến trinh
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { CheckBox } from 'react-native-web';
const TravellerInformation = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');   
  
    const [phone, setPhone] = useState('+07');   
  
    //tien trinh
    // const[step1Data,setStep1Data]=useState({name:'',address:''});
    // const[step2Data,setStep2Data]=useState({email:'',username:''});
    // const[step3Data,setStep3Data]=useState({password:'',retypePassword:''});
    
     //Step 2
    // Trạng thái cho các mục checkbox, sử dụng một object để lưu trữ các mục đã chọn
    const [selectedOptions, setSelectedOptions] = useState({
        personalItem: false,
        checkedBag: false,
        noCheckedBag: false,
        protect: false,
        noInsurance: false,
    });

    const handleCheckboxPress = (option) => {
        setSelectedOptions((prevOptions) => ({
            ...prevOptions,
            [option]: !prevOptions[option], // Chuyển đổi trạng thái của mục đã chọn
        }));
    };
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
                                {/* Step1 */}
                                <ProgressStep label={<Ionicons name="person" size={24} color="black" style={styles.backIcon} />}>
                                <Text style={styles.title}>Traveller information</Text>
                                <View style={styles.hr}/>
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
                                        <View style={styles.hr}/>
                                        <View style={styles.buttonContainer}>
                                                <Text style={styles.price}>$806</Text> 
                                        </View>
                                </ProgressStep>

                                {/* Step2 */}
                                <ProgressStep label={<Ionicons name="briefcase" size={24} color="black" style={styles.backIcon} />}>
                                    <Text style={styles.title}>Baggage</Text>
                                    <View style={styles.hr}/>
                                    <View style={styles.bodyInput}>
                                        <View style={styles.containInput}>
                                            <label style={styles.textLabel}>Cabin bags</label>
                                            <TouchableOpacity onPress={() => handleCheckboxPress("personalItem")} style={styles.checkboxContainer}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Ionicons name="briefcase" size={20} color="black" />
                                                    <Text style={styles.checkboxText}>Personal item only</Text>
                                                    <View style={styles.checkbox}>
                                                        {selectedOptions.personalItem && <Ionicons name="radio-button-on" size={15} color="#00BDD5" />}
                                                    </View>
                                                </View>
                                                <Text style={styles.checkboxSubtext}>Included per traveller</Text>
                                            </TouchableOpacity>
                                            
                                            <View style={styles.hr}/>
                                            <label style={styles.textLabel}>Checked bags</label>
                                            <TouchableOpacity onPress={() => handleCheckboxPress("checkedBag")} style={styles.checkboxContainer}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Ionicons name="briefcase" size={20} color="black" />
                                                    <Text style={styles.checkboxText}>1 checked bag (Max weight 22.1 lbs)</Text>
                                                    <View style={styles.checkbox}>
                                                        {selectedOptions.checkedBag && <Ionicons name="radio-button-on" size={15} color="#00BDD5" />}
                                                    </View>
                                                </View>
                                                <Text style={styles.checkboxSubtext}>from $19.99</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => handleCheckboxPress("noCheckedBag")} style={styles.checkboxContainer}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Ionicons name="remove-circle" size={20} color="black" />
                                                    <Text style={styles.checkboxText}>No checked bags</Text>
                                                    <View style={styles.checkbox}>
                                                        {selectedOptions.noCheckedBag && <Ionicons name="radio-button-on" size={15} color="#00BDD5" />}
                                                    </View>
                                                </View>
                                                <Text style={styles.checkboxSubtext}>$00.00</Text>
                                            </TouchableOpacity>

                                            <View style={styles.hr}/>
                                            <label style={styles.textLabel}>Travel protection</label>
                                            <TouchableOpacity onPress={() => handleCheckboxPress("protect")} style={styles.checkboxContainer}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Ionicons name="shield" size={20} color="black" />
                                                    <Text style={styles.checkboxText}>Travel protection</Text>
                                                    <View style={styles.checkbox}>
                                                        {selectedOptions.protect && <Ionicons name="radio-button-on" size={15} color="#00BDD5" />}
                                                    </View>
                                                </View>
                                                <Text style={styles.checkboxSubtext}>from $19.99</Text>
                                            </TouchableOpacity>

                                            <Image source={require('../assets/imageProtect.png')} style={styles.ImageProtect} />

                                            <TouchableOpacity onPress={() => handleCheckboxPress("noInsurance")} style={styles.checkboxContainer}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Ionicons name="remove-circle" size={20} color="black" />
                                                    <Text style={styles.checkboxText}>No insurance</Text>
                                                    <View style={styles.checkbox}>
                                                        {selectedOptions.noInsurance && <Ionicons name="radio-button-on" size={15} color="#00BDD5" />}
                                                    </View>
                                                </View>
                                                <Text style={styles.checkboxSubtext}>$00.00</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <Text style={styles.price}>$806</Text> 
                                    </View>
                                </ProgressStep>
                                {/* Step3 */}
                                <ProgressStep label={<Ionicons name="bed" size={24} color="black" style={styles.backIcon} />}>
                                        <Text style={styles.title}>Seat</Text>

                                        <View style={styles.hr}/>
                                        {/* Phần  body*/}
                                        <View style={styles.bodyiInput}>
                                                        
                                                        <View style={styles.containInput}>
                                                                <label style={styles.textLabel}>Flight to New York</label>
                                                               
                                                                <View style={{ flexDirection: 'row',justifyContent:'space-around' }}>
                                                                        <Image source={require('../assets/seat.png')}  />
                                                                            <View>
                                                                                <Text>LCY - JFK</Text>
                                                                                <Text style={styles.checkboxSubtext}>Seats from $5</Text>
                                                                            </View>
                                                                            <TouchableOpacity  >
                                                                                    <Text style={{color:"#B7AADB"}}>Select</Text>
                                                                            </TouchableOpacity>   
                                                                </View>

                                                                <View style={styles.hr}/>
                                                       
                                                                <label style={styles.textLabel}>Flight to London</label>
                                                               
                                                                <View style={{ flexDirection: 'row',justifyContent:'space-around' }}>
                                                                        <Image source={require('../assets/seat.png')}  />
                                                                            <View>
                                                                                <Text>LCY - JFK</Text>
                                                                                <Text style={styles.checkboxSubtext}>Seats from $4.59</Text>
                                                                            </View>
                                                                            <TouchableOpacity  >
                                                                                    <Text style={{color:"#B7AADB"}}>Select</Text>
                                                                            </TouchableOpacity>   
                                                                </View>

                                                        </View>

                                                    
                                        </View>
                                        {/* footer */}
                                        <View style={styles.hr}/>
                                        <View style={styles.buttonContainer}>
                                                <Text style={styles.price}>$806</Text> 
                                        </View>

                                </ProgressStep>
                           
                                {/* Step4 */}
                                <ProgressStep label={<Ionicons name="card" size={24} color="black" style={styles.backIcon} />}>
                                            <Text style={styles.title}>Payment</Text>

                                            <View style={styles.hr}/>

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
      textAlign:'center'
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
    hr: {
        width: '100%',
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 20,
      },

    checkboxContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 10,
},
checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginRight: 8, // Adjusted spacing between checkbox and text
    justifyContent: 'center',
    alignItems: 'center',
    
    
},
checkboxText: {
    fontSize: 16,
    marginLeft: 10, // Add space to the left of the text
},
checkboxSubtext: {
    fontSize: 12,
    color: 'gray',
},
ImageProtect:{
    width:300,
    height:300,
    borderRadius:5,
    borderColor:'gray'

}

    });

  
  
  export default TravellerInformation;