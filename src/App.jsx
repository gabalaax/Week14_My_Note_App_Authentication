import React,{ useState} from "react";
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import EditNote from "./components/EditNote";
import { Routes, Route, Link } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setUserInfo(token);
    }
  }, [userInfo]);

  const handleLogout = () => {
    try {
      Cookies.remove('token');
      setUserInfo(null);
      window.location.reload();
      navigate('/user/login');
    } catch (error) {
      console.log('Logout error:', error);
      // Handle error case if needed
    }
  };
  return (
    <div className="bg-blue-600 min-h-screen flex">
      
      <div className="w-full  ">
        <nav className=" flex  mt-[2.7rem] justify-around">
          <div>
            <a href="/" className="text-white text-2xl"><span className="text-yellow-500 text-2xl">Gabi</span>NOTES</a>
          </div>
          <div >
            <ul className="flex  space-x-7 mt-2   justify-around "> 
             <li className=" text-white text-xl ">
               <Link to="./">Home</Link>
             </li>
             {userInfo && (
             <><li className=" text-white text-xl  " >
               <Link to="/add_Note">Add Note</Link>
             </li>
             <li className=" text-white text-xl  " >
               <Link to="/Profile">Profile</Link>
             </li>

             <li className=" text-white text-xl ">
              <Link onClick={handleLogout}>logout</Link>
             </li>
             </>
             )}
             {!userInfo &&(
              <>
             <li className=" text-white text-xl  " >
               <Link to="/Login">Login</Link>
             </li>
             <li className=" text-white text-xl " >
               <Link to="/Register">Register</Link>
             </li>
             </>
             )}

             
          </ul>
          </div>
        </nav>
        <Routes>
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/add_Note" element={<PrivateRoute/>}>
              <Route path="/add_Note" element={<AddNote />} />
            </Route>
            <Route path="/profile" element={<PrivateRoute/>}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/edit/:id" element={<PrivateRoute/>}>
              <Route path="/edit/:id" element={<EditNote />} />
            </Route>
            <Route path="/" element={<Notes/>}/>
          </Routes>
      </div>
    </div>
  );
}

export default App;