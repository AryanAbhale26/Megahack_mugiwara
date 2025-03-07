import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogOut as logout, selectAccount } from '../app/AuthSlice';
import { Globe, Library, UserRoundPlus, UserPen, LogOut } from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const acc = useSelector(selectAccount);
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);

    const routes = [
        {
            name: "Profile",
            path: "/dashboard/welcome",
            allowedFor: [1],
            icon: UserPen
        },
        {
            name: "Market",
            path: "/markets",
            allowedFor: [2, 3],
            icon: Library
        },
        {
            name: "Add Employee",
            path: "/dashboard/add",
            allowedFor: [1],
            icon: UserRoundPlus
        },
    ];

    const filteredRoutes = routes.filter(route => route.allowedFor.includes(acc.role_id));

    return (
        <div
            className={`h-screen bg-gray-900 flex flex-col items-center p-2 shadow-md transition-all duration-300 ${isHovered ? "w-40" : "w-16"
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Logo */}
            <div className="p-3 mb-5 invisible">
                <Globe className="w-8 h-8 text-white" />
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-6 flex-grow">
                {filteredRoutes.map((route, index) => {
                    const isActive = location.pathname === route.path;
                    return (
                        <button
                            key={index}
                            onClick={() => navigate(route.path)}
                            className={`relative flex items-center gap-3 p-3 rounded-lg w-full transition-colors ${isActive ? "bg-indigo-500 text-white" : "text-gray-400 hover:bg-gray-700"
                                }`}
                        >
                            <route.icon className="w-6 h-6" />
                            {isHovered && <span className="text-white text-sm">{route.name}</span>}
                        </button>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <button
                onClick={() => dispatch(logout())}
                className="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-red-600 hover:text-white transition-colors"
            >
                <LogOut className="w-6 h-6" />
                {isHovered && <span className="text-white text-sm">Logout</span>}
            </button>
        </div>
    );
};

export default Sidebar;