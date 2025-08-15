"use client"

import type { RootNode } from 'node_modules/@strapi/blocks-react-renderer/dist/BlocksRenderer';

export type Project = {
    id: string;
    documentId: string;
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
    documentId: string;
    title: string;
    excerpt: string;
    body: RootNode[];
    image: string
    date: string;
    slug: string;
}

export interface StrapiResponse<T> {
    data: T[];
}

export interface StrapiProject {
    id: string;
    documentId: string;
    title: string;
    description: string;
    image?: {
        url: string;
        formats?: {
            thumbnail?: {
                url: string;
            },
            small?: {
                url: string;
            },
            medium?: {
                url: string;
            },
            large?: {
                url: string;
            }
        }
    };
    url: string;
    date: string;
    category: string;
    featured: boolean;
}

export interface StrapiPost {
    id: string;
    documentId: string;
    slug: string;
    title: string;
    excerpt: string;
    body: RootNode[];
    date: string;
    image?: {
        url: string;
        formats?: {
            thumbnail?: {
                url: string;
            },
            small?: {
                url: string;
            },
            medium?: {
                url: string;
            },
            large?: {
                url: string;
            }
        }
    };
}