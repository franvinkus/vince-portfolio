import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const projectId = 'n51sfk1n'
export const dataset = 'production'
const apiVersion = '2025-11-29'

export const sanityClient = createClient({
    projectId, 
    dataset,
    apiVersion,
    useCdn: false,
})

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}