import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/EvilIcons';
import * as ImagePicker from 'expo-image-picker'; // Sử dụng ImagePicker để chọn ảnh
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Register({ navigation }) {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [avatar, setAvatar] = useState(null); // Thêm state để lưu ảnh
    const [avatarName, setAvatarName] = useState(""); // Thêm state để lưu tên ảnh

    // Hàm chọn ảnh
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setAvatar(result.uri); // Cập nhật đường dẫn ảnh
            const filename = result.uri.split('/').pop(); // Lấy tên tệp
            setAvatarName(filename); // Lưu tên tệp
        }
    };

    const handleRegister = async () => {
        try {
            const formData = new FormData();
            formData.append('username', user);
            formData.append('password', pass);

            // Kiểm tra và thêm ảnh vào formData
            if (avatar) {
                const filename = avatar.split('/').pop();
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : 'image/jpeg'; // Set image type correctly

                formData.append('avatar', {
                    uri: avatar,
                    name: filename,
                    type,  // Ensure correct MIME type
                });
            }

            const response = await axios.post('http://localhost:3000/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Alert.alert("Đăng ký thành công!", response.data.message);
            navigation.goBack();
        } catch (error) {
            if (error.response) {
                Alert.alert("Lỗi", error.response.data.error || "Đăng ký thất bại");
            } else {
                Alert.alert("Lỗi", "Có lỗi xảy ra. Vui lòng thử lại sau.");
            }
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Image source={require('../assets/banner3.jpg')} style={styles.banner} />
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Text style={{ color: 'black', fontSize: 25 }}>REGISTER</Text>
                </View>
                <View style={styles.viewInput}>
                    <View style={styles.input}>
                        <Icon name='user' size={30} color={'black'} />
                        <TextInput
                            style={{ marginLeft: 10, flex: 1, paddingHorizontal: 10, color: 'gray' }}
                            placeholder='user name'
                            placeholderTextColor={'gray'}
                            value={user}
                            onChangeText={setUser}
                        />
                    </View>
                    <View style={styles.input}>
                        <Icon name='lock' size={30} color={'black'} />
                        <TextInput
                            style={{ marginLeft: 10, flex: 1, paddingHorizontal: 10, color: 'gray' }}
                            placeholder='password'
                            placeholderTextColor={'gray'}
                            secureTextEntry
                            value={pass}
                            onChangeText={setPass}
                        />
                    </View>

                    {/* Nút chọn ảnh và input để hiển thị tên ảnh */}
                    <View style={styles.input}>
                        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                            <Text style={{ fontSize: 18, color: 'black' }}>Chọn ảnh đại diện</Text>
                        </TouchableOpacity>
                        {/* Input để hiển thị tên ảnh */}
                        <TextInput
                            style={{
                                marginLeft: 10,
                                flex: 1,
                                paddingHorizontal: 10,
                                color: 'gray',
                                borderBottomWidth: 1,
                                borderColor: '#ccc',
                            }}
                            value={avatarName} // Hiển thị tên file ảnh
                            editable={false} // Không cho chỉnh sửa
                            placeholder="Tên ảnh"
                        />
                    </View>

                    {avatar && (
                        <>
                            <Image source={{ uri: avatar }} style={{ width: 100, height: 100, marginTop: 10 }} />
                        </>
                    )}

                    <TouchableOpacity style={styles.Touch} onPress={handleRegister}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Register</Text>
                    </TouchableOpacity>

                    <View style={styles.hr} />

                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Text style={{ fontSize: 15, color: 'black' }}>Login</Text>
                    </TouchableOpacity>
                </View>
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
        height: 200,
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
});
