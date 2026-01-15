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
    "repoLink": repoLink,
}`;

export async function generateStaticParams(){
    const query = `*[_type == "projects"]{ "_id": _id }`;
    const projects = await sanityClient.fetch(query);

    return projects.map((project: any) => ({
        id: project._id, 
    }));
}

export default async function DetailProject({ params }: Prop){
    const {id} = await params;
    
    const project:Project = await sanityClient.fetch(
        productQuery, {id: id}
    );

    return(
        <ProjectDetailClient projects={project}/>
    );
}
