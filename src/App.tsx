import React from 'react';
import CreateShortUrl from './components/CreateShortUrl';
import RedirectOriginalUrl from './components/RedirectOriginalUrl';
import Index from './components/Index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = (): JSX.Element => {
    return (
        <div className="min-h-screen bg-gray-100 font-nunito text-sm font-normal flex items-center justify-center">
            <Router>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/create" element={<CreateShortUrl />} />
                    <Route path="/:shortCode" element={<RedirectOriginalUrl />} />
                </Routes>
            </Router>
        </div>
    );
};


export default App;