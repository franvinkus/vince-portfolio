import { sanityClient } from "@/lib/sanity";
import { Profile } from "@/type/types";
import { SanityClient } from "next-sanity";
import AboutMeClient from "./aboutmeClient";

const profileQuery = `*[_type == "profile"][0]{
    "id": _id, 
    fullname, 
    headline,
    fullbio,
    "picture": picture.asset->url,
    email,
    "resume": resume.asset->url,
    "socials": socials
}`;

export default async function AboutMePage(){

    const profile: Profile = await sanityClient.fetch(profileQuery);

    return (
        <AboutMeClient profile={profile}/>
    );
}