import './App.css';

import { Routes, Route } from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import JobDone from './components/JobDone';
import NotFoundPage from './components/NotFoundPage';
import Navbar from './components/Navbar';


function App() {
  return ( <>
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/job-done" element = {<JobDone />}></Route>
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>);
}

export default App;