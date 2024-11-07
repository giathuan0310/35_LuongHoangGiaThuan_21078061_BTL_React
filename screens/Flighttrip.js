import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Settings, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';

const Flighttrip = ({ route, navigation }) => {
    const [tab, setTab] = useState('Round-trip');
    const [seatClass, setSeatClass] = useState('Economy');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [selectedCabinClass, setSelectedCabinClass] = useState('Economy');
    const [departureDate, setDepartureDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [showDepartureCalendar, setShowDepartureCalendar] = useState(false);
    const [showReturnCalendar, setShowReturnCalendar] = useState(false);
    const [flights, setFlights] = useState([]);
    const [selectedFlightIndex, setSelectedFlightIndex] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showDetails2, setShowDetails2] = useState(false);
    const [showDetails3, setShowDetails3] = useState(false);
    const [country, setCountry] = useState([]);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
     
    }
    const toggleDetails2 = () => {
        setShowDetails2(!showDetails2);
        
    }
    const toggleDetails3 = () => {
        setShowDetails3(!showDetails3);

    }


    const Ages = [
        { id: 1, label: 'Adults', age: '12+ years' },
        { id: 2, label: 'Children', age: '2-12 years' },
        { id: 3, label: 'Infant', age: 'Under 2 years' }
    ];

    const cabinClasses = [
        { id: 1, label: 'Economy' },
        { id: 2, label: 'Premium Economy' },
        { id: 3, label: 'Business' },
        { id: 4, label: 'First' }
    ];

    const [passengerCounts, setPassengerCounts] = useState({
        Adults: 0,
        Children: 0,
        Infant: 0,
    });
    useEffect(() => {
        axios.get('http://localhost:3000/country').then((respone) => {
            setCountry(respone.data);

        });
    }, []);

    const handleIncrease = (type) => {
        setPassengerCounts((prevCounts) => ({
            ...prevCounts,
            [type]: prevCounts[type] + 1,
        }));
    };

    const handleDecrease = (type) => {
        setPassengerCounts((prevCounts) => ({
            ...prevCounts,
            [type]: Math.max(prevCounts[type] - 1, 0),
        }));
    };

    const selectSeatClass = (seatClass) => {
        setSelectedCabinClass(seatClass);
    };

    const handleDone = () => {
        setSeatClass(selectedCabinClass);
        setModalVisible(false);
    };

    const totalPassengers = passengerCounts.Adults + passengerCounts.Children + passengerCounts.Infant;

    const onDepartureDateChange = (day) => {
        setDepartureDate(new Date(day.timestamp));
        setShowDepartureCalendar(false);
    };

    const onReturnDateChange = (day) => {
        setReturnDate(new Date(day.timestamp));
        setShowReturnCalendar(false);
    };

    const formatDateWithDay = (date) => {
        return date.toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    };

    const addFlight = () => {
        setFlights([...flights, { from: '', to: '', date: new Date() }]);
        setCountFlight((prevCount) => prevCount + 1); // Tăng countflight lên 1
    };

    const updateFlight = (index, key, value) => {
        const updatedFlights = [...flights];
        updatedFlights[index][key] = value;
        setFlights(updatedFlights);
    };

    const onDateChange = (day) => {
        if (selectedFlightIndex !== null) {
            updateFlight(selectedFlightIndex, 'date', new Date(day.timestamp));
            setShowCalendar(false);
            setSelectedFlightIndex(null);
        }
    };
    const [countflight, setCountFlight] = useState(1); // Khai báo countflight

    return (
        <View style={styles.container}>
            <ScrollView>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="close" size={24} color="black" />
                </TouchableOpacity>

                <Text style={styles.title}>Flight</Text>

                <View style={styles.tabContainer}>
                    {['Round-trip', 'One-way', 'Multi-city'].map((item) => (
                        <TouchableOpacity key={item} onPress={() => setTab(item)}>
                            <Text style={[styles.tab, tab === item && styles.activeTab]}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.Container1}>
                   
                    

                    <TouchableOpacity style={styles.inputContainer} onPress={() => setModalVisible1(true)}>
                    <MaterialIcons name="flight-takeoff" size={24} color="black" />
                    <TextInput style={styles.input} placeholder="From" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputContainer} onPress={() => setModalVisible2(true)}>
                    <MaterialIcons name="flight-land" size={24} color="black" />
                    <TextInput style={styles.input} placeholder="To" />
                    <FontAwesome name="exchange" size={20} color="gray" style={styles.swapIcon} />
                    </TouchableOpacity>
                    <View style={styles.departcontainer}>
                        <TouchableOpacity style={styles.dateInput} onPress={() => setShowDepartureCalendar(true)}>
                            <MaterialIcons name="date-range" size={24} color="black" />
                            <Text style={styles.dateText}>{formatDateWithDay(departureDate)}</Text>
                        </TouchableOpacity>
                        {showDepartureCalendar && (
                            <Calendar
                                onDayPress={onDepartureDateChange}
                                markedDates={{
                                    [departureDate.toISOString().split('T')[0]]: { selected: true, marked: true }
                                }}
                            />
                        )}

                    </View>
                    <View style={styles.returncontainer}>

                        {/* Chỉ hiển thị trường returnDate khi tab "Round-trip" được chọn */}
                        {tab === 'Round-trip' && (


                            <TouchableOpacity style={styles.dateInput} onPress={() => setShowReturnCalendar(true)}>
                                <MaterialIcons name="date-range" size={24} color="black" />
                                <Text style={styles.dateText}>{formatDateWithDay(returnDate)}</Text>
                            </TouchableOpacity>
                        )}
                        {showReturnCalendar && tab === 'Round-trip' && (
                            <Calendar
                                onDayPress={onReturnDateChange}
                                markedDates={{
                                    [returnDate.toISOString().split('T')[0]]: { selected: true, marked: true }
                                }}
                            />
                        )}
                    </View>

                <View style={styles.dateContainer}>
                 
                    
                    {/* Nội dung cho tab Multi-city */}
                    {tab === 'Multi-city' && (
                            <View style={styles.multicity}>
                               
                            <FlatList
                                data={flights}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <View style={styles.flightContainer}>
                                        <Text style={styles.titlecount}>Flight: {1 + index}</Text> {/* Cập nhật để hiển thị số chuyến bay đúng */}
                                     
                                        <View style={styles.inputContainer}>
                                            <MaterialIcons name="flight-takeoff" size={24} color="black" />
                                            <TextInput
                                                style={styles.input}
                                                placeholder="From"
                                                value={item.from}
                                                onChangeText={(text) => updateFlight(index, 'from', text)}
                                            />
                                        </View>

                                        <View style={styles.inputContainer}>
                                            <MaterialIcons name="flight-takeoff" size={24} color="black" />
                                            <TextInput
                                                style={styles.input}
                                                placeholder="To"
                                                value={item.to}
                                                onChangeText={(text) => updateFlight(index, 'to', text)}
                                            />
                                        </View>
                                        
                            
                                        <TouchableOpacity
                                            style={styles.dateInput}
                                            onPress={() => {
                                                setSelectedFlightIndex(index);
                                                setShowCalendar(true);
                                            }}
                                        >
                                            <MaterialIcons name="date-range" size={24} color="black" />
                                            <Text style={styles.dateText}>{item.date.toDateString()}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                    contentContainerStyle={{ paddingBottom: 20 }}
                                    style={{ flex: 1 }} // Có thể thay bằng flex: 1 để chiếm toàn bộ chiều cao
                            
                            />
                            <View style={styles.addButtonContainer}>
                                <TouchableOpacity style={styles.addButton} onPress={addFlight}>
                                    <Text style={styles.addButtonText}>Add Flight</Text>
                                </TouchableOpacity>
                            </View>
                          

                        </View>
                        

                    )}

                    {/* Calendar cho việc chọn ngày */}
                    {showCalendar && (
                        <Calendar
                            onDayPress={onDateChange}
                            markedDates={{
                                [flights[selectedFlightIndex]?.date?.toISOString().split('T')[0]]: { selected: true, marked: true },
                            }}
                        />
                    )}
                  

                </View>
              

                <TouchableOpacity style={styles.passengerContainer} onPress={() => setModalVisible(true)}>
                    <View style={styles.hanhkhachcontainer}>
                        <FontAwesome name="child" size={20} color="gray" style={styles.swapIcon} />
                        <Text style={styles.passengerText}>{totalPassengers} traveller</Text>
                        <MaterialIcons name="circle" size={6} color="gray" style={styles.swapIcon} />
                    </View>
                    <View style={styles.hangghecontainer}>
                        <MaterialIcons name="airline-seat-recline-normal" size={20} color="gray" style={styles.swapIcon} />
                        <Text style={styles.classText}>{seatClass}</Text>
                    </View>
                    <FontAwesome name="chevron-down" size={20} color="gray" style={styles.chevronicon} />
                    </TouchableOpacity>
                </View>
                {/*  Modal OPTIONS */}

                <Modal visible={modalVisible} transparent animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.iconmodal}>
                                <MaterialIcons name="close" size={25} color="black" />
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>Options</Text>

                            <View style={styles.modalTitle2}><Text style={styles.textTitle2}>Traveller</Text></View>

                            <FlatList
                                data={Ages}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.agecontainer}>
                                        <View style={styles.ageitem}>
                                            <View style={styles.agetitle}>
                                                <Text style={styles.agetitle1}>{item.label}</Text>
                                                <Text style={styles.agetitle2}>{item.age}</Text>
                                            </View>
                                            <View style={styles.containersoluongtuoi}>
                                                <TouchableOpacity style={styles.giamsoluongtuoi} onPress={() => handleDecrease(item.label)}>
                                                    <Text style={styles.tru}>-</Text>
                                                </TouchableOpacity>
                                                <Text style={styles.soluongtuoi}>{passengerCounts[item.label]}</Text>
                                                <TouchableOpacity style={styles.tangsoluongtuoi} onPress={() => handleIncrease(item.label)}>
                                                    <Text style={styles.cong}>+</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            />

                            <View style={styles.modalcabin}>
                                <View style={styles.modalTitle2}><Text style={styles.textTitle2}>Cabin class</Text></View>
                                <FlatList
                                    data={cabinClasses}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={styles.agecontainer} onPress={() => selectSeatClass(item.label)}>
                                            <View style={styles.ageitem}>
                                                <View style={styles.agetitle}>
                                                    <Text style={styles.cabintitle}>{item.label}</Text>
                                                </View>
                                                <View style={styles.containersoluongtuoi}>
                                                    {selectedCabinClass === item.label && (
                                                        <FontAwesome name="check" size={20} color="gray" style={styles.chevronicon} />
                                                    )}
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>

                            <View style={styles.modalfotter}>
                                <Text style={styles.roundtrip}>{tab}</Text>
                                <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                                    <Text style={styles.doneButtonText}>Done</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* END Modal OPTIONS */}

                {/* Modal FROM */}

                <Modal visible={modalVisible1} transparent animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity onPress={() => setModalVisible1(false)} style={styles.iconmodal}>
                                <MaterialIcons name="close" size={25} color="black" />
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>Where from ?</Text>
                            <TouchableOpacity style={styles.inputContainer} onPress={() => setModalVisible1(true)}>
                                <MaterialIcons name="flight-takeoff" size={24} color="black" />
                                <TextInput style={styles.input} placeholder="From" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.inputContainer}>
                                <MaterialIcons name="flight-land" size={24} color="black" />
                                <TextInput style={styles.input} placeholder="To" />
                                <FontAwesome name="exchange" size={20} color="gray" style={styles.swapIcon} />
                            </TouchableOpacity>


                            <View style={styles.selectcontainer}>
                                <FlatList
                                    data={country.slice(0, 1)} // Dữ liệu đầu vào của FlatList
                                    keyExtractor={(item) => item.id.toString()} // Đảm bảo key là duy nhất
                                    renderItem={({ item }) => (
                                
                                <TouchableOpacity style={styles.countryContainer} onPress={toggleDetails}>
                                    <View style={styles.header}>
                                        <MaterialIcons name="location-on" size={24} color="gray" />
                                        <View style={styles.textContainer}>
                                                    <Text style={styles.countryTitle}>{ item.tenquocgia}</Text>
                                                    <Text style={styles.countrySubTitle}>{item.thanhpho}</Text>
                                        </View>
                                        <MaterialIcons
                                            name={showDetails ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                            size={24}
                                            color="gray"
                                        />
                                    </View>
                                        </TouchableOpacity>
                                    )}
                                />

                                {/* Airport Details */}
                                {showDetails && (
                                    <View style={styles.detailsContainer}>
                                        <FlatList
                                            data={country.slice(0,2)} // Dữ liệu đầu vào của FlatList
                                            keyExtractor={(item) => item.id.toString()} // Đảm bảo key là duy nhất
                                            renderItem={({ item }) => (
                                                <TouchableOpacity style={styles.airport}>
                                                    <MaterialIcons name="flight" size={25} color="gray" />
                                                    <View style={styles.airportContainer}>
                                                        <Text style={styles.airportName}>{item.thanhpho}</Text>
                                                        <Text style={styles.airportdistance}>{item.khoangcach}</Text>
                                                    </View>
                                                    <Text style={styles.airportCode}>{item.viettat}</Text>
                                                </TouchableOpacity>
                                            )}
                                        />
                                      
                                    </View>
                                    
                                    
                                    
                                    
                                )}


                             {/* Cái thứ 2 */}
                            </View>

                            
                            <View style={styles.selectcontainer}>
                                <FlatList
                                    data={country.slice(2, 3)} // Dữ liệu đầu vào của FlatList
                                    keyExtractor={(item) => item.id.toString()} // Đảm bảo key là duy nhất
                                    renderItem={({ item }) => (
                                <TouchableOpacity style={styles.countryContainer} onPress={toggleDetails2}>
                                    <View style={styles.header}>
                                        <MaterialIcons name="location-on" size={24} color="gray" />
                                        <View style={styles.textContainer}>
                                                    <Text style={styles.countryTitle}>{item.tenquocgia}</Text>
                                                    <Text style={styles.countrySubTitle}>{item.thanhpho}</Text>
                                        </View>
                                        <MaterialIcons
                                            name={showDetails2 ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                            size={24}
                                            color="gray"
                                        />
                                    </View>
                                        </TouchableOpacity>
                                    )}
                                />

                                
                                {/* Airport Details */}
                                {showDetails2 && (
                                    <View style={styles.detailsContainer}>
                                        <FlatList
                                            data={country.slice(2, 4)} // Dữ liệu đầu vào của FlatList
                                            keyExtractor={(item) => item.id.toString()} // Đảm bảo key là duy nhất
                                            renderItem={({ item }) => (
                                                <TouchableOpacity style={styles.airport}>
                                                    <MaterialIcons name="flight" size={25} color="gray" />
                                                    <View style={styles.airportContainer}>
                                                        <Text style={styles.airportName}>{item.thanhpho}</Text>
                                                        <Text style={styles.airportdistance}>{item.khoangcach}</Text>
                                                    </View>
                                                    <Text style={styles.airportCode}>{item.viettat}</Text>
                                                </TouchableOpacity>
                                            )}
                                        />

                                    </View>




                                )}

                            </View>
                           
                        </View>
                    </View>
                </Modal>
                {/* END Modal FROM */}

                {/* Modal TO */}
                <Modal visible={modalVisible2} transparent animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity onPress={() => setModalVisible2(false)} style={styles.iconmodal}>
                                <MaterialIcons name="close" size={25} color="black" />
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>Where to ?</Text>
                            <TouchableOpacity style={styles.inputContainer} >
                                <MaterialIcons name="flight-takeoff" size={24} color="black" />
                                <TextInput style={styles.input} placeholder="From" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.inputContainer} onPress={() => setModalVisible2(true)}>
                                <MaterialIcons name="flight-land" size={24} color="black" />
                                <TextInput style={styles.input} placeholder="To" />
                                <FontAwesome name="exchange" size={20} color="gray" style={styles.swapIcon} />
                            </TouchableOpacity>


                            <View style={styles.selectcontainer}>
                                <FlatList
                                    data={country.slice(4, 5)} // Dữ liệu đầu vào của FlatList
                                    keyExtractor={(item) => item.id.toString()} // Đảm bảo key là duy nhất
                                    renderItem={({ item }) => (

                                        <TouchableOpacity style={styles.countryContainer} onPress={toggleDetails}>
                                            <View style={styles.header}>
                                                <MaterialIcons name="location-on" size={24} color="gray" />
                                                <View style={styles.textContainer}>
                                                    <Text style={styles.countryTitle}>{item.tenquocgia}</Text>
                                                    <Text style={styles.countrySubTitle}>{item.thanhpho}</Text>
                                                </View>
                                                <MaterialIcons
                                                    name={showDetails ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                                    size={24}
                                                    color="gray"
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />

                                {/* Airport Details */}
                                {showDetails && (
                                    <View style={styles.detailsContainer}>
                                        <FlatList
                                            data={country.slice(4, 6)} // Dữ liệu đầu vào của FlatList
                                            keyExtractor={(item) => item.id.toString()} // Đảm bảo key là duy nhất
                                            renderItem={({ item }) => (
                                                <TouchableOpacity style={styles.airport}>
                                                    <MaterialIcons name="flight" size={25} color="gray" />
                                                    <View style={styles.airportContainer}>
                                                        <Text style={styles.airportName}>{item.thanhpho}</Text>
                                                        <Text style={styles.airportdistance}>{item.khoangcach}</Text>
                                                    </View>
                                                    <Text style={styles.airportCode}>{item.viettat}</Text>
                                                </TouchableOpacity>
                                            )}
                                        />

                                    </View>




                                )}


                                {/* Cái thứ 2 */}
                            </View>


                            <View style={styles.selectcontainer}>
                                <FlatList
                                    data={country.slice(2, 3)} // Dữ liệu đầu vào của FlatList
                                    keyExtractor={(item) => item.id.toString()} // Đảm bảo key là duy nhất
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={styles.countryContainer} onPress={toggleDetails2}>
                                            <View style={styles.header}>
                                                <MaterialIcons name="location-on" size={24} color="gray" />
                                                <View style={styles.textContainer}>
                                                    <Text style={styles.countryTitle}>{item.tenquocgia}</Text>
                                                    <Text style={styles.countrySubTitle}>{item.thanhpho}</Text>
                                                </View>
                                                <MaterialIcons
                                                    name={showDetails2 ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                                    size={24}
                                                    color="gray"
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />


                                {/* Airport Details */}
                                {showDetails2 && (
                                    <View style={styles.detailsContainer}>
                                        <FlatList
                                            data={country.slice(2, 4)} // Dữ liệu đầu vào của FlatList
                                            keyExtractor={(item) => item.id.toString()} // Đảm bảo key là duy nhất
                                            renderItem={({ item }) => (
                                                <TouchableOpacity style={styles.airport}>
                                                    <MaterialIcons name="flight" size={25} color="gray" />
                                                    <View style={styles.airportContainer}>
                                                        <Text style={styles.airportName}>{item.thanhpho}</Text>
                                                        <Text style={styles.airportdistance}>{item.khoangcach}</Text>
                                                    </View>
                                                    <Text style={styles.airportCode}>{item.viettat}</Text>
                                                </TouchableOpacity>
                                            )}
                                        />

                                    </View>




                                )}

                            </View>

                        </View>
                    </View>
                </Modal>

                
                {/* END Modal TO */}

                <TouchableOpacity style={styles.searchButton}  onPress={() => navigation.navigate('ResultSearchFlight')}>
                    <Text style={styles.searchButtonText}>Search flights</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    tab: {
        fontSize: 16,
        color: 'gray',
    },
    activeTab: {
        color: 'black',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        paddingBottom: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        paddingVertical: 10,
        width: '100%',
    },
    swapIcon: {
        marginLeft: 10,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    dateInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginRight: 5,
        
    },
    dateText: {
        marginLeft: 10,
        fontSize: 16,
        color: 'gray',
        width: '100%',
    },
    passengerContainer: {
        flexDirection: 'row',
        marginTop: 40,
        alignItems: 'center',
        marginBottom: 20,
    },
    passengerText: {
        fontSize: 16,
        marginLeft: 10,
    },
    classText: {
        fontSize: 16,
        color: 'gray',
        marginLeft: 10,
    },
    searchButton: {
        backgroundColor: '#00bcd4',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    chevronicon: {
        position: 'absolute',
        right: 0,

    }, hanhkhachcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }, hangghecontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

    }, modalContent: {
        width: '100%',
        height: '100%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,

    }, modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        alignItems: 'center',
        marginLeft: 140,
        marginTop: 30,
    }, iconmodal: {
        position: 'absolute',
        right: 20,
        top: 20,

    }, textTitle2: {
        fontSize: 22,
        marginBottom: 5,

    }, ageitem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,

    }, containersoluongtuoi: {
        flexDirection: 'row',
        justifyContent: 'space-around',

    }, tru: {
        fontSize: 35,
        marginLeft: 20,
        fontWeight: 'bold',
    }
    , cong: {
        fontSize: 35,
        fontWeight: 'bold',

    }, soluongtuoi: {
        fontSize: 20,
        marginTop: 15,
        marginHorizontal: 20,

    }, cabintitle: {
        marginTop: 15,
        fontSize: 15,
    }, agetitle1: {
        fontSize: 15,
    }, agetitle2: {
        fontSize: 14,
        opacity: 0.5,
    }, modalfotter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 20,
    }, doneButtonText: {
        paddingHorizontal: 70,
        paddingVertical: 15,
        fontWeight: 'bold',
        backgroundColor: '#00bcd4',
        borderRadius: 8,
        color: '#fff',

    }, roundtrip: {
        marginTop: 5,
        fontSize: 18,
        fontWeight: 'bold',
    }, addButton: {
        borderWidth: 2,
        borderColor: '#00bcd4',      
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        


    },
    addButtonText: {
        color: '#00bcd4',
        fontSize: 16,
        paddingHorizontal: 20,
        
    }, addButtonContainer: {
     
       
        
    }, flightContainer: {
        marginBottom: 20,
        width: '100%',
        marginRight: 100,
        
    }, Container1: {
        display: 'flex',
        flexDirection: 'column',
    }, multicity: {
        flex: 1
    }, departcontainer: {
        marginBottom: 20,
    }, titlecount: {
        fontSize: 18,
        
    }, header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    countryTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    countrySubtitle: {
        color: 'gray',
        fontSize: 14,
    },
    detailsContainer: {
        paddingLeft: 40,
        marginTop: 10,
    },
    airport: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    airportName: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    airportCode: {
        fontWeight: 'bold',
        marginLeft: 10,
    },
    distance: {
        color: 'gray',
        marginLeft: 10,
    },
    countryContainer: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
    }, airportName: {
        fontWeight: 'bold',
    }, airportContainer: {
        marginBottom: 20,
       
       
        
    }, airport: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    }
});
export default Flighttrip;