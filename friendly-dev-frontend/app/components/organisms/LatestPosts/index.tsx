import type { PostMeta } from '~/types';
import ItemGrid from '../ItemGrid';
import PostCard from '../PostCard';

interface LatestPostsProps {
    posts?: PostMeta[];
    limit?: number;
}

const LatestPosts = ({ posts, limit = 3}: LatestPostsProps) => {

    if (!posts || posts.length === 0) {
        return (
            <section className='max-w-6l mx-auto px-6 py-12'>
                <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
                <p className="text-gray-400">No latest posts available.</p>
            </section>
        );
    }

    return (
        <section className='max-w-6l mx-auto px-6 py-12'>
            <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
            <ItemGrid
                items={posts.slice(0, limit)}
                itemsPerPage={limit}
                renderItem={(post) => <PostCard post={post} />}
            />
        </section>
    );
}
 
export default LatestPosts;