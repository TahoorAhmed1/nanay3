import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

const getData = async (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        resolve(value);
      } else {
        reject("Error");
      }
    } catch (e) {
      reject(e);
      // error reading value
    }
  });
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    console.log(e);
    return false;
    // remove error
  }
};

export { storeData, getData, removeData };
