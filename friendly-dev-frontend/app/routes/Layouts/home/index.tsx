import { Outlet } from 'react-router';
import Hero from '~/components/organisms/Hero';
import type { Route } from './+types/index';

export const meta = ({}: Route.MetaArgs) => {
    return [
        { title: 'The friendly Dev | Welcome' },
        { name: 'description', content: 'Custom website development' },
    ];
}

const HomeLayout = () => {
    return (
        <>
            <Hero />
            <section className="max-w-6xl mx-auto px-6 my-8">
                <Outlet />
            </section>
        </>
    );
}
 
export default HomeLayout;