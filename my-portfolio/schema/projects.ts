import { substituteTokens } from "react-admin";
import { defineField, defineType, Preview } from "sanity";

export default defineType({
    name: 'projects',
    title: 'Projects',
    type:'document',
    fields:[
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options:{ 
                source: 'name',
                maxLength: 96,
            }
        }),
        defineField({
            name: 'stack',
            title: 'Tech Stack',
            type: 'array',
            of: [{ type: 'string' }],
            options:{
                layout: 'tags',
            }
        }),
        defineField({
            name: 'details',
            title: 'Details',
            type: 'text',
        }),
        defineField({
            name: 'images',
            title: 'Project Gallery ',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options:{
                        hotspot: true
                    },
                    fields:[
                        {
                            name: 'alternate',
                            title:'Alternate Text',
                            type: 'string',
                        }
                    ]
                }
            ],
            options: {
                layout: 'grid',
            }
        }),
        defineField({
            name: 'repoLink',
            title: 'Repository Link',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Repo link',
                    fields: [
                        {
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                            initialValue: 'GitHub',
                            options: {
                                list: [
                                    {title: 'GitHub (Fullstack)', value: 'Fullstack'},
                                    {title: 'GitHub (Frontend)', value: 'Frontend'},
                                    {title: 'GitHubg (Backend', value: 'Backend'},
                                    {title: 'Figma Design', value: 'Figma'},
                                ]
                            }
                        },
                        {
                            name: 'url',
                            title: 'Url',
                            type: 'url',
                        }
                    ],
                    preview:{
                        select:{
                            title: 'label',
                            subtitle: 'url',
                        }
                    }
                }
            ]
        }),
    ]
})