import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import axios from "axios";
import axios2 from "../tools/axios2";
// import { AuthContext } from './AuthContext';

export const AuthContext = createContext();

const setLocalStorage = (response) => {
  localStorage.setItem("token", response.data.token);
  // localStorage.setItem("user", JSON.stringify(response.data)); //TEST nuevo
  console.log("Token stored in local storage", response.data);
};

export const AuthContextProvider = ({ children }) => {
  let history = useHistory();

  const [loggedUser, setLoggedUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userUpdated, setUserUpdated] = useState(loggedUser);

  //Probando User persistance in localstorage //ASK no funciona. con refresh se marcha el user ...preguntar
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserFromToken();
    }
  }, []);
  //FIN BLOQUE

  const getUserFromToken = async () => {
    const res = await axios2.get(`/users/test`); //NOTE we are sending the Token in axios Header
    console.log(`res`, res);
    setLoggedUser(res.data);
  };
  const updateUser = async (userId) => {
    console.log("AUTHCONTEXT el userId para UpdateUser", userId);
    const res = await axios2.get(`/users?userId=${userId}`);

    setUserUpdated(res.data);
    console.log("USER UPDATED >>>>", userUpdated);
  };

  const loginUser = (userLoginData) => {
    console.log(`userLoginData en AUTHCONTEXT>>>>`, userLoginData);
    axios2
      .post("/auth/login", userLoginData)
      .then((response) => {
        //  console.log(`AUTHCONTEXT: sucess >>>`, response);
        //stre token in Local storage
        setLocalStorage(response);

        const data = response.data;
        const user = data.user;
        console.log(`AuthContext: user Login>>>`, user._id);
        //  console.log("Authcontext response", response.data);
        //  console.log("Authcontext TOKEN", response.data.token)

        //Set user
        setLoggedUser(user);
        setUserId(user._id);
        if (user) {
          history.push("/");
        }
      })
      .catch((error) => console.log(`ErrorMessage>>>`, error.message));
  };
  // console.log("logginUSER>>>", loggedUser)

  const logout = () => {
    localStorage.removeItem("token"); //TEST original
    // localStorage.removeItem("user"); //TEST nuevo
    setLoggedUser(null);
    console.log(`user logged out`, loggedUser);
  };

  console.log(`loogedUSER in AUTHCONTEXT>>>>`, userId);
  const getUser = () => {
    axios2
      .get(`/users?userId=${userId}`) //ASK porque no consigo el userId aqui?!!? ..ver maneras
      //   .get(`/users?userId=616f3e2772f66c03d6681f3d`) //ASK con request correcto, hace el request pero nos saca de la pagina
      .then((response) => {
        console.log(response.data.user);
        const user = response.data.user;
        if (user) {
          console.log("got your user", loggedUser);
          setLoggedUser(user);
        } else {
          console.log("No user logged");
          setLoggedUser(null);
        }
      })
      .catch((error) => console.log(`error`, error));
  };

  useEffect(() => {
    console.log("useEFFECT en AUTHCONTEXT run");
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loggedUser, userUpdated, loginUser, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
