import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Picker,StyleSheet, ScrollView, TouchableOpacity, Dimensions, SafeAreaView, Platform, TextInput, Modal, Button } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
//npm i react-native-progress-steps cài tiến trinh
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { CheckBox } from 'react-native-web';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const TravellerInformation = ({route}) => {
    const navigation = useNavigation(); // Initialize navigation
    //Step1
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');   
    const [phone, setPhone] = useState('+07');   
    const [totalPrice, setTotalPrice] = useState(route.params.totalPrice || 0);
    

    
     //Step 2
    // Trạng thái cho các mục checkbox, sử dụng một object để lưu trữ các mục đã chọn
    const [selectedOptions, setSelectedOptions] = useState({
      personalItem: false,
      checkedBag: false,
      noCheckedBag: true, // Default
      protect: false,
      noInsurance: true, // Default
  });

  const handleCheckboxPress = (option) => {
    let updatedOptions = { ...selectedOptions };

    // Reset dependent options
    if (option === "checkedBag" || option === "noCheckedBag") {
        updatedOptions.checkedBag = false;
        updatedOptions.noCheckedBag = false;
    }

    if (option === "protect" || option === "noInsurance") {
        updatedOptions.protect = false;
        updatedOptions.noInsurance = false;
    }

    // Update selected option
    updatedOptions[option] = !updatedOptions[option];

    // Calculate new total price
    let newTotalPrice = route.params.totalPrice || 0;

    if (updatedOptions.checkedBag) {
        newTotalPrice += 19.99;
    }
    if (updatedOptions.protect) {
        newTotalPrice += 19.99;
    }

    // Update state
    setSelectedOptions(updatedOptions);
    setTotalPrice(newTotalPrice);
};


//stepp 3
const { 
  flight, 
  fromCountry, 
  toCountry, 
  departureDate, 
  returnDate, 
  totalPassengers, 
  seatClass,
  tab,
 
} = route.params;



    //Step4 Thanh Toán
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedMethod, setSelectedMethod] = useState(null);
   
  
  
    useEffect(() => {
        axios.get('https://672c6c2f1600dda5a9f86518.mockapi.io/Payment')
          .then(response => {
            setPaymentMethods(response.data);
            const selected = response.data.find(method => method.selected);
            setSelectedMethod(selected?.id || null);
          })
          .catch(error => console.error(error));
      }, []);

      const handleSelectMethod = (id) => {
        setSelectedMethod(id);
      };

    
      const renderPaymentMethod = ({ item }) => {
        const isSelected = selectedMethod === item.id;
    
        return (
          <TouchableOpacity
            style={[styles.paymentMethod, isSelected && styles.selectedMethod]}
            onPress={() => handleSelectMethod(item.id)}
          >
            <Image
              style={styles.logo}
              source={
                  
                  item.brand === 'mastercard'
                  ? require('../assets/mastercard.png')
                  : 'Null'
              }
            />
            <Text style={styles.cardInfo}>
              {item.type === 'PayPal' ? item.email : `****** ${item.number}`}
            </Text>
            <View style={styles.radioButtonContainer}>
              <View style={[styles.radioButton, isSelected ? styles.selectedRadioButton : styles.defaultRadioButton]}>
                {isSelected && <View style={styles.radioButtonInner} />}
              </View>
            </View>
          </TouchableOpacity>
        );
      };
  
    

      const handlePaymentSuccess = () => {
        // Gửi yêu cầu POST đến API /createInvoice
        fetch('http://localhost:3000/createInvoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                seatClass: seatClass,
                tab: tab, // flight
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Chuyển hướng đến màn hình PaymentSuccess nếu lưu thành công
                navigation.navigate('PaymentSuccess', {
                    flight: tab,
                    fromCountry,
                    toCountry,
                    departureDate,
                    returnDate,
                    firstName,
                    lastName,
                    seatClass,
                    tab,
                });
            } else {
                alert('Lỗi khi lưu hóa đơn');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Có lỗi xảy ra khi gửi yêu cầu');
        });
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
                           <ProgressSteps
                                 activeStepIconColor="#00BDD6"  // Màu icon của bước hiện tại
                                 completedStepIconColor="#00BDD6"  // Màu icon của bước đã hoàn thành
                                 activeLabelColor="#00BDD6"  // Màu của nhãn bước hiện tại
                                 completedLabelColor="#00BDD6"  // Màu của nhãn bước đã hoàn thành
                                 activeStepIconBorderColor="#00BDD6"  // Màu viền của bước hiện tại
                                 completedStepIconBorderColor="#00BDD6"  // Màu viền của bước đã hoàn thành
                           >
                                {/* Step1 */}
                                <ProgressStep  label={<Ionicons name="person" size={24} color="black" style={styles.backIcon} />}>
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
                                                <Text style={styles.price}>${totalPrice}</Text> 
                                                <Text style={styles.totalpricebagge}>1 adult</Text>
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
                                        <Text style={styles.price}>${totalPrice.toFixed(2)}</Text> 
                                    </View>
                                </ProgressStep>
                                {/* Step3 */}
                                <ProgressStep label={<Ionicons name="bed" size={24} color="black" style={styles.backIcon} />}>
                                        <Text style={styles.title}>Seat</Text>

                                        <View style={styles.hr}/>
                                        {/* Phần  body*/}
                                        <View style={styles.bodyiInput}>
                                                        
                                                        <View style={styles.containInput}>
                                                                <label style={styles.textLabel}>Flight to {fromCountry}</label>
                                                               
                                                                <View style={{ flexDirection: 'row',justifyContent:'space-around' }}>
                                                                        <Image source={require('../assets/seat.png')}  />
                                                                            <View>
                                                                                <Text>{flight[0].airline}</Text>
                                                                                <Text style={styles.checkboxSubtext}>Seats from $5</Text>
                                                                            </View>
                                                                            <TouchableOpacity  onPress={()=> navigation.navigate('Seat')} >
                                                                                    <Text style={{color:"#B7AADB"}}>Select</Text>
                                                                            </TouchableOpacity>   
                                                                </View>

                                                                <View style={styles.hr}/>
                                                       
                                                                <label style={styles.textLabel}>Flight to {toCountry}</label>
                                                               
                                                                <View style={{ flexDirection: 'row',justifyContent:'space-around' }}>
                                                                        <Image source={require('../assets/seat.png')}  />
                                                                            <View>
                                                                                <Text>{flight[0].airline}</Text>
                                                                                <Text style={styles.checkboxSubtext}>Seats from $4.59</Text>
                                                                            </View>
                                                                            <TouchableOpacity   onPress={()=> navigation.navigate('Seat')}>
                                                                                    <Text style={{color:"#B7AADB"}}>Select</Text>
                                                                            </TouchableOpacity>   
                                                                </View>

                                                        </View>

                                                    
                                        </View>
                                        {/* footer */}
                                        <View style={styles.hr}/>
                                        <View style={styles.buttonContainer}>
                                                <Text style={styles.price}>${totalPrice.toFixed(2)}</Text> 
                                        </View>

                                </ProgressStep>
                           
                                {/* Step4 */}
                                <ProgressStep label={<Ionicons name="card" size={24} color="black" style={styles.backIcon} 
                                               
                                />}>
                                            <Text style={styles.title}>Payment</Text>

                                            <View style={styles.hr}/>
                                            
                                            {/* body */}
                                            <View style={styles.bodyiInput}>
                                            <label style={styles.textLabel}>Payment method</label>
                                                        <View style={styles.paymentContainer}>
                                                                <FlatList
                                                                    data={paymentMethods}
                                                                    renderItem={renderPaymentMethod}
                                                                    keyExtractor={item => item.id.toString()}
                                                                    style={styles.paymentList}
                                                                />

                                                        <View style={styles.hr}/>
                                                                
                                                        </View>
                                                        <View style={styles.containInput}>
                                                                <label style={styles.textLabel}>Traveller details</label>
                                                               
                                                                <View style={{ flexDirection: 'row',justifyContent:'space-around' }}>
                                                                        <Image  source={require('../assets/profileicon1.png')}  />
                                                                            <View>
                                                                                <Text>{firstName}{lastName} </Text>
                                                                                
                                                                            </View>
                                                                           
                                                                            <Text style={{color:"#AFB1B4"}}>Adult -{gender}</Text>
                                                                               
                                                                </View>

                                                                <View style={styles.hr}/>
                                                       
                                                                <label style={styles.textLabel}>Contact details</label>
                                                               
                                                                <View style={{ flexDirection: 'row',justifyContent:'space-around' }}>
                                                                        <Image source={require('../assets/mail.png')}  />
                                                                            <View>
                                                                                <Text>{email}</Text>
            
                                                                            </View>
                                                                              
                                                                </View>
                                                                <View style={styles.hr}/>
                                                                <View style={{ flexDirection: 'row',justifyContent:'space-around' }}>
                                                                        <Image source={require('../assets/phone.png')}  />
                                                                            <View>
                                                                                <Text>{phone}</Text>
            
                                                                            </View>
                                                                              
                                                                </View>

                                                        </View>

                                                    
                                            </View>
                                            {/* Modal xác nhận thanh toán */}
                                            {/* footer */}
                                        <View style={styles.hr}/>
                                        <View style={styles.buttonContainer}>
                                                <Text style={styles.price}>${totalPrice.toFixed(2)}</Text> 
                                        </View>

                                        {/* Thêm nút riêng để gọi handlePaymentSuccess */}
                    <TouchableOpacity style={styles.submitButton} onPress={handlePaymentSuccess}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
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

},
//step4
paymentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentList: {
    marginVertical: 20,
    width: '100%',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    width: '100%',
  },
  selectedMethod: {
    borderColor: '#00bdd6',
    borderWidth: 2,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 15,
    resizeMode: 'contain',
  },
  cardInfo: {
    fontSize: 18,
    flex: 1,
  },
  payButton: {
    backgroundColor: '#00bdd6',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  icon: {
    marginRight: 8,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  radioButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadioButton: {
    borderWidth: 2,
    borderColor: '#00bdd6',
  },
  defaultRadioButton: {
    borderWidth: 2,
    borderColor: '#ddd',
  },
  radioButtonInner: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: '#00bdd6',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButtonConfirm: {
    flex: 1,
    backgroundColor: '#00bdd6',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalButtonConfirmOnePayment: {
    flex: 1,
    backgroundColor: '#00bdd6',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
    width: '100%',
  },
  modalButtonTextConfirmOnePayment: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalButtonTextConfirm: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalButtonCancel: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  modalButtonTextCancel: {
    color: '#888',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

    });

  
  
  export default TravellerInformation;