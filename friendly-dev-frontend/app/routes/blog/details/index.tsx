import type { PostMeta, StrapiPost, StrapiResponse } from '~/types';
import type { Route } from './+types/index';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export const clientLoader = async ({ request, params }: Route.LoaderArgs): Promise<{ post: PostMeta }> => {
    const { slug } = params;
    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts?filters[slug][$eq]=${slug}&populate=*`);

    if (!response.ok) {
        throw new Response('Failed to fetch post');
    }

    const json: StrapiResponse<any> = await response.json();

    const item = json.data[0];

    const post: PostMeta = {
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        date: item.date,
        excerpt: item.excerpt,
        image: item.image?.url
            ? item.image.url
            : '/images/no-image.png',
        slug: item.slug,
        body: item.body
    };

    return { 
        post
    };
}

const BlogPostDetailsPage = ({ loaderData }: Route.ComponentProps) => {
    const { post } = loaderData || {};

    return (
        <div className='max-w-3xl mx-auto px-6 py-12 bg-gray-900'>
            <h1 className='text-3xl font-bold text-blue-400 mb-2'>
                {post?.title}
            </h1>
            <p className="text-sm text-gray-400 mb-6">
                {new Date(post?.date).toDateString()}
            </p>

            <img src={post?.image} alt={post?.title} className="w-full h-64 object-cover mb-4" />

            <div className="prose prose-invert max-w-none mb-12">
                <BlocksRenderer content={post?.body} />
                {/* <ReactMarkdown>
                    {post?.body}
                </ReactMarkdown> */}
            </div>

            <Link to={'/blog'} className='inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'>
                Back to Blog
            </Link>
        </div>
    );
}
 
export default BlogPostDetailsPage;