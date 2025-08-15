import type { Project } from '~/types';
import ProjectCard from '../ProjectCard';
import ItemGrid from '../ItemGrid';

interface FeaturedProjectsProps {
    projects?: Project[];
    numberOfProjects?: number;
}

const FeaturedProjects = ({ 
    projects,
    numberOfProjects = 4
}: FeaturedProjectsProps) => {

    const featuredProjects = projects?.filter(project => project.featured).slice(0, numberOfProjects);

    return (
        <section>
            <h2 className="text-2xl font-bold mb-6 text-gray-200">
                Featured Projects
            </h2>
            {featuredProjects && featuredProjects.length > 0 ? (
                <ItemGrid
                    items={featuredProjects}
                    renderItem={(project) => <ProjectCard project={project} />}
                    getKey={(project) => project.id}
                />
            ) : (
                <p className="text-gray-400">No featured projects available.</p>
            )}
        </section>
    );
}
 
export default FeaturedProjects;