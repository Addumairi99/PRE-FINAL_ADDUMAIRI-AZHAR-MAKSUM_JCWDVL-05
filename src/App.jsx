import React, { useEffect } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Auth/registerForm";
import Login from "./pages/Auth/loginForm";
import UserProfileEdit from "./pages/userProfileEdit";
import SocialProfile from "./pages/userProfile";
import ForgotPassword from "./components/forgotpassword";
import ConfirmNewPassword from "./components/confirmNewPass";
import VerificationPage from "./pages/verificationPage";

function App() {
  const API_URL = "http://localhost:5000";
  // const location = useLocation()
  // Global state
  const global = useSelector((state) => {
    return state.user;
  });

  const dispatch = useDispatch();
  console.log("Global", global);

  // KEEP LOGIN
  // side effect
  useEffect(() => {
    const id = localStorage.getItem("token");

    // console.log('myToken:', id)

    Axios.get(API_URL + `/users/keeplogin`, {
      headers: {
        "Auth-Token": id,
      },
    })
      .then((respond) => {
        dispatch({ type: "LOGIN", payload: respond.data });
        console.log("User Status:", respond.data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <BrowserRouter>
      <div>
        <Navbar Logo="My App" />

        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/UserProfileEdit" element={<UserProfileEdit />} />
            <Route path="/UserProfile" element={<SocialProfile />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route
              path="/confirmnewpassword"
              element={<ConfirmNewPassword />}
            />
            <Route
              path="/authentication/:token"
              element={<VerificationPage />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
