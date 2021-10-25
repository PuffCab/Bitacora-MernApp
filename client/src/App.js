
import './App.css';
import Home from './views/home/Home';
import Login from './views/login/Login';
import ProfilePage from './views/profilePage/ProfilePage';
import Register from './views/register/Register';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
// import { AuthContext, AuthContextProvider } from './context/AuthContext'; //TEST original
import { AuthContext } from './context/AuthContext2'; //TEST nuevo
import { useContext } from 'react';



function App() {

  const { loggedUser } = useContext(AuthContext)
  // console.log(`userINApp`,loggedUser )
  
  return (
    <div className="app" >
      
        
          <Switch>
            <Route exact path="/"> 
                             
                { !loggedUser ? <Register/> : <Home/>  }
            </Route>
            <Route exact path="/login">
              <Login/>
                { loggedUser ? <Redirect to="/"/> : <Login/>}
            </Route>
            <Route exact path="/register">
                <Register/>
                { loggedUser ? <Redirect to="/"/> : <Register/>}
            </Route>
            <Route exact path="/profilepage/:userId">
                <ProfilePage/>
            </Route>
          </Switch>
        
    </div>
  );
}

export default App; //TEST nuevo


// function App() {
//   // const { user } = useContext(AuthContext);
//   return (
    

//     <Router>
//       <Switch>
//         <Route exact path="/">
//           <Home/>
//           {/* {user ? <Home /> : <Register />} */}
//         </Route>
//         <Route path="/login">
//         <Login/>
//         {/* {user ? <Redirect to="/" /> : <Login />} */}
//         </Route>
//         <Route path="/register">
//         <Register/>
//           {/* {user ? <Redirect to="/" /> : <Register />} */}
//         </Route>
//         <Route path="/profile/:username">
//           <ProfilePage />
//         </Route>
//       </Switch>
//     </Router>
    
//   );
// }

// export default App; //TEST original