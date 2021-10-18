export const LoginStart = (userCredentials) => ({
    type:"LOGIN_START",
});

export const LoginSucess = (user) => ({
    type:"LOGIN_SUCCESS",
    payload: user,
});
//payload is a convention. we might use any other term
export const LoginFailure = (error) => ({
    type:"LOGIN_FAILURE",
    payload: error
}); 




//We define the amount of situations might happen