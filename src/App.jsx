import './App.css'

import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import TablePage from './pages/table/table.jsx';
import MenuPage from './pages/menu/menu.jsx';
import RobotControlPage from './pages/control/control.jsx';
import HolonomicControl from './pages/hol/hol.jsx';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TablePage />} />
          <Route path="/table/:table_id" element={<TablePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/control/" element={<RobotControlPage />} />  
          <Route path="/holo_control/" element={<HolonomicControl />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
