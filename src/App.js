import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TreasureListPage from './pages/TreasureListPage';
import IsPrivate from './components/IsPrivate';


function App() {
  return (
    <div className="App">
 <Navbar />

<Routes>
  <Route exact path="/" element={<HomePage />} />
  <Route exact path="/treasure-list" element={ <IsPrivate> <TreasureListPage /> </IsPrivate> } 
        />
</Routes>

    </div>
  );
}

export default App;
