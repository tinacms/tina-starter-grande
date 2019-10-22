import React from "react"
import { Paper } from "../components/style"
import { SEO } from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

const Page = () => {
  return (
    <>
      <SEO title="Page" />
      <Paper>
        <h2>Aromatic Caramelization</h2>

        <hr />

        <ol>
          <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
          <li>Aliquam tincidunt mauris eu risus.</li>
        </ol>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          magna. Cras in mi at felis aliquet congue. Ut a est eget ligula
          molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis
          mollis, tellus est malesuada tellus, at luctus turpis elit sit amet
          quam. Vivamus pretium ornare est.
        </p>
        <h3>Instant Frappuccino</h3>

        <blockquote>
          <p>
            <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend
            leo. Quisque sit amet est et sapien?
          </p>
        </blockquote>

        <p>
          <strong>Pellentesque habitant morbi tristique</strong> senectus et
          netus et malesuada fames ac turpis egestas. Vestibulum tortor quam,
          feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero
          sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em>
        </p>
        <ul>
          <li>160 Seats for majority</li>
          <li>Seats to come: 305</li>
          <li>We'll have a better sense of how close this race will be.</li>
        </ul>
        <p>
          Mauris placerat eleifend leo. Quisque sit amet est et sapien
          ullamcorper pharetra. Vestibulum erat wisi, condimentum sed,{" "}
          <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum,
          elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis
          tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis
          pulvinar facilisis. Ut felis.
        </p>
      </Paper>
    </>
  )
}

export default Page
