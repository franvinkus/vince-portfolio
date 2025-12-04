import { sanityClient } from "@/lib/sanity";
import { Project } from "@/type/types";
import ProjectDetailClient from "./projectDetailClient";

type Prop = {
    params: Promise<{id: string}>
} 

const productQuery = `*[_type == "projects" && _id == $id][0]{
    "id": _id,
    name,
    "slug": slug.current,
    stack, 
    details,
    "images": images[].asset->url,
    "repoLink": repositoryLinks,
}`;

export default async function DetailProject({ params }: Prop){
    const {id} = await params;
    
    const project:Project = await sanityClient.fetch(
        productQuery, {id: id}
    );

    return(
        <ProjectDetailClient projects={project}/>
    );
}
