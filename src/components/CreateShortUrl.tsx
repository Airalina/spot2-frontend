import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ShortUrlResponse {
    data: {
        code: string;
    };
}
const CreateUrl = (): JSX.Element => {
    const [originalUrl, setOriginalUrl] = useState<string>('');
    const [shortUrl, setShortUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post<ShortUrlResponse>(`${process.env.REACT_APP_API_BASE_URL}/api/short-urls`, { original_url: originalUrl });
            setShortUrl(response.data.data.code);
            navigate(`/`);
        } catch (error) {
            console.error("Error creating short URL:", error);
        }
    };

    const handleRedirect = () => {
        navigate(`/`);
    };

    return (
        <div className="border border-[#ebedf2]  rounded-lg py-4 px-6 bg-white  w-2/3">
            <h1 className="font-semibold text-2xl mb-4">Create new URL</h1>
            <form onSubmit={handleSubmit} className="mb-4 flex-col">
                <label htmlFor='url' className='font-semibold  text-gray-700'>Original URL</label>
                <input
                    type="url"
                    id='url'
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 mt-2 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="Enter Original URL"
                />
                <div className="flex gap-3">
                    <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded hover:hover:bg-indigo-600">create</button>
                    <button type="button" onClick={handleRedirect} className="bg-white text-indigo-500 border border-indigo-500 px-4 py-2 rounded hover:bg-indigo-600 hover:text-white">cancel</button>
                </div>
            </form>
        </div>
    );
};

export default CreateUrl;
