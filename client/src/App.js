
import './App.css';
import Home from './views/home/Home';
import Login from './views/login/Login';
import ProfilePage from './views/profilePage/ProfilePage';
import Register from './views/register/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { AuthContext, AuthContextProvider } from './context/AuthContext';
import { useContext } from 'react';



// function App() {

//   const {user} = useContext(AuthContext)
//   console.log(`userINApp`, user)
  
//   return (
//     <div className="app" >
//       <AuthContextProvider>
//         <Router>
//           <Switch>
//             <Route exact path="/">
//                 { user ? <Home/> : <Login/> }
//             </Route>
//             <Route exact path="/login">
//                 { user ? <Redirect to="/"/> : <Login/>}
//             </Route>
//             <Route exact path="/register">
//                 {/* { user ? <Redirect to="/"/> : <Register/>} */}
//             </Route>
//             <Route exact path="/profilepage/:username">
//                 <ProfilePage/>
//             </Route>
//           </Switch>
//         </Router>
//       </AuthContextProvider>
//     </div>
//   );
// }

// export default App;
function App() {
  const { user } = useContext(AuthContext);
  return (
    

    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:username">
          <ProfilePage />
        </Route>
      </Switch>
    </Router>
    
  );
}

export default App;