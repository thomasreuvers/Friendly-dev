import type { PostMeta } from '~/types';
import type { Route } from './+types/index';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router';

export const clientLoader = async ({ request, params }: Route.LoaderArgs): Promise<{ postMeta: PostMeta; markdown: string }> => {
    const { slug } = params;
    const url = new URL('/posts-meta.json', request.url);
    const response = await fetch(url.href);

    if (!response.ok) {
        throw new Response('Failed to fetch post');
    }

    const index = await response.json();
    const postMeta = index.find((post: PostMeta) => post.slug === slug);

    if (!postMeta) {
        throw new Response('Not Found', { status: 404 });
    }

    const markdown = await import(`../../../posts/${slug}.md?raw`);

    return { 
        postMeta,
        markdown: markdown.default
    };
}

const BlogPostDetailsPage = ({ loaderData }: Route.ComponentProps) => {
    const { postMeta, markdown } = loaderData || {};

    return (
        <div className='max-w-3xl mx-auto px-6 py-12 bg-gray-900'>
            <h1 className='text-3xl font-bold text-blue-400 mb-2'>
                {postMeta?.title}
            </h1>
            <p className="text-sm text-gray-400 mb-6">
                {new Date(postMeta?.date).toDateString()}
            </p>

            <div className="prose prose-invert max-w-none mb-12">
                <ReactMarkdown>
                    {markdown}
                </ReactMarkdown>
            </div>

            <Link to={'/blog'} className='inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'>
                Back to Blog
            </Link>
        </div>
    );
}
 
export default BlogPostDetailsPage;