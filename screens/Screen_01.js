import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function Screen_01({navigation}){
    return(
        <View style={styles.container}>

        <View style={styles.style3}>
            <TouchableOpacity style={{
                backgroundColor: 'green',
                borderRadius: 40,
                width: 240,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onPress={() => {navigation.navigate("Screen_02")}}
            >
                <Text style={{fontSize: 20 , color: 'white'}}>
                    Get Started
                </Text>
            </TouchableOpacity>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    style1:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },

    style2:{
        flex: 3,
        backgroundColor: '#fff',
    },

    style3:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    }
})