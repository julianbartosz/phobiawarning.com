import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login.jsx';
import MovieCatalog from './pages/MovieCatalog.jsx'

function App() {
  return (
    <Router>
      <div className='app'>
        <DndProvider backend={HTML5Backend}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<MovieCatalog />} />
          </Routes>
        </DndProvider>
      </div>
    </Router>
  );
}

export default App;
