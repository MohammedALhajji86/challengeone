import React, { useState, useEffect } from 'react';

export default function ChallengeComponent() {
    const [word, setWord] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
         
        fetch('/get-challenge')
            .then(res => res.json())
            .then(data => setWord(data.word));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        const response = await fetch('/login-check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token
            },
            body: JSON.stringify({ password: password })
        });

        const data = await response.json();
        setStatus(data.status);
        setMessage(data.message);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100" dir="rtl">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">تسجيل الدخول</h1>
                
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
                    <h2 className="text-3xl font-mono font-bold text-blue-600 mt-2">{word}</h2>
                </div>

                {message && (
                    <div className={`mb-4 p-2 rounded text-sm ${status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <input 
                        type="number" 
                        className="border rounded w-full py-2 px-3 mb-4 text-right"
                        placeholder=" " 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700">
                        تسجيل
                    </button>
                </form>
               
            </div>
        </div>
    );
}