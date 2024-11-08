import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, SafeAreaView ,Platform,Modal} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/EvilIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Register({ navigation }) {
    const [photo, setPhoto] = useState(null);
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisibility, setModalVisibility] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [imageUri, setImageUri] = useState(null);

    const handleImagePicker = async () => {
        if (Platform.OS === 'web') {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (event) => {
                const file = event.target.files[0];
                if (file) {
                    setImageUri(URL.createObjectURL(file)); // Để hiển thị ảnh trên web
                    setPhoto(file); // Để upload lên server
                }
            };
            input.click();
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setImageUri(result.assets[0].uri);
                setImageFile({
                    uri: result.assets[0].uri,
                    type: 'image/png', // type của ảnh
                    name: 'avatar.png', // tên file
                });
            }
        }
    };

    const handleRegister = async () => {


        if (!username || !password || !photo) {
            setErrorMessage('Vui lòng nhập đầy đủ thông tin');
            setModalVisibility(true);
            return;
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        if (Platform.OS === 'web') {
            formData.append('avatar', photo);
        } else {
            formData.append('avatar', photo);
        }
        console.log('Photo data:', photo);

        try {
            const response = await axios.post('http://localhost:3000/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                setErrorMessage('Đăng ký thành công');
                setModalVisibility(true);
            } else {
                setErrorMessage('Đăng ký thất bại: ' + response.data.message);
                setModalVisibility(true);
            }
        } catch (e) {
            console.error('Lỗi: ', e);
            setErrorMessage('Đã xảy ra lỗi trong quá trình đăng ký.');
            setModalVisibility(true);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Image source={require('../assets/banner3.jpg')} style={styles.banner} />
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Text style={{ color: 'black', fontSize: 25 ,fontWeight:'bold'}}>REGISTER</Text>
                    <TouchableOpacity onPress={handleImagePicker} style={styles.photoButton}>
                        {imageUri ? (<Image source={{ uri: imageUri }} style={styles.photo} />) :
                            (<Text>Chọn ảnh của bạn</Text>)}
                            </TouchableOpacity>
                </View>

                
                <View style={styles.viewInput}>

                        
                    <View style={styles.input}>
                        <Icon name='user' size={30} color={'black'} />
                        <TextInput
                            style={{ marginLeft: 10, flex: 1, paddingHorizontal: 10, color: 'gray' }}
                            placeholder='user name'
                            placeholderTextColor={'gray'}
                            value={username}
                            onChangeText={setUserName}
                        />
                    </View>
                    <View style={styles.input}>
                        <Icon name='lock' size={30} color={'black'} />
                        <TextInput
                            style={{ marginLeft: 10, flex: 1, paddingHorizontal: 10, color: 'gray' }}
                            placeholder='password'
                            placeholderTextColor={'gray'}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    

                    <TouchableOpacity style={styles.Touch} onPress={handleRegister}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Register</Text>
                    </TouchableOpacity>

                    <View style={styles.hr} />

                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Text style={{ fontSize: 15, color: 'black' }}>Login</Text>
                    </TouchableOpacity>
                </View>


                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibility}
                onRequestClose={() => setModalVisibility(false)}

            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>THÔNG BÁO</Text>
                        <Text style={styles.modalMessage}>{errorMessage || "Đăng ký thành công"}</Text>
                        <View style={styles.modalButtons}>
                       
                            <TouchableOpacity style={styles.modalButton} onPress={() => { setModalVisibility(false), navigation.navigate('LoginScreen') }}>
                                <Text style={styles.modalButtonText2}>Đồng ý</Text>
                            </TouchableOpacity>
                        </View>
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
    banner: {
        width: 400,
        height: 100,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logo: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    viewInput: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    input: {
        borderColor: 'gray',
        borderWidth: 0.3,
        borderRadius: 15,
        padding: 10,
        flexDirection: 'row',
        marginVertical: 10,
        color: 'black',
    },
    imagePicker: {
        marginVertical: 10,
        alignItems: 'center',
    },
    Touch: {
        padding: 10,
        backgroundColor: '#00bdd6',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 15,
    },
    hr: {
        width: '100%',
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 20,
    },
    photoButton: { alignItems: 'center' ,justifyContent: 'center', width: 150, height: 150, backgroundColor: '#e0e0e0', borderRadius: 75, marginBottom: 20 },
    photo: { width: 150, height: 150, borderRadius: 75 },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    
    }, modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
        modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
        modalButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
    },
        modalButtonText2: {
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 5,
        color: '#fff',
        
        
    },
        modalButtonText: {
        padding: 10,
        marginHorizontal: 10,
        backgroundColor: 'red',
        borderRadius: 5,
        color: '#fff',
    },
});
