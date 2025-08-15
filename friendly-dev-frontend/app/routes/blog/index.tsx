import type { PostMeta, StrapiPost, StrapiResponse } from '~/types';
import type { Route } from "./+types/index";
import PostCard from '~/components/organisms/PostCard';
import { sortToggle } from '~/components/molecules/sorters/sorter/SortToggle';
import ItemList from '~/components/organisms/ItemList';
import { SearchFilter } from '~/components/molecules/filters/filter/Search';

export const loader = async ({ request }: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts?populate=*`);

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

    return { posts };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
    const { posts } = loaderData || {};

    const filters = [
        SearchFilter<PostMeta>({
            id: 'title',
            label: 'Search',
            getText: (post) => `${post.title} ${post.excerpt} ${post.slug}`,
            placeholder: 'Search posts...',
        })
    ];

    const sorters = [
        sortToggle<PostMeta>({
            id: 'date',
            label: 'Sort By',
            initialDir: 'desc',
            dirLabels: {
                asc: 'Oldest',
                desc: 'Newest',
            },
            getNumber: (p) => {
                const t = new Date(p.date as any).getTime();
                return Number.isNaN(t) ? null : t;
            }
        })
    ]

    return (
        <div className='max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900'>
            <h2 className="text-3xl font-bold text-white mb-8">
                Blog
            </h2>
            <ItemList
                items={posts}
                itemsPerPage={5}
                renderItem={(post) => <PostCard key={post.id} post={post} />}
                filters={filters}
                sorters={sorters}
            />
        </div>
    );
}
 
export default BlogPage;