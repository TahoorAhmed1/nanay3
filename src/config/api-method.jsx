import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// let baseApi = 'https://salmon-betta-shoe.cyclic.app/';
let baseApi = " http://localhost:5000/";

let api = axios.create({
  baseURL: baseApi,
});

let Get = async (apiName, id, params) => {
  return await new Promise(async (resolve, reject) => {
    const token = await AsyncStorage.getItem("bussAppToken");
    if (token !== null) {
      // value previously stored
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    api
      .get(`${apiName}${id ? "/" + id : ""}`, { params: params })
      .then((res) => {
        if (res.data.isSuccessfull) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let userGet = async (apiName, body) => {
  return await new Promise(async (resolve, reject) => {
    api
      .post(`${apiName}`, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let Post = (apiName, body) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("bussAppToken")
      .then((token) => {
        if (token !== null) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        return api.post(`${apiName}`, body);
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
let Put = async (apiName, body, id) => {
  const token = await AsyncStorage.getItem("bussAppToken");
  if (token !== null) {
    // value previously stored
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return await api.put(`${apiName}/${id}`, body);
};
// let Delete = async (apiName, id) => {
//   const token = await AsyncStorage.getItem("bussAppToken");
//   if (token !== null) {
//     // value previously stored
//     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   }
//   return await api.delete(`${apiName}/${id}`);
// };

let Delete = async (apiName) => {
  // Remove id from parameter list
  const token = await AsyncStorage.getItem("bussAppToken");
  if (token !== null) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return await api.delete(apiName); // No extra id appended
};
// const saveToken = async (token) => {
//   try {
//     await AsyncStorage.setItem("bussAppToken", token);
//   } catch (e) {
//     console.error("Failed to save token:", e);
//   }
// };

export { Get, userGet, Post, Delete, Put };
