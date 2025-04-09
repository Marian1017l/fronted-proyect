import React from 'react';
import './HomeAdmin.css';

const HomeAdmin = () => {
    return (
        <div className="home-admin">
            <header className="main-header">
                <h1>WELCOME ADMIN</h1>
            </header>

            <main className="main-content">
                <div className="top-actions">
                    <button className="submit-button">SUBMIT</button>
                </div>
            </main>
        </div>
    );
};

export default HomeAdmin;
