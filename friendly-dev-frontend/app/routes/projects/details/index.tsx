import type { Project, StrapiProject, StrapiResponse } from '~/types';
import type { Route } from './+types/index';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router';

export const clientLoader = async ({ request, params }: Route.LoaderArgs): Promise<Project> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/projects?filters[documentId][$eq]=${params.id}&populate=*`);

    if (!response.ok) {
        throw new Response('Failed to fetch project', { status: 404 });
    }

    const json: StrapiResponse<StrapiProject> = await response.json();

    const project = json.data[0];
    
    return {
        id: project.id,
        documentId: project.documentId,
        title: project.title,
        description: project.description,
        image: project.image?.url
            ? `${import.meta.env.VITE_STRAPI_URL}${project.image.url}`
            : '/images/no-image.png',
        url: project.url,
        date: project.date,
        category: project.category,
        featured: project.featured
    }
}

const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps ) => {
    const project = loaderData;
    return ( 
        <>
            <Link to={'/projects'} className='flex items-center text-blue-400 hover:text-blue-500 mb-6 transition'>
                <FaArrowLeft className='mr-2' /> Back to Projects
            </Link>

            <div className="grid gap-8 md:grid-cols-2 items-start">
                <div>
                    <img src={project.image} alt={project.title} className="w-full rounded-lg shadow-md" />
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-blue-400 mb-4">
                        {project.title}
                    </h1>
                    <p className="text-gray-300 text-sm mb-4">
                        {new Date(project.date).toLocaleDateString()} - {project.category}
                    </p>
                    <p className="text-gray-200 mb-6">
                        {project.description}
                    </p>
                    <a href={project.url} target={'_blank'} className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition">View Live Site &#8594;</a>
                </div>
            </div>
        </>
    );
}
 
export default ProjectDetailsPage;