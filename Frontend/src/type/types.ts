export interface Project{
    id: string,
    name: string,
    slug: string,
    stack: string[],
    details: string,
    images: string[],
    repoLink:{
        label: string;
        url: string;
    }[],
}

export interface ProjectThumbnail{
    id: string,
    name: string,
    thumbnail: string,
}