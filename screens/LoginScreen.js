import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal,Image, SafeAreaView, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [userData, setUserData] = useState(null); // Lưu dữ liệu người dùng ở đây
  const handleLogin = async () => {
    if (!username || !password) {
      setLoginError('Bạn Phải Nhập Thông Tin!');
      setModalVisible(true); // Show modal if fields are empty
      return;
    }
 // Kiểm tra tên đăng nhập và mật khẩu cứng
 if (username === 'admin' && password === '123') {
  // Nếu thông tin đúng, điều hướng đến trang quản lý
  localStorage.setItem('username', username); // Lưu tên vào localStorage
  navigation.navigate('AdminDashboard'); // Thay đổi tên trang quản lý
  return;
}
    //Gọi API để xác thực thông tin người dùng
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username,password }), // Gửi tên và mật khẩu trong yêu cầu
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Tên đăng nhập hoặc mật khẩu không hợp lệ');
        }
        return response.json();
      })
      .then((data) => {
        // Kiểm tra role và điều hướng
        if (data.success) {
          setUserData(data.user); // Lưu dữ liệu người dùng
          localStorage.setItem('username', username);

          // Điều hướng tùy theo role
          if (data.role === 'admin') {
            navigation.navigate('AdminDashboard'); // Điều hướng đến trang AdminDashboard nếu role là admin
          } else {
            navigation.navigate('Home'); // Điều hướng đến trang Home nếu role là người dùng bình thường
          }
        } else {
          setLoginError(data.message);
          setModalVisible(true); // Hiện modal với thông báo lỗi
        }
      })
      .catch((error) => {
        setLoginError(error.message);
        setModalVisible(true); // Hiện modal với thông báo lỗi
      });
  };

  const toggleShowPassword = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image source={require('../assets/banner3.jpg')} style={styles.banner} />
    <View style={styles.container}>
      
      
      
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Log into your account</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your Username"
          placeholderTextColor="#aaa"
          onChangeText={setUsername} 
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#aaa"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword} 
        />
        <TouchableOpacity onPress={toggleShowPassword}>
          <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={20} color="gray" style={styles.eyeIcon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.continueButton}>
        <Text style={styles.continueText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.hr}/>
      <TouchableOpacity  onPress={()=> navigation.navigate('Register')}>
        <Text style={styles.RegisterText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.style8}>
        <Text style={styles.orText}>or</Text>
      </View>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/google.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/face.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/apple.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{loginError}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
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
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'flex-start', // Ensure elements start from the top
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputContainerFocused: {
    borderColor: '#6C63FF',
    borderWidth: 1,
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    outlineWidth: 0,
  },
  eyeIcon: {
    marginLeft: 5,
  },
  forgotPassword: {
    color: '#0ad4fa',
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#0ad4fa',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  RegisterText: {
    color: 'black',
    fontSize: 16,
    
    alignItems: 'center',
    paddingLeft:150
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
  },
  orText: {
    marginHorizontal: 10,
    color: 'gray',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  socialButton: {
    padding: 3,
  },
  socialIcon: {
    width: 50,
    height: 44,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#f14668',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomContainer: {
    flexGrow: 1, // This ensures the button is pushed to the bottom
    justifyContent: 'flex-end', // Aligns the content at the bottom of the screen
    marginBottom: 20, // Adds some spacing before the modal and button
  },
  hr: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  style8: {
    marginTop: 30,
    alignItems:'center'
  },
  banner: {
    width: 400,
    height: 200,
  
    
    
},

});