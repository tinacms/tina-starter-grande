import React from "react"
import { SEO } from "../components/seo"
import { Paper } from "../components/style"

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <Paper>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Paper>
  </>
)

export default NotFoundPage
