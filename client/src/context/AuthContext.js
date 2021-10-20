import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    // user: null,
    user: 
        {
        _id:{"$oid":"616f3e2772f66c03d6681f3d"},
        userName:"test69",
        email:"test69@test.com",
        password:"$2b$10$mGOLCcHgZTbXid7WFP/99.zqtfyM4qJq/7joHcQugqBOpYn71TWN.",
        avatar:"",
        coverPicture:"",
        followers:[],
        youFollow:[],
        isAdmin:false,
        createdAt:{"$date":{"$numberLong":"1634680359197"}},
        updatedAt:{"$date":{"$numberLong":"1634680359197"}},
        __v:{"$numberInt":"0"}
    }, //DELETE comento user null y pego un usuario para no tener tests
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    // we store user in localstorage
    useEffect( () => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])
    

    return (
        <AuthContext.Provider value={{user: state.user, isFetching: state.isFetching, error: state.error, dispatch}}>
            {children}
        </AuthContext.Provider>
    )

 

}