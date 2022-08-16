import React from "react";
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return ( <>
        <div>
            Home Page
        </div>
        <button onClick={() => navigate('job-done')}>
            Do Job
        </button>

    </>);
};

export default Home;