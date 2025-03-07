import React from 'react';
import { Link } from 'react-router-dom';

const markets = [
    {
        id: 1,
        name: "Green Harvest Market",
        description: "Fresh fruits, vegetables, and dairy products directly from local farmers.",
        speciality: "Organic Produce",
        location: "MG Road, City Center",
        image: "https://plus.unsplash.com/premium_photo-1686285541226-44d0d185ad4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGluZGlhbiUyMG1hcmtldCUyMHBsYWNlfGVufDB8fDB8fHww"
    },
    {
        id: 2,
        name: "Nature's Bounty",
        description: "Locally sourced honey, spices, and homemade dairy products.",
        speciality: "Homemade Dairy & Honey",
        location: "Park Street, Suburb",
        image: "https://images.unsplash.com/photo-1643545809553-f8c1b8dc2b2e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGluZGlhbiUyMG1hcmtldCUyMHBsYWNlfGVufDB8fDB8fHww"
    },
    {
        id: 3,
        name: "Farmer's Choice",
        description: "Seasonal fruits, fresh herbs, and organic grains from nearby farms.",
        speciality: "Seasonal Produce",
        location: "Green Valley, Countryside",
        image: "https://images.unsplash.com/photo-1636036176299-10ad225fc7de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGluZGlhbiUyMG1hcmtldCUyMHBsYWNlfGVufDB8fDB8fHww"
    },
    {
        id: 4,
        name: "Green Harvest Market",
        description: "Fresh fruits, vegetables, and dairy products directly from local farmers.",
        speciality: "Organic Produce",
        location: "MG Road, City Center",
        image: "https://plus.unsplash.com/premium_photo-1686285541226-44d0d185ad4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGluZGlhbiUyMG1hcmtldCUyMHBsYWNlfGVufDB8fDB8fHww"
    },
    {
        id: 5,
        name: "Nature's Bounty",
        description: "Locally sourced honey, spices, and homemade dairy products.",
        speciality: "Homemade Dairy & Honey",
        location: "Park Street, Suburb",
        image: "https://images.unsplash.com/photo-1636036176299-10ad225fc7de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGluZGlhbiUyMG1hcmtldCUyMHBsYWNlfGVufDB8fDB8fHww"
    },
    {
        id: 6,
        name: "Farmer's Choice",
        description: "Seasonal fruits, fresh herbs, and organic grains from nearby farms.",
        speciality: "Seasonal Produce",
        location: "Green Valley, Countryside",
        image: "https://images.unsplash.com/photo-1706553707046-335e3e8afdf5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGluZGlhbiUyMG1hcmtldCUyMHBsYWNlfGVufDB8fDB8fHww"
    }
];

const Market = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6 px-44  h-screen overflow-auto scrollbar-hide">
            {markets.map((market) => (
                <div key={market.id} className="bg-white rounded-lg shadow-lg">
                    <img src={market.image} alt={market.name} className="rounded-lg w-full h-48 object-cover overflow-hiddem" />
                    <div className="p-4">
                        <div className='mb-4'>
                            <h2 className="text-xl font-semibold mb-2">{market.name}</h2>
                            <p className="text-sm text-gray-600 mb-2">{market.description}</p>
                            <p className="text-sm text-blue-600 mb-2">Speciality: {market.speciality}</p>
                            <p className="text-sm text-gray-700">Location: {market.location}</p>
                        </div>
                        <Link to={`/products/${market.id}`}>
                            <button
                                className='w-full bg-[#101828] text-white py-1.5 rounded-lg cursor-pointer'>
                                See Products
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Market;