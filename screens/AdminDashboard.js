import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AdminDashboard() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const username = localStorage.getItem('username') || 'Khách';
  
  // Lấy danh sách người dùng từ API
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users'); // Đổi URL thành API của bạn
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch users');
    }

    
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Hàm xóa người dùng
  const deleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE',
      });
      Alert.alert('Success', 'User deleted successfully');
      fetchUsers(); // Cập nhật danh sách người dùng sau khi xóa
    } catch (error) {
      Alert.alert('Error', 'Failed to delete user');
    }
  };

  // Tiêu đề bảng
  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.headerCell, { flex: 2 }]}>Username</Text>
      <Text style={[styles.headerCell, { flex: 1 }]}>Role</Text>
      
      <Text style={[styles.headerCell, { flex: 2 }]}>Actions</Text>
    </View>
  );

  // Hàng dữ liệu người dùng
  const renderUserRow = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.cell, { flex: 2 }]}>{item.username}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>{item.role}</Text>
      
      <View style={[styles.cell, { flex: 2, flexDirection: 'row' }]}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditUser', { userId: item.id })}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() =>
            Alert.alert('Confirm Delete', 'Are you sure you want to delete this user?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Delete', onPress: () => deleteUser(item.id) },
            ])
          }
        >
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xin chào đây là trang admin!</Text>
      <Text style={styles.Welcome}>Welcome {username}!</Text>
      
      {renderTableHeader()}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUserRow}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddUser')}
      >
        <Text style={styles.addButtonText}>Add User</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  headerCell: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  editButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
});
