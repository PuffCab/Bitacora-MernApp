
import './App.css';
import Home from './views/home/Home';
import Login from './views/login/Login';
import ProfilePage from './views/profilePage/ProfilePage';
import Register from './views/register/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="app" >
      <Router>
         <Switch>
           <Route exact path="/">
              <Home/>
           </Route>
           <Route exact path="/login">
              <Login/>
           </Route>
           <Route exact path="/register">
              <Register/>
           </Route>
           <Route exact path="/profilepage/:username">
              <ProfilePage/>
           </Route>
         </Switch>
      </Router>
    </div>
  );
}

export default App;
