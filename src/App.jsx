import './App.css'

import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import TablePage from './pages/table/table.jsx';
import MenuPage from './pages/menu/menu.jsx';
import RobotControlPage from './pages/control/control.jsx';
import HolonomicControl from './pages/hol/hol.jsx';
import HomePage from './pages/home/home.jsx';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/table/:table_id" element={<TablePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/control" element={<RobotControlPage />} />  
          <Route path="/holonomic" element={<HolonomicControl />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
