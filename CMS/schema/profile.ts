import { defineField, defineType, Preview } from "sanity";

export default defineType({
    name: "profile",
    title: "Profile",
    type: "document",
    fields:[
        defineField({
            name: "fullname",
            title: "Full Name",
            type: "string",
        }),
        defineField({
            name: "headline",
            title: "Headline / Role",
            type: "string",
        }),
        defineField({
            name: "fullbio",
            title: "Bio",
            type:"text"
        }),
        defineField({
            name: "picture",
            title: "Profile Picture",
            type: "image",
            options:{
                hotspot: true,
            }
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string"
        }),
        defineField({
            name: "resume",
            title: "Resume / CV (PDF)",
            type: "file",
            options:{
                accept: ".pdf"
            }
        }),
        defineField({
            name: "socials",
            title: "Socials",
            type: "array",
            of:[
                {
                    type: "object",
                    title: "socials",
                    fields:[
                        {
                            name: "label",
                            title: "Label",
                            type: "string",
                            initialValue: "Social",
                            options:{
                                list:[
                                    {title: "Instagram", value: "Instagram"},
                                    {title: "LinkedIn", value: "LinkedIn"},
                                    {title: "Git Hub", value: "Git Hub"},
                                ]
                            }
                        },
                        {
                            name: "url",
                            title: "Url",
                            type: "url"
                        }
                    ],
                    preview:{
                        select:{
                            title: "label",
                            subtitle: "url",
                        }
                    }
                }
            ]
        })
    ]
})