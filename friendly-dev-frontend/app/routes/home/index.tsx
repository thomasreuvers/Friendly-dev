import FeaturedProjects from '~/components/organisms/FeaturedProjects';
import type { Route } from './+types';
import type { PostMeta, Project } from '~/types';
import AboutPreview from '~/components/organisms/AboutPreview';
import LatestPosts from '~/components/organisms/LatestPosts';

const fetchPosts = async (request: Request): Promise<PostMeta[]> => {
    const url = new URL('/posts-meta.json', request.url);
    const response = await fetch(url.href);

    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }

    const data = await response.json();
    return data;
}

const fetchProjects = async (): Promise<Project[]> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`);

    if (!response.ok) {
        throw new Error('Failed to fetch projects');
    }

    const data = await response.json();
    return data;
}

export const loader = async ({ request }: Route.LoaderArgs): Promise<{projects: Project[], posts: PostMeta[]}> => {
    const [projects, posts] = await Promise.all(
        [
            fetchProjects(), 
            fetchPosts(request)
        ]);

    return { projects, posts };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
    const { projects, posts } = loaderData;

    return (
        <>
            <FeaturedProjects projects={projects} />
            <AboutPreview />
            <LatestPosts posts={posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3)} />
        </>
    );
}
 
export default HomePage;