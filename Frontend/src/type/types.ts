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

export interface Profile{
    id: string, 
    fullname: string,
    headline: string,
    fullbio: string,
    picture: string,
    email: string,
    resume: string,
    socials:{
        label: string;
        url: string;
    }[]; 
}

export type PlanetStyle = {
  gradient: string;
  shadow: string;
};