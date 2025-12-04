import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import projects from './schema/projects'

export default defineConfig({
  name: 'default',
  title: 'my-projects',

  projectId: 'n51sfk1n',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [projects,],
  },
})
