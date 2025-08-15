import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout('./routes/layouts/home/index.tsx', [
        index('./routes/home/index.tsx'),
    ]),
    layout('./routes/layouts/main/index.tsx', [
        route('about', './routes/about/index.tsx'),
        route('contact', './routes/contact/index.tsx'),
        route('projects', './routes/projects/index.tsx'),
        route('projects/:id', './routes/projects/details/index.tsx'),
        route('blog', './routes/blog/index.tsx'),
        route('blog/:slug', './routes/blog/details/index.tsx'),
        route('*', './routes/errors/NotFound/index.tsx')
    ]),
] satisfies RouteConfig;
