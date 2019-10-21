import React from "react"
import { Link } from "gatsby"
import { Site, Paper } from "../components/site"
import { SEO } from "../components/seo"

const Blog = () => (
  <Site>
    <SEO title="Blog" />
    <Paper>
      <h2>Blog</h2>
      <hr />
    </Paper>
  </Site>
)

export default Blog
