export type Project = {
    id: string;
    title: string;
    description: string;
    image: string;
    url: string;
    date: string;
    category: string;
    featured: boolean;
}

export interface PostMeta {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    slug: string;
}