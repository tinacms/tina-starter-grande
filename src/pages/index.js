import React from "react"
import { Link } from "gatsby"
import { Site } from "../components/site"
import { SEO } from "../components/seo"

const IndexPage = () => (
  <Site>
    <SEO title="Home" />
    <h2>Hi people</h2>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <Link to="/page-2/">Go to page 2</Link>
  </Site>
)

export default IndexPage
