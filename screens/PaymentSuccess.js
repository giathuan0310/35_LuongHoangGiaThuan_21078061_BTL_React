import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Platform,
    SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons,MaterialIcons } from '@expo/vector-icons';

const PaymentSuccess = () => {
    const navigation = useNavigation();


    return (
        <SafeAreaView style={styles.safeArea}>
            <Image source={require('../assets/banner3.jpg')} style={styles.banner} />
            <View style={styles.container}>

                {/* Success Icon */}
                <View style={styles.iconContainer}>
                    <Image source={require('../assets/checksucces.png')} style={styles.logo} />
                </View>

                {/* Success Message */}
                <Text style={styles.successTextOrder}>Booking successfully!</Text>
               

                {/* Order Summary */}
                <View style={styles.summaryContainer}>
                                                <View style={{ flexDirection: 'row',justifyContent:'space-around' }}>
                                                                       
                                                                            <View>
                                                                                <Text>LCY </Text>
                                                                                <Text style={{fontSize: 12,color: 'gray',}}>Tue,Jul 14</Text>
                                                                            </View>
                                                                            <Ionicons name="swap-horizontal" size={24} color="black" />
                                                                            <View>
                                                                                <Text>JFK</Text>
                                                                                <Text style={{fontSize: 12,color: 'gray',}}>Fri,Jul 17</Text>
                                                                            </View>
                                                </View>
                    
                                                <View style={styles.separator} />
                                                <View style={{ flexDirection: 'row',justifyContent:'space-around' }}>
                                                                       
                                                                            <View>
                                                                                <Text style={{fontSize: 12,color: 'gray',}}>Traveller</Text>
                                                                                <Text >Pedro Moreno</Text>
                                                                            </View>
                                                                            <View>
                                                                                <Text style={{fontSize: 12,color: 'gray',}}>Class</Text>
                                                                                <Text >Economy</Text>
                                                                            </View>
                                                                            <View>
                                                                                <Text style={{fontSize: 12,color: 'gray',}}>Flight</Text>
                                                                                <Text >Round-trip</Text>
                                                                            </View>
                                                </View>

                    
                </View>
                                        {/* Back to Home Button */}
                                        <TouchableOpacity 
                                            style={styles.button} 
                                            
                                        >
                                            
                                            <Text style={styles.buttonText}>Booking detail</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity 
                                            
                                            onPress={() => navigation.reset({
                                                index: 0,
                                                routes: [{ name: 'Home' }],
                                            })}
                                        >
                                            
                                            <Text style={{color:'#00BDD6',fontSize:18}}>Home</Text>
                                        </TouchableOpacity>
                                    </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 12,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    backButton: {
        padding: 10,
    },
    iconContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    banner: {
        width: 400,
        height: 200,
      
        
        
    },
    successTextOrder: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00bdd6',
        marginBottom: 10,
        textAlign: 'center',
    },
    descriptionText: {
        width: 240,
        fontSize: 14,
        color: '#757575',
        textAlign: 'center',
        marginBottom: 30,
    },
    summaryContainer: {
        width: '100%',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 20,
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    label: {
        fontSize: 16,
        color: '#757575',
    },
    totalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    successBox: {
        backgroundColor: '#E8F5E9',
        borderRadius: 10,
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginRight: 10,
    },
    successText: {
        fontSize: 14,
        color: '#0e642a',
        fontWeight: '500',
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardImage: {
        width: 34,
        height: 34,
        marginRight: 10,
        resizeMode: 'contain',
    },
    cardText: {
        fontSize: 14,
        fontWeight: '500',
    },
    total: {
        fontSize: 20,
        color: '#0e642a',
        fontWeight: '500',
    },
    separator: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 10,
    },
    ratingText: {
        fontSize: 16,
        color: '#757575',
        marginBottom: 10,
        textAlign: 'center',
    },
    starContainer: {
        flexDirection: 'row',
        marginBottom: 30,
        justifyContent: 'center',
    },
    star: {
        marginHorizontal: 5,
    },
    button: {
        width: '100%',
        backgroundColor: '#00bdd6',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        marginLeft: 10,
        fontWeight: 'bold',
    },
    icon: {
        marginRight: 2,
    },
});

export default PaymentSuccess;
