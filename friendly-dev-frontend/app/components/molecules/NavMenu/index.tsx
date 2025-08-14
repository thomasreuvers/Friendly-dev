import { NavLink } from 'react-router';

export interface NavMenuProps {
    onNavLinkClick?: () => void;
}

const NavMenu = ({ onNavLinkClick }: NavMenuProps) => {
    const base = 'transition hover:text-blue-400';
    const active = 'text-blue-400 font-semibold';

    return ( 
        <>
            <NavLink 
                className={({ isActive }) => isActive ? active : base}
                to={'/'}
                onClick={onNavLinkClick}
            >
                    Home
            </NavLink>
            <NavLink 
                className={({ isActive }) => isActive ? active : base}
                to={'/projects'}
                onClick={onNavLinkClick}
            >
                Projects
            </NavLink>
            <NavLink 
                className={({ isActive }) => isActive ? active : base}
                to={'/blog'}
                onClick={onNavLinkClick}
            >
                Blog
            </NavLink>
            <NavLink 
                className={({ isActive }) => isActive ? active : base}
                to={'/about'}
                onClick={onNavLinkClick}
            >
                About
            </NavLink>
            <NavLink 
                className={({ isActive }) => isActive ? active : base}
                to={'/contact'}
                onClick={onNavLinkClick}
            >
                Contact
            </NavLink>
        </>
    );
}
 
export default NavMenu;