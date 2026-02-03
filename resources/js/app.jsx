import './bootstrap';
import '../css/app.css'; 
import React from 'react';
import ReactDOM from 'react-dom/client';
import ChallengeComponent from './components/ChallengeComponent';

if (document.getElementById('app')) {
    const root = ReactDOM.createRoot(document.getElementById('app'));
    root.render(
        <React.StrictMode>
            <ChallengeComponent />
        </React.StrictMode>
    );
}