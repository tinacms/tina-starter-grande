import React from "react"
import { Link } from "gatsby"
import { Site } from "../components/site"
import { SEO } from "../components/seo"
import { Paper } from "../components/ui"

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
