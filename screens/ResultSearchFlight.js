import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Modal } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { CheckBox } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Sử dụng FontAwesome5Light





const ResultSearchFlight = () => {
    const [flightData, setflightData] = useState([]);
    const [airlineData, setAirlineData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedstop, setSelectedStop] = useState('Any stops');
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/flight').then((respone) => {
            setflightData(respone.data);

        });
        axios.get('http://localhost:3000/airline').then((respone) => {
            setAirlineData(respone.data);

        });
    }, []);
    const Stops = [
        { id: 1, label: 'Any stops'},
        { id: 2, label: '1 stop or nonstop' },
        { id: 3, label: 'Nonstop only'}
    ];
    const selectStop = (stop) => {
        setSelectedStop(stop);
    };
    const handleDone = () => {
        setSelectedStop(selectedstop);
        setModalVisible(false);
    };

    // Chia dữ liệu thành từng cặp
    const pairedFlightData = [];
    for (let i = 0; i < flightData.length; i += 2) {
        const pair = flightData.slice(i, i + 2);
        pairedFlightData.push(pair);
    }

    const renderFlightPair = ({ item }) => {
        // Tính tổng giá của cặp
        const totalPrice = item.reduce((total, flight) => total + flight.price, 0);

        return (
            <View style={styles.cardPair}>
                {item.map((flight, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.flightDetail}>
                            <View style={styles.flightTime}>
                                <Image source={{ uri: flight.imgthoitiet }} style={styles.imgthoitiet} />
                            </View>
                            <View style={styles.flightInfo}>
                                <Text style={styles.flightTime}>{flight.time}</Text>
                                <Text style={styles.flightAirline}>{flight.airline}</Text>
                            </View>
                            <View style={styles.flightInfo2}>
                                <Text style={styles.flightDesc}>{flight.duration}</Text>
                                <Text style={styles.flightStop}>{flight.stops}</Text>
                            </View>
                        </View>
                        
                    </View>
                 
                ))}
                <View style={styles.priceContainer}>
                    <TouchableOpacity style={styles.iconHeart}>
                        <FontAwesome name="heart-o" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.totalprice}>${totalPrice}</Text>
                </View>
               
                
            </View>
        );
    };
    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(airlineData.map(item => item.tenhang));
        }
        setSelectAll(!selectAll);
    };

    const toggleSelectItem = (item) => {
        if (selectedItems.includes(item.tenhang)) {
            setSelectedItems(selectedItems.filter(i => i !== item.tenhang));
        } else {
            setSelectedItems([...selectedItems, item.tenhang]);
        }
    };
    const clearAll = () => {
        setSelectedItems([]);      // Bỏ chọn tất cả các checkbox
    };
    


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconmuiten}  onPress={() => navigation.navigate('Flighttrip')}>
                    <MaterialIcons name="arrow-back"  size={30} color="black" />
                </TouchableOpacity>
                <View style={styles.headerInfo}>
                    <Text style={styles.route}>London - New York</Text>
                    <Text style={styles.date}>Jul 14 - Jul 17, 1 traveller</Text>
                </View>
                <TouchableOpacity style={styles.iconbell}>
                    <MaterialIcons name="notifications" size={30} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.filterContainer}>
                <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
                    <FontAwesome name="sort" size={24} color="black" />
                    <Text style={styles.textButton}>Sort & Filters</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.textButton}>Best</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.textButton}>Stops</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.textButton}>Time</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={pairedFlightData} // Dữ liệu cặp của FlatList
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderFlightPair}
            />

            {/*  Modal Sorts & Filters */}

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.iconmodal}>
                            <MaterialIcons name="close" size={25} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Sorts & Filters</Text>

                        <View style={styles.modalTitle2}><Text style={styles.textTitle2}>Sort by</Text>
                            <TouchableOpacity style={styles.type}>
                                <Text style={styles.typetext}>Best</Text>
                                <FontAwesome name="chevron-down" size={20} color="gray" style={styles.chevrondown} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalcabin}>
                            <View style={styles.modalTitle2}><Text style={styles.textTitle2}>Stops</Text></View>
                            <FlatList
                                data={Stops}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={styles.agecontainer} onPress={() => selectStop(item.label)}>
                                        <View style={styles.ageitem}>
                                            <View style={styles.agetitle}>
                                                <Text style={styles.cabintitle}>{item.label}</Text>
                                            </View>
                                            <View style={styles.containersoluongtuoi}>
                                                {selectedstop === item.label && (
                                                    <FontAwesome name="check" size={20} color="gray" style={styles.chevronicon} />
                                                )}
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                        {/* Airline modal */}

                        <View style={styles.modalcabin}>
                            <View style={styles.modalTitle2}>
                                <Text style={styles.textTitle2}>Airlines</Text>
                            </View>
                            {/* Select All Checkbox */}
                            <TouchableOpacity onPress={toggleSelectAll} style={styles.selectAllContainer}>
                                <Text style={styles.selectAllText}>Select All</Text>
                                <CheckBox value={selectAll} onValueChange={toggleSelectAll} />
                            </TouchableOpacity>
                            <FlatList
                                data={airlineData}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.agecontainer}
                                        onPress={() => toggleSelectItem(item)}
                                    >
                                        <View style={styles.ageitem}>
                                            <View style={styles.agetitle}>
                                                <Text style={styles.cabintitle}>{item.tenhang}</Text>
                                            </View>
                                            <View style={styles.containersoluongtuoi}>
                                                {/* Checkbox for individual item */}
                                                <CheckBox
                                                    value={selectedItems.includes(item.tenhang)}
                                                    onValueChange={() => toggleSelectItem(item)}
                                                />
                                                {selectedItems.includes(item.tenhang) && (
                                                    <FontAwesome5 name="check" size={20} color="white" style={styles.chevronicon} />
                                                )}
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                        {/* END Airline modal */}

                       

                      

                        <View style={styles.modalfotter}>
                            <TouchableOpacity style={styles.roundtrip} onPress={clearAll}>
                               
                                <Text style={styles.clearText}> Clear all</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                                <Text style={styles.doneButtonText}>Show 20 of 30</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* END Modal Sorts & Filters  */}
          


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerInfo: {
        flex: 1,
        alignItems: 'center',
    },
    route: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 15,
        color: '#666',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    filterButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 5,
        backgroundColor: '#e0e0e0',
        borderWidth: 2,

    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 16,
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    flightDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    flightInfo: {
        marginLeft: 8,
        flex: 1,
    },
    flightTime: {
        fontSize: 18,
       marginRight: 10,
    },
    flightDesc: {
        fontSize: 14,
        color: '#666',
    },
    flightAirline: {
        fontSize: 14,
        color: '#aaa',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'right',
        marginTop: 8,
    }, textButton: {
        fontSize: 15,
        marginLeft: 5,
    }, imgthoitiet: {
        width: 40,
        height: 40,
    }, pricecontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',    
        marginBottom: 20,
      
      
       
    }, cardPair: {
       flex: 1,
        marginHorizontal: 16,
        
    }, totalprice: {
        fontWeight: 'bold',
        fontSize: 22,
        marginLeft: 290,
        marginTop: -25,
        
        
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
        marginLeft: 120,
        marginTop: 30,
    }, iconmodal: {
        position: 'absolute',
        left: 20,
        top: 20,

    }, textTitle2: {
        fontSize: 22,
        marginTop: 10,
        fontWeight: 'bold',
        marginBottom: 10,

    }, ageitem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,

    },
    chevronicon: {
        position: 'absolute',
        right: 0,

    }, modalfotter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 20,
        alignItems: 'center',
    }, doneButtonText: {
        paddingHorizontal: 50,
        paddingVertical: 15,
        fontWeight: 'bold',
        backgroundColor: '#00bcd4',
        borderRadius: 8,
        color: '#fff',

    }, roundtrip: {
        marginTop: 5,
        fontSize: 18,
        fontWeight: 'bold',
        
    }, clearText: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontWeight: 'bold',
        fontSize: 18,
    }, type: {
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 8,
    }, typetext: {
        fontSize: 18,
    }, chevrondown: {
        position: 'absolute',
        right: 10,
    }, cabintitle: {
        fontSize: 16,
    }, selectAllText: {
        fontSize: 16,
        marginBottom: 20,
      
    }, selectAllContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    }
});

export default ResultSearchFlight;
