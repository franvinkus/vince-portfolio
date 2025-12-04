export interface Project{
    id: string,
    name: string,
    slug: string,
    stack: string[],
    details: string,
    images: string[],
    repoLink: string[]
}

export interface ProjectThumbnail{
    id: string,
    name: string,
    thumbnail: string,
}