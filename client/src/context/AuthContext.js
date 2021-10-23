import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    // user: null,
    user: null,
    //     {
    //     _id:{"$oid":"616f3e2772f66c03d6681f3d"},
    //     userName:"test69",
    //     email:"test69@test.com",
    //     password:"$2b$10$mGOLCcHgZTbXid7WFP/99.zqtfyM4qJq/7joHcQugqBOpYn71TWN.",
    //     avatar:"",
    //     coverPicture:"",
    //     followers:[],
    //     friends:[
    //         "614f8d88ed82bd79bf6d9fbf",
    //         "614f2c16f311c9925326e009",
    //         "614f28b8bc0d409c98834702",
    //         "616d7f0501f1ec8ca598b5ee"
    //     ],
    //     isAdmin:false,
    //     createdAt:{"$date":{"$numberLong":"1634680359197"}},
    //     updatedAt:{"$date":{"$numberLong":"1634680359197"}},
    //     __v:{"$numberInt":"0"}
    // }, //DELETE comento user null y pego un usuario para no tener tests
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