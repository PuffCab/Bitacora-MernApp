
// we define what would happen in every scenario. 
//we use switch, but we could use if/else

const AuthReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN_START" :
            return {
                user: null,
                isFetching: true,
                error: false,
            };
        case "LOGIN_SUCCESS" :
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        
        case "LOGIN_FAILURE" :
            return {
                user: null,
                isFetching: false,
                error: action.payload,
            };
            default:
                return state
             
    }
}

export default AuthReducer;

