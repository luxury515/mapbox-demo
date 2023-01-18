import { Outlet } from 'react-router-dom';
import './App.css';
import React from 'react';
function App() {
    return (
        <div>
            App components 입니다.
            <Outlet />
        </div>
    );
}

export default App;
