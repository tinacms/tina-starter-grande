import React from "react"
import { SEO } from "../components/seo"
import Layout from "../components/layout"
import { Paper } from "../components/style"
import Layout from "../components/layout"

const NotFoundPage = () => (
  <LayoutDimensions>
    <SEO title="404: Not found" />
    <Paper>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Paper>
  </LayoutDimensions>
)

export default NotFoundPage
