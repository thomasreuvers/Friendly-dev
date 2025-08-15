import FeaturedProjects from '~/components/organisms/FeaturedProjects';
import type { Route } from './+types';
import type { PostMeta, Project, StrapiPost, StrapiProject, StrapiResponse } from '~/types';
import AboutPreview from '~/components/organisms/AboutPreview';
import LatestPosts from '~/components/organisms/LatestPosts';

const fetchPosts = async (request: Request): Promise<PostMeta[]> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts?sort[0]=date:desc&populate=*`);

    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }

    const json: StrapiResponse<StrapiPost> = await response.json();

    const posts: PostMeta[] = json.data.map((item) => ({
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        excerpt: item.excerpt,
        date: item.date,
        slug: item.slug,
        body: item.body,
        image: item.image?.url
            ? item.image.url
            : '/images/no-image.png',
    }));

    return posts;
}

const fetchProjects = async (): Promise<Project[]> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`);

    if (!response.ok) {
        throw new Error('Failed to fetch projects');
    }

    const json: StrapiResponse<StrapiProject> = await response.json();

    const projects: Project[] = json.data.map((item) => ({
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        description: item.description,
        image: item.image?.url
            ? item.image.url
            : '/images/no-image.png',
        url: item.url,
        date: item.date,
        category: item.category,
        featured: item.featured
    }));

    return projects;
}

export const loader = async ({ request }: Route.LoaderArgs): Promise<{projects?: Project[], posts?: PostMeta[]}> => {
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
            <LatestPosts posts={posts?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3)} />
        </>
    );
}
 
export default HomePage;