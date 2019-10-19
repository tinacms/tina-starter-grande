import React from "react"
import { Link } from "gatsby"
import { Site } from "../components/site"
import { SEO } from "../components/seo"

const SecondPage = () => (
  <Site>
    <SEO title="Page two" />
    <h2>Hi from the second page</h2>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Site>
)

export default SecondPage
