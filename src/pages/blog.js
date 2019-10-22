import React from "react"
import { Paper } from "../components/style"
import { SEO } from "../components/seo"
import Layout from "../components/layout"

const Blog = () => (
  <Layout>
    <SEO title="Blog" />
    <Paper>
      <h2>Blog</h2>
      <hr />
    </Paper>
  </Layout>
)

export default Blog
