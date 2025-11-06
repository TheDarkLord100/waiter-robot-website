import './App.css'

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import TablePage from './pages/table/table.jsx';
import MenuPage from './pages/menu/menu.jsx';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/table/:table_id" element={<TablePage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
