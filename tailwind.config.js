const mainColors = {
  primary: "#545FD9",
  primaryLight: "#D5D8F6",
  secondary: "#FFAE93",
  secondaryDark: "#CC8B76",
  warning: "#FA6C80",
  white: "#FFFFFF",
  almostWhite: "#F7F7F7",
  lightGrey: "#EFEFEF",
  midGrey: "#949494",
  darkGrey: "#313131",
  almostBlack: "#252525",
  orange: "#FFBB6B",
  green: "#71CB7B",
  softGrey: "#D0D0D0",
  strongGrey: "#595959"
 }


module.exports = {

  purge: [],

  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
   darkMode: "class", // or 'media' or 'class'
   theme: {
     colors: mainColors,
     backgroundColor: theme => (mainColors),

     borderColor: theme => (mainColors),

     extend: {
       fontFamily: {
        inter: ['Inter']
       },
      
     },
   },
   variants: {
     extend: {     
     },
   },
   plugins: [],
 }