import React from 'react';
import {useNavigate} from 'react-router-dom'
const JobDone = () => {
    const navigate = useNavigate();
    return (<>
        <div>Job Done!</div>
        <button onClick={() => navigate(-1)}>go Back</button>
    </>)
}

export default JobDone;

/*
navigate -1을 하면 뒤로가기 기능을 한다
*/