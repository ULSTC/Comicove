
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const login = document.getElementById("showLogin");
login.addEventListener("click", function () {
    document.getElementById("login-modal").style.display = "block";
})


const signUp = document.getElementById("showSignup");
signUp.addEventListener("click", function () {
    document.getElementById("signup-modal").style.display = "block";
})


const closeLogin = document.getElementById("hideModal-login");
closeLogin.addEventListener("click", function () {
    var modals = document.getElementsByClassName("modal");
    for (var i = 0; i < modals.length; i++) {
        modals[i].style.display = "none";
    }
})
const closeSignUp = document.getElementById("hideModal-signup");
closeSignUp.addEventListener("click", function () {
    var modals = document.getElementsByClassName("modal");
    for (var i = 0; i < modals.length; i++) {
        modals[i].style.display = "none";
    }
})

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
});

const signupForm= document.getElementById("signup-form")
signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

  });

const firebaseConfig = {
  apiKey: "AIzaSyCO5JxdUI9o-N2DwEo2FHSSRTCoj9Kqx6I",
  authDomain: "randomproj-f61f3.firebaseapp.com",
  projectId: "randomproj-f61f3",
  storageBucket: "randomproj-f61f3.appspot.com",
  messagingSenderId: "722009755109",
  appId: "1:722009755109:web:95fec13692078b7c24b30c",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signupButton = document.getElementById("signUpBtn");
const emailInput = document.getElementById("email");
const signUpEmail = document.getElementById("signup-email");
const signUpPassword = document.getElementById("signup-password");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("loginBtn");

const nameInput = document.getElementById("signup-name");


var email,
  password,
  signupEmail,
  signupPassword,
  confirmSignupEmail,
  confirmSignUpPassword;

signupButton.addEventListener("click", function () {
  var isVerified = true;

  signupEmail = signUpEmail.value

  signupPassword = signUpPassword.value;
  

  if (
    signupEmail == null ||
    nameInput == null ||
    signupPassword == null 
  ) {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }

  if (isVerified) {
    console.log(signupEmail,signupPassword)
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        window.alert(`Success! Account created ${nameInput.value} .`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        // ..
        window.alert("Error occurred. Try again.");
      });
  }
});
loginButton.addEventListener("click", function () {
  email = emailInput.value;
  console.log(email);
  password = passwordInput.value;
  console.log(password);
let data;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(userCredential);
      data={
        "token": `${user.accessToken}`,
        "email": `${user.email}`,
      }
      localStorage.setItem("userData",JSON.stringify(data) );
      console.log("Success! Welcome back!");
      window.alert("Success! Welcome back!");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      window.alert("Error occurred. Try again.");
    });
});


