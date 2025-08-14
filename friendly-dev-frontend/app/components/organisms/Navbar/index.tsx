import { useState } from 'react';
import { FaLaptopCode, FaTimes, FaBars } from 'react-icons/fa';
import { NavLink } from 'react-router';
import NavMenu from '~/components/molecules/NavMenu';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    return ( 
        <nav className="bg-gray-800 border-b border-gray-700 shadow md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <NavLink to={'/'} className={'flex items-center gap-2 text-lg font-bold text-blue-300'}>
                    <FaLaptopCode className="text-blue-400 text-xl" />
                    <span>The Friendly Developer</span>
                </NavLink>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="space-x-4 text-sm text-gray-300">
                        <NavMenu />
                    </div>
                </div>

                <div className="md:hidden flex items-center gap-4">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-blue-400 text-xl hover:text-blue-400 cursor-pointer">
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>
            
                {/* Mobile Nav */}
                {
                    menuOpen && (
                        <div className="md:hidden bg-gray-800 border-t border-gray-700 px-6 py-4 space-y-2 space-x-4 text-center">
                            <NavMenu onNavLinkClick={() => setMenuOpen(false)} />
                        </div>
                    )
                }
        </nav>
    );
}
 
export default Navbar;