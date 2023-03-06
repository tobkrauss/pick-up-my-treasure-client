import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TreasureListPage from './pages/TreasureListPage';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage"; 
import AddTreasurePage from './pages/AddTreasurePage';
import TreasureDetailsPage from './pages/TreasureDetailsPage';
import EditTreasurePage from './pages/EditTreasurePage';
import EditItemPage from './pages/EditItemPage';
import ItemDetailsPage from './pages/ItemDetailsPage';
import { useState } from 'react';



function App() {
  const [treasure, setTreasure] = useState([])
  
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route exact path="/" element={<HomePage treasure={treasure}/>}  />
        <Route exact path="/treasure" element={<IsPrivate> <TreasureListPage treasure={treasure} setTreasure={setTreasure} /> </IsPrivate> }
        />
        <Route exact path="/treasure/:treasureId"  element={ <IsPrivate> <TreasureDetailsPage /> </IsPrivate> }
        />
        <Route exact path="/treasure/edit/:treasureId"  element={ <IsPrivate> <EditTreasurePage /> </IsPrivate> } 
        />
        <Route exact path="/new-treasure" element={<IsPrivate> <AddTreasurePage /> </IsPrivate>}
        />
        <Route exact path="/items/:itemId"  element={ <IsPrivate> <ItemDetailsPage /> </IsPrivate> }
        />
        <Route exact path="/items/edit/:itemId"  element={ <IsPrivate> <EditItemPage /> </IsPrivate> } 
        />
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
      </Routes>

    </div>
  );
}

export default App;
