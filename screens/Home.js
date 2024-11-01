import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, SafeAreaView, Platform, TextInput, Modal, Button } from 'react-native';
import axios from 'axios';
export default function Home({navigation}){
    const [cities, setCities] = useState([]);
    const [flight, setFlight] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false); // State để quản lý modal
    const screenWidth = Dimensions.get('window').width;

    const [selectedTab, setSelectedTab] = useState('Home'); // lưu tab được chọn
    const handleTabPress = (tabName) => {
        setSelectedTab(tabName); // cập nhật tab được chọn
    };


    // const citiesData = [
    //     { "name": "HongKong", "price": "from $33.00 to $38.00", "image": "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/e8c30cd3607b9098e588a8a1f7a50cdf", "id": "1" },
    //     { "name": "San Antonio", "price": "from $48.00 to $58.00", "image": "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/a62c1e82f809e698768646fa1e5f21dd", "id": "2" },
    // ]

    // const Data = [
    //     { "name": "HongKong", "price": "from $33.00 to $38.00", "image": "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/58cd71a4c1b265f65df0f2369fecee48", "id": "1" },
        
    // ]
    useEffect(() => {
        // Gọi API để lấy danh sách danh mục và cập nhật vào state `category`
        axios.get('https://6724ad8dc39fedae05b25151.mockapi.io/City').then((response) => {
            setCities(response.data);
        });
        axios.get('https://6724ad8dc39fedae05b25151.mockapi.io/flight').then((response) => {
            setFlight(response.data);
        });
    }, []);
    const handleLogout = () => {
        // Logic to handle logout
        // You can clear local storage or perform other logout operations here
        localStorage.removeItem('name');
        
        // Chuyển hướng đến trang đăng nhập
        navigation.navigate('LoginScreen');
        setIsModalVisible(false); // Đóng modal sau khi log out
    };
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
                {/* Khu Vực The best cities for you */}
                <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>The best cities for you</Text>
                        
                    </View>
                   
                    <FlatList
                        data={cities.slice(0, 3)}
                        horizontal
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            
                            <View style={styles.itemContainer}>
                            <Image source={{ uri: item.image }} style={styles.locationImage} />
                            <Text style={styles.locationName}>{item.name}</Text>
                            <Text style={styles.locationPrice}>{item.price}</Text>
                        </View>
        
                            
                        )}
                    />
                {/* Khu Vực Explore Destinations */}
                <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Explore Destinations</Text>
                        
                    </View> 

                    <FlatList
                        data={flight.slice(0, 3)}
                        horizontal
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            
                           
                            <Image source={{ uri: item.image }} style={styles.locationImage} />
                            
                        
        
                            
                        )}
                    /> 
                


            </ScrollView>
                        {/* footer */}
            
 {/* Tạo footer */}
 <View style={styles.bottomNav}>
                    <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('Home')}>
                        <Image source={require('../assets/homeicon1.png')} style={styles.footerImage} />
                        <Text style={[styles.navLabel, selectedTab === 'Home' && styles.activeLabel]}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navItem}  onPress={() => handleTabPress('Explore')}
                    >
                        <Image source={require('../assets/exploreicon1.png')} style={styles.footerImage} />
                        <Text style={[styles.navLabel, selectedTab === 'Explore' && styles.activeLabel]}>Explore</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navItem} onPress={() =>{handleTabPress('Profile'); setIsModalVisible(true)}}> {/* Mở modal khi bấm vào nút Profile */}
                        <Image source={require('../assets/profileicon1.png')} style={styles.footerImage} />
                        <Text style={[styles.navLabel, selectedTab === 'Profile' && styles.activeLabel]}>Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Modal cho Logout */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => setIsModalVisible(false)} // Đóng modal khi nhấn nút quay lại
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Are you sure you want to log out?</Text>
                            <Button title="Log Out" onPress={handleLogout} color="#FF0000" /> {/* Xử lý log out */}
                            <Button title="Cancel" onPress={() => setIsModalVisible(false)} /> {/* Đóng modal */}
                        </View>
                    </View>
                </Modal>
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
    locationName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    locationPrice: {
        fontSize: 14,
        color: 'gray',
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
        paddingHorizontal: 10, // padding ngang để giữ khoảng cách 2 bên
        height: 50,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    footerImage: {
        width: 30,
        height: 30,
        borderRadius: 22.5,
        marginRight: 5,
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
    activeLabel: {
        color: '#7CDCE8', // màu chữ khi nút được chọn
    },
});
