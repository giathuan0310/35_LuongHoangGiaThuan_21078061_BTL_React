import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, SafeAreaView, Platform, TextInput, Modal, Button } from 'react-native';
import axios from 'axios';
export default function Home({navigation}){
   
    const [searchFocused, setSearchFocused] = useState(false);
    
    const screenWidth = Dimensions.get('window').width;

    

    
    return(
        <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            {/* Khu vực có thể cuộn cho nội dung toàn bộ màn hình */}
            <ScrollView style={{ width: "100%", height: 500 }}>
                {/* Phần header */}
                <View style={styles.headerContainer}>
                        <View style={styles.header}>

                            <View style={styles.LogoText}>
                                <Image source={require('../assets/Logo.png')} style={styles.logoicon} />
                                <View>
                                        <Text style={styles.welcomeText}>Explore flight</Text>
                                        <Text style={styles.Welcome}>Welcome to flight booking</Text>
                                </View>

                            </View>
                            
                            
                            <View style={styles.userInfoContainer}>
                            <View style={styles.userInfo}>
                            <Image source={require('../assets/personicon.png')} style={styles.userImage}/>
                               
                                
                            </View>
                        </View>
                        </View>

                       


                        <View style={[styles.searchBox, searchFocused && styles.inputContainerFocused]}>
                        <Image source={require('../assets/findicon.png')} style={styles.searchIcon} />
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder='Find a flight'
                                />
                                
                            </View>
                    </View>

               
              

                
            </ScrollView>

            

        </View>
    </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    headerContainer: {
        backgroundColor: '#fff',
        height: 220,
    },
    header: {
        padding: 20,
        marginTop: 25,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logoicon: {
        width: 50,
        height: 50,
        borderRadius:12
    },
    LogoText:{
        flex:1,
        flexDirection: 'row',
       
    }
    ,
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
    
    inputContainerFocused: {
        borderColor: '#1f1f1f',
        borderWidth: 1
    },
    searchInput: {
        backgroundColor: 'transparent',
        outlineWidth: 0,
        flex: 1,
    },
    searchIcon: {
        width: 20,
        height: 20,
    },
    userInfoContainer: {
        alignItems: 'flex-start',
        marginLeft: 10,
        marginTop: 10,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 22.5,
        marginRight: 5,
    },
    welcomeText: {

        color: 'black',
        fontWeight: 'bold',
       
    },
    Welcome: {
        color: 'black'
    },
    iconBell: {
        width: 25,
        height: 25,
        marginLeft: 10
    },
    sectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        marginHorizontal: 20,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#3a3a3a',
    },
    icon3gach: {
        width: 20,
        height: 20,
    },
    categoryItem: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    categoryIconContainer: {
        backgroundColor: '#e6e6e6',
        borderRadius: 10,
        padding: 10,
        marginBottom: 5,
    },
    categoryIcon: {
        width: 50,
        height: 50,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3a3a3a',
    },
    locationImage: {
        width: 150,
        height: 100,
        borderRadius: 10,
        margin: 10,
    },
    locationImageOfRec: {
        width: 100,
        height: 100,
        borderRadius: 10,
        margin: 10,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    navItem: {
        alignItems: 'center',
    },
    navLabel: {
        fontSize: 12,
        color: '#3a3a3a',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
});
