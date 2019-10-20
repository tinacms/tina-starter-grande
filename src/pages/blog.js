import React from "react"
import { Link } from "gatsby"
import { Site } from "../components/site"
import { SEO } from "../components/seo"

const SecondPage = () => (
  <Site>
    <SEO title="Blog" />
    <h2>Hi from the blog</h2>
    <p>Welcome to the blog</p>
    <Link to="/">Go back to the homepage</Link>
  </Site>
)

export default SecondPage
