
import AsyncStorage from '@react-native-community/async-storage';

export const storeItem = async (key, item) => {
    try {
        await AsyncStorage.setItem(key, item)
    } catch (e) {
        console.log("Error storing data -> " + e);
    }
}

export const getItem = async (key) => {
    try {
        const item = await AsyncStorage.getItem(key)
        if (item !== null) {
            return item
        }
    } catch (e) {
        console.log("Error retrieving data -> " + e);
    }
}