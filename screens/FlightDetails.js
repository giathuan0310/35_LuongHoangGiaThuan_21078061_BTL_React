import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Modal, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { CheckBox } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Sử

const FlightDetails = ({ route,navigation}) => {
    const { 
        flight, 
        fromCountry, 
        toCountry, 
        departureDate, 
        returnDate, 
        totalPassengers, 
        seatClass,
        tab,
        totalPrice
    } = route.params;
    const flight1 = flight[0]; // Phần tử đầu tiên
    const flight2 = flight[1]; // Phần tử thứ hai (nếu có)
    // Định nghĩa hàm formatDateWithDay
const formatDateWithDay = (date) => {
    const options = {month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);  // hoặc ngôn ngữ khác tùy ý
  };
    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.header}>

                <View style={styles.headerInfo}>
                    <TouchableOpacity style={styles.iconmuiten}>
                        <MaterialIcons name="arrow-back" onPress={() => navigation.goBack()} size={30} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.route}>Flight details</Text>
                </View>
                <View style={styles.iconheader}>
                    <TouchableOpacity style={styles.icontraitim}>
                        <FontAwesome name="heart-o" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconshare}>
                        <MaterialIcons name="share" size={24} color="black" />
                    </TouchableOpacity>

                </View>
            </View>
            <View style={styles.yourtripcontainer}>
                <Text style={styles.yourtriptitle}>Your trip to {toCountry}</Text>
                <Text style={styles.yourtriptitle2}>from {fromCountry}</Text>
                <View style={styles.yourtripdate}>
                    <Text style={styles.datefromto}>
                    {`${formatDateWithDay(departureDate)} - ${formatDateWithDay(returnDate)}`}

                    </Text>
                </View>


                <TouchableOpacity style={styles.passengerContainer} >
                    <View style={styles.hanhkhachcontainer}>
                        <FontAwesome name="child" size={20} color="gray" style={styles.swapIcon} />
                        <Text style={styles.passengerText}>{totalPassengers}</Text>
                        <MaterialIcons name="circle" size={6} color="gray" style={styles.swapIcon} />
                    </View>
                    <View style={styles.hangghecontainer}>
                        <MaterialIcons name="airline-seat-recline-normal" size={20} color="gray" style={styles.swapIcon} />
                        <Text style={styles.classText}>{seatClass}</Text>
                    </View>
                    <View style={styles.trip}>
                        <MaterialIcons name="circle" size={6} color="gray" style={styles.swapIcon} />
                        <MaterialIcons name="flight" size={20} color="gray" style={styles.swapIcon} />
                        <Text style={styles.roundtripText}>{tab}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.sanbay}>
                    <Text style={styles.sanbayText}>{`${fromCountry} - ${toCountry}`}</Text>
                    <View style={styles.sanbayDetails}>
                    <Text style={styles.sanbayName}>{flight1.airline}</Text>
                    <Text style={styles.sanbaySubName}>FD695</Text>
                    </View>
                </View>

                <View style={styles.timefromto}>
                    <View style={styles.timefromtoitem}>
                        <Text style={styles.timefrom}>{flight1.time}</Text>
                        <Text style={styles.datefrom}>{`${formatDateWithDay(departureDate)} - ${formatDateWithDay(returnDate)}`}</Text>
                    </View>
                    <View style={styles.dungchan}>
                        <Text style={styles.solandung}>{flight1.duration}</Text>
                        <Text style={styles.timecount}>{flight1.stops}</Text>
                    </View>
                  
                </View>


                <View style={styles.moredetails}>
                    <View style={styles.moredetailstems}>
                        <View style={styles.moredetailstem}>
                            <MaterialIcons name="chair" size={20} color="gray" style={styles.swapIcon} />
                            <Text style={styles.moredetalText}>28" seat bitch</Text>
                        </View>
                        <View style={styles.moredetailstem}>
                                <MaterialIcons name="restaurant" size={20} color="gray" style={styles.swapIcon} />
                                <Text style={styles.moredetalText}>Light meal, dessert</Text>
                        </View>
                    </View>
                    <View style={styles.moredetailstems}>
                        <View style={styles.moredetailstem}>
                            <MaterialIcons name="wifi" size={20} color="gray" style={styles.swapIcon} />
                                <Text style={styles.moredetalText}>Chance of wifi</Text>
                        </View>
                        <View style={styles.moredetailstem}>
                            <MaterialIcons name="power" size={20} color="gray" style={styles.swapIcon} />
                                <Text style={styles.moredetalText}>No power outlet</Text>
                        </View>
                    </View>

                        <View style={styles.moredetailstems}>
                            <View style={styles.moredetailstem}>
                                <MaterialIcons name="movie" size={20} color="gray" style={styles.swapIcon} />
                                <Text style={styles.moredetalText}>No entertainment</Text>
                            </View>
                          
                    </View>
                    </View>
                    <TouchableOpacity style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Less info</Text>
                    </TouchableOpacity>

                    {/* Chuyen bay thu 2 */}

                    <View style={styles.sanbay2}>
                        <Text style={styles.sanbayText}>{` ${toCountry}-${fromCountry} `}</Text>
                        <View style={styles.sanbayDetails}>
                            <Text style={styles.sanbayName}>{flight2.airline}</Text>
                            <Text style={styles.sanbaySubName}>FD695</Text>
                        </View>
                    </View>

                    <View style={styles.timefromto}>
                        <View style={styles.timefromtoitem}>
                            <Text style={styles.timefrom}>{flight2.time}</Text>
                            <Text style={styles.datefrom}>{`${formatDateWithDay(departureDate)} - ${formatDateWithDay(returnDate)}`}</Text>
                        </View>
                        <View style={styles.dungchan}>
                        <Text style={styles.solandung}>{flight2.duration}</Text>
                        <Text style={styles.timecount}>{flight2.stops}</Text>
                        </View>

                       
                    </View>


                    <View style={styles.moredetails}>
                        <View style={styles.moredetailstems}>
                            <View style={styles.moredetailstem}>
                                <MaterialIcons name="chair" size={20} color="gray" style={styles.swapIcon} />
                                <Text style={styles.moredetalText}>28" seat bitch</Text>
                            </View>
                            <View style={styles.moredetailstem}>
                                <MaterialIcons name="restaurant" size={20} color="gray" style={styles.swapIcon} />
                                <Text style={styles.moredetalText}>Light meal, dessert</Text>
                            </View>
                        </View>
                        <View style={styles.moredetailstems}>
                            <View style={styles.moredetailstem}>
                                <MaterialIcons name="wifi" size={20} color="gray" style={styles.swapIcon} />
                                <Text style={styles.moredetalText}>Chance of wifi</Text>
                            </View>
                            <View style={styles.moredetailstem}>
                                <MaterialIcons name="power" size={20} color="gray" style={styles.swapIcon} />
                                <Text style={styles.moredetalText}>No power outlet</Text>
                            </View>
                        </View>

                        <View style={styles.moredetailstems}>
                            <View style={styles.moredetailstem}>
                                <MaterialIcons name="movie" size={20} color="gray" style={styles.swapIcon} />
                                <Text style={styles.moredetalText}>No entertainment</Text>
                            </View>

                        </View>
                    </View>
                    <TouchableOpacity style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>More info</Text>
                    </TouchableOpacity>
                </View>
                {/* END Chuyen bay thu 2 */}
                <View style={styles.baggagecontainer}>
                    <Text style={styles.textbaggage}>Included baggage</Text>
                    <Text style={styles.subtextbaggage}>The total baggage included in the price</Text>
                    <View style={styles.baggagedetails}>
                        <MaterialIcons name="luggage" size={30} color="gray" style={styles.swapIcon} />
                        <View style={styles.baggagedetail}>
                            <Text style={styles.subtextbaggage1}>1 personal item</Text>
                            <Text style={styles.subtextbaggage2}>Must go under the seat in fron of you</Text>
                            <Text style={styles.subtextbaggage3}>Included</Text>
                        </View>
                       
                      

                    </View>
                    <View style={styles.baggagepolicy}>
                        <Text style={styles.baggagepolicy1}>Baggage policies</Text>
                        <Text style={styles.baggagepolicy2}>SkyHaven</Text>

                    </View>
                </View>

                <View style={styles.baggagecontainer}>
                    <Text style={styles.textbaggage}>Extra baggage</Text>
                   
                    <View style={styles.baggagedetails}>
                        <MaterialIcons name="luggage" size={30} color="gray" style={styles.swapIcon} />
                        <View style={styles.baggagedetail}>
                            <Text style={styles.subtextbaggage1}>Carry-on</Text>
                            <Text style={styles.subtextbaggage2}>From $11.99</Text>
                            <Text style={styles.subtextbaggage3}>Available in the next steps</Text>
                        </View>
                      

                    </View>
                    <View style={styles.baggagedetails}>
                        <MaterialIcons name="work" size={30} color="gray" style={styles.swapIcon} />
                        <View style={styles.baggagedetail}>
                           
                            <Text style={styles.subtextbaggage1}>Checked bag</Text>
                            <Text style={styles.subtextbaggage2}>From $19.99</Text>
                            <Text style={styles.subtextbaggage3}>Available in the next steps</Text>
                        </View>

                    </View>

                


                    <View style={styles.baggagefotter}>
                        <View style={styles.totalpricebaggage}>
                            <Text style={styles.pricebagge}>${totalPrice}</Text>
                            <Text style={styles.totalpricebagge}>Total price</Text>

                        </View>
                        <TouchableOpacity style={styles.selectButton} 
                        onPress={() => navigation.navigate('TravellerInformation',{

                            totalPrice,
                            flight, 
                            fromCountry, 
                            toCountry, 
                            departureDate, 
                            returnDate, 
                            totalPassengers, 
                            seatClass,
                            tab,
                        })}
                           
                        >
                            <Text style={styles.selectButtonText}>Select</Text>
                        </TouchableOpacity>

                    </View>
                </View>
               

          


            </ScrollView>
        </View>

    );
};
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',

        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        width: '100%',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    }, headerInfo: {
        flexDirection: 'row',

    }, route: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: 'bold',
    }, iconheader: {
        flexDirection: 'row',
        justifyContent: 'space-around',

    }, iconshare: {
        marginLeft: 20,
    }, yourtripcontainer: {
        marginLeft: 20,
    }, yourtriptitle: {
        fontWeight: 'bold',
        fontSize: 20,
    }, yourtriptitle2: {

        fontSize: 14,
    }, yourtripdate: {
       
    }, datefromto: {
        marginTop: 20,
        paddingHorizontal: 20,
        width: 230,
        paddingVertical: 10,
        fontSize: 18,
        backgroundColor: 'black',
        color: 'white',
        borderRadius: 10,
        fontWeight: 'bold',

    }, passengerContainer: {
        flexDirection: 'row',
        marginTop: 40,
        marginRight: 20,
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
    }, hanhkhachcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }, hangghecontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }, swapIcon: {
        marginLeft: 10,
    }, trip: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }, roundtripText:
    {
        marginLeft: 10,
        fontSize: 16,
        color: 'gray',
       
    }, sanbay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }, sanbayDetails: {
        marginRight: 20,
    }, sanbayName: {
        fontWeight: 'bold',
        fontSize: 15,
    }, sanbayText: {
        fontWeight: 'bold',
        fontSize: 15,
    }, timefromto: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }, timefrom: {
        fontSize: 20,
        fontWeight: 'bold',
    }, datefrom: {
        fontSize: 15,
    }, solandung: {
        fontSize: 15,
    }, timecount: {
        fontSize: 15,
    }, timeto: {
        fontSize: 20,
        fontWeight: 'bold',
    }, dateto: {
        fontSize: 15,
    }, moredetailstems: {
        marginTop: 30,
         flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    }, moredetailstem: {
        flexDirection: 'row',
        alignItems: 'center',
       
    }, moredetalText: {
        fontSize: 18,
        marginLeft: 10,
    }, searchButton: {
        marginRight: 20,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#00bcd4',
    },
    searchButtonText: {
        color: '#00bcd4',
        fontSize: 18,
        fontWeight: 'bold',
    }, sanbay2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    }, baggagecontainer: {
        marginTop: 30,
        marginLeft: 20,
    }, textbaggage: {
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold',
    }, subtextbaggage:{
        fontSize: 15,
        marginBottom: 10,
    }, baggagedetails: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    }, subtextbaggage1: {
        fontSize: 15,
    }
    , subtextbaggage2: {
        fontSize: 15,
    }
    , subtextbaggage3: {
        fontSize: 15,
        color: 'darkorange',
        marginBottom: 10,
    }, baggagepolicy: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    }, baggagepolicy2: {
        color: 'darkgreen',
        marginLeft: 20,
        marginBottom: 30,
    }, baggagedetail2: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    }, selectButton: {
        marginRight: 20,
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 1,
        backgroundColor: '#00bcd4',
        marginBottom: 20,
    },
    selectButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }, baggagefotter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }, pricebagge: {
        fontWeight: 'bold',
        fontSize: 25,
    }

});
export default FlightDetails;