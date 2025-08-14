import type { Project } from '~/types';
import type { Route } from './+types/index';
import ProjectCard from '~/components/organisms/ProjectCard';
import ItemGrid from '~/components/organisms/ItemGrid';
import SelectFilter from '~/components/molecules/filters/filter/Select';
import { sortToggle } from '~/components/molecules/sorters/sorter/SortToggle';

export const meta = ({}: Route.MetaArgs) => {
    return [
        { title: 'The friendly Dev | Projects' },
        { name: 'description', content: 'Custom website development' },
    ];
}

export const loader = async ({ 
    request,
}: Route.LoaderArgs): Promise<{
    projects: Project[]
}> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
    const data = await response.json();
    return {
        projects: data
    };
}

const ProjectsPages = ({ loaderData }: Route.ComponentProps) => {
    const { projects } = loaderData;

    const filters = [
        SelectFilter<Project, string>({
            id: 'category',
            getValue: (project) => project.category,
            includeAll: true,
            allLabel: 'All Categories',
        })
    ];

    const sorters = [
        sortToggle<Project>({
            id: 'date',
            label: 'Sort By',
            initialDir: 'desc',
            dirLabels: {
                desc: 'Newest',
                asc: 'Oldest',
            },
            getNumber: (p) => {
                const t = new Date(p.date as any).getTime();
                return Number.isNaN(t) ? null : t;
            }
        })
    ]

    return (
        <section>
            <h2 className="text-3xl font-bold text-white mb-8">
                My Projects
            </h2>

            <ItemGrid
                items={projects}
                itemsPerPage={10}
                renderItem={(project) => <ProjectCard project={project} />}
                getKey={(project) => project.id}
                filters={filters}
                sorters={sorters}
            />
        </section>
    );
}

export default ProjectsPages;