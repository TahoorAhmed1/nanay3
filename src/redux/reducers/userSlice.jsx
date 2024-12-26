import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isSuccessfull: false,
  _id: 1,
  firstName: "abc",
  lastName: "abc",
  role: "abc",
  image: null,
  email: "abc",
  region: null,
  zipCode: null,
  serviceType: null,
  sharingNanny: false,
  parentJobDescription: null,
  budget: null,
  isAIDcertificate: false,
  isCPRcertificate: false,
  isDrivingLicense: false,
  doHouseKeeping: false,
  doMealPrep: false,
  careSpecialChild: false,
  isLiven: false,
  Language: null,
  childAgeGroup: null,
  experience: null,
  aboutYourself: null,
  personalDetail: {},
};

const savedState = JSON.parse(localStorage.getItem("userState") || "null");
if (savedState) {
  initialState = savedState;
}

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    add: (state, action) => {
      state.isSuccessfull = true;
      // console.log("User logged in:", action.payload); // Check the payload
      state._id = action.payload._id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.role = action.payload.role;
      state.image = action.payload.image;
      state.email = action.payload.email;
      state.region = action.payload.region;
      state.zipCode = action.payload.zipCode;
      state.serviceType = action.payload.serviceType;
      state.sharingNanny = action.payload.sharingNanny;
      state.parentJobDescription = action.payload.parentJobDescription;
      state.budget = action.payload.budget;
      state.isAIDcertificate = action.payload.isAIDcertificate;
      state.isCPRcertificate = action.payload.isCPRcertificate;
      state.isDrivingLicense = action.payload.isDrivingLicense;
      state.doHouseKeeping = action.payload.doHouseKeeping;
      state.doMealPrep = action.payload.doMealPrep;
      state.careSpecialChild = action.payload.careSpecialChild;
      state.isLiven = action.payload.isLiven;
      state.Language = action.payload.Language;
      state.childAgeGroup = action.payload.childAgeGroup;
      state.experience = action.payload.experience;
      state.aboutYourself = action.payload.aboutYourself;
      state.personalDetail = { ...action.payload };
      localStorage.setItem("userState", JSON.stringify(state));
      //   "region": "usa",
      //   "zipCode": "255",
      //   "isSuccessfull": true,
      //   "serviceType": "part-time" ,
      //   "sharingNanny": true,
      //   "parentJobDescription": "bussiness man"
      //   "firstName": "xyz" ,
      // "lastName": "xyz" ,
      // "email": "xyzzzz@gmail2.com" ,
      // "role": "nanny" ,
      // "password": "123456789" ,
      // "region": "usa" ,
      // "serviceType": "part-time" ,
      // "zipCode": "22255",
      // "isSuccessfull": true ,
      // "budget": "22$" ,
      // "isAIDcertificate": true ,
      // "isCPRcertificate": true ,
      // "isDrivingLicense": true ,
      // "doHouseKeeping": true ,
      // "doMealPrep": true ,
      // "careSpecialChild": true ,
      // "isLiven": true,
      // "Language": "english" ,
      // "childAgeGroup": "0-11" ,
      // "experience": "toddlers" ,
      // "aboutYourself": "I love working with children and have over 5 years of experience."
    },
    edit: () => {},
  },
});

export const { add, edit } = UserSlice.actions;
export default UserSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// let initialState = {
//   isLogin: false,
//   id: 1,
//   fullName: "abc",
//   Image: null ,
//   email: "abc",
//   cnic: "00000-000000-0",
//   bloodGroup: "abc",
//   personalDetail: {},
// };

// export const UserSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     add: (state, action) => {
//       state.isLogin = true;
//       state.id = action.payload.id;
//       state.fullName = action.payload.fullName;
//       state.Image = action.payload.Image;
//       state.email = action.payload.email;
//       state.cnic = action.payload.cnic;
//       state.bloodGroup = action.payload.bloodGroup;
//       state.personalDetail = { ...action.payload };
//     },
//     edit: () => {},
//   },
// });

// export const { add, edit } = UserSlice.actions;
// export default UserSlice.reducer;
