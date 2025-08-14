import { Outlet } from 'react-router';
import type { Route } from './+types';

export const meta = ({}: Route.MetaArgs) => {
    return [
        { title: 'The friendly Dev' },
        { name: 'description', content: 'Custom website development' },
    ];
}

const MainLayout = () => {
    return (
        <section className="max-w-6xl mx-auto px-6 my-8">
            <Outlet />
        </section>
    );
}
 
export default MainLayout;