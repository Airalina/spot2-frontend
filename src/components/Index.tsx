import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

interface ApiResponse<T> {
    data: T;
}

interface ShortUrl {
    id: number;
    original_url: string;
    code: string;
}

const Index = (): JSX.Element => {
    const [shortUrls, setShortUrls] = useState<ShortUrl[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchShortUrls = async () => {
            try {
                const response = await axios.get<ApiResponse<ShortUrl[]>>('https://spot2-system.org/api/short-urls');
                setShortUrls(response.data.data);

            } catch (error) {
                console.error('Error fetching short URLs:', error);
            }
        };

        fetchShortUrls();
    }, []);

    const deleteShortUrl = async (code: string) => {
        try {
            await axios.delete(`https://spot2-system.org/api/short-urls/${code}`);
            setShortUrls(shortUrls.filter(url => url.code !== code));
        } catch (error) {
            console.error('Error deleting short URL:', error);
        }
    };

    const handleRedirect = async (code: string) => {
         navigate(`/${code}`);
        // try {
        //     const response = await axios.get<ApiResponse<ShortUrl>>(`https://spot2-system.org/api/short-urls/${code}`);
        //     const originalUrl = response.data.data.original_url;
        //     window.open(originalUrl, '_blank');
        // } catch (error) {
        //     console.error('Error redirecting to original URL:', error);
        // }
    };

    return (
        <div className="border border-[#ebedf2]  rounded-lg py-4 px-6 mb-5 bg-white w-2/3">
            <div className='flex justify-between items-center mb-4'>
                <h1 className="font-semibold text-2xl">Shortened URLs</h1>
                <div className="flex justify-between items-center my-4">
                    <Link to="/create" className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 flex">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5"
                        >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>  Add URL
                    </Link>
                </div>
            </div>
            <div className="table-responsive">
                <table className="min-w-full bg-white table-auto">
                    <thead className='border-b-0 !bg-[#f6f8fa] h-8'>
                        <tr className=''>
                            <th className='text-center font-semibold'>ID</th>
                            <th className='text-center font-semibold'>Code</th>
                            <th className='text-center font-semibold'>Original URL</th>
                            <th className='text-center font-semibold'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shortUrls.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="text-center py-4 text-gray-500">
                                    No records found.
                                </td>
                            </tr>
                        ) : (
                            shortUrls.map((url) => (
                                <tr key={url.id} className="border-t">
                                    <td className='px-4 py-2 text-gray-700 text-center'>{url.id}</td>

                                    <td className='px-4 py-2 text-gray-700 text-center'>{url.code}</td>
                                    <td className='px-4 py-2 text-gray-700 text-center'>{url.original_url.length > 60 ? `${url.original_url.substring(0, 60)}...` : url.original_url}</td>
                                    {/* <td className=''>
                                        <Link
                                            to={`/${url.code}`}
                                            className="text-blue-500"
                                            onClick={() => handleRedirect(url.code)}
                                        >
                                            {`https://spot2-system.org/api/short-urls/${url.code}`}
                                        </Link>
                                    </td> */}
                                    <td className="px-4 py-2 text-gray-700 text-center flex justify-center gap-2">
                                        <button
                                            onClick={() => handleRedirect(url.code)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" 
                                                viewBox="0 0 24 24" className="w-5 h-5 m-auto"><path stroke="#1C274C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m13 11 9-9m0 0h-5.344M22 2v5.344" /><path stroke="#1C274C" strokeLinecap="round" strokeWidth="1.5" d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2m10 10c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465c-.973-.973-1.3-2.342-1.409-4.535" /></svg>
                                        </button>
                                        <button
                                            onClick={() => deleteShortUrl(url.code)}
                                        >
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-5 h-5 m-auto"
                                            >
                                                <path d="M20.5001 6H3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <path
                                                    d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                />
                                                <path opacity="0.5" d="M9.5 11L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <path opacity="0.5" d="M14.5 11L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <path
                                                    opacity="0.5"
                                                    d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Index;

