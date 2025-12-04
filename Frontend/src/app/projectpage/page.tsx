import { sanityClient } from "@/lib/sanity";
import {Project, ProjectThumbnail} from '@/type/types'
import ProjectClient from "./projectClient"

const projectQuery = `*[_type == "projects"]{
    "id": _id,
    name,
    "thumbnail": images[0].asset->url,
}`;

export default async function PlanetClient(){

    const project: ProjectThumbnail[] = await sanityClient.fetch(projectQuery);

    return(
        <ProjectClient projects={project}/>
    );
}