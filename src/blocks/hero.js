import React from "react"
import styled, { css } from "styled-components"
import { transparentize } from "polished"
import { Wrapper, Overlay, LinkButton } from "../components/style"
import BackgroundImage from "gatsby-background-image"

export const Hero = ({ ...hero }) => {
  return (
    <HeroWrapper large={large ? true : false}>
      <HeroBackground overlap={overlap} parallax={parallax}>
        {overlay && <Overlay />}
        {image && <HeroImage fluid={image.childImageSharp.fluid}></HeroImage>}
      </HeroBackground>
      <Wrapper>
        {headline && <Headline>{headline}</Headline>}
        {textline && <Textline>{textline}</Textline>}
        {ctas && (
          <Actions>
            {Object.keys(ctas).map(key => {
              return (
                <LinkButton primary={ctas[key].primary} to={ctas[key].link}>
                  {ctas[key].label}
                  {ctas[key].arrow && <span>&nbsp;&nbsp;→</span>}
                </LinkButton>
              )
            })}
          </Actions>
        )}
      </Wrapper>
    </HeroWrapper>
  )
}

export const HeroBlock = {
  label: "Hero",
  name: "hero",
  defaultItem: {},
  fields: [
    {
      label: "Headline",
      name: "headline",
      component: "text",
    },
    {
      label: "Textline",
      name: "textline",
      component: "text",
    },
    {
      label: "Image",
      name: "image",
      component: "text",
    },
    {
      label: "Actions",
      name: "ctas",
      component: "group-list",
      itemProps: item => ({
        key: item.link,
        label: item.label,
      }),
      fields: [
        {
          label: "Label",
          name: "label",
          component: "text",
        },
        {
          label: "Link",
          name: "link",
          component: "text",
        },
        {
          label: "Primary",
          name: "primary",
          component: "toggle",
        },
        {
          label: "Arrow",
          name: "arrow",
          component: "toggle",
        },
      ],
    },
    {
      label: "Overlay",
      name: "overlay",
      component: "toggle",
    },
    {
      label: "Large",
      name: "large",
      component: "toggle",
    },
    {
      label: "Overlap",
      name: "overlap",
      component: "toggle",
    },
    {
      label: "Parallax",
      name: "parallax",
      component: "toggle",
    },
  ],
}

const HeroWrapper = styled.div`
  position: relative;
  padding: 4rem 0;

  ${props =>
    props.large &&
    css`
      padding: 8rem 0;
    `}
`

const HeroBackground = styled.div`
  position: absolute !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-color: ${props => transparentize(0.1, props.theme.color.primary)};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 0;

  ${Overlay} {
    z-index: 1;
  }

  ${props =>
    props.overlap &&
    css`
      top: -4rem;
      bottom: -4rem;
    `}

  ${props =>
    props.parallax &&
    css`
      transform: translateZ(-1px) scale(2);
    `}
`

export const Headline = styled.h2`
  font-size: 2.6em;
  line-height: 1.2;
  color: ${props => props.theme.color.white};
  word-spacing: 1px;
  font-weight: 700;
  text-transform: none;
`

export const Textline = styled.p`
  font-size: 1.3rem;
  line-height: 1.2;
  color: ${props => props.theme.color.secondary};
  word-spacing: 1px;
  font-weight: 500;
  text-transform: none;
  padding-bottom: 0.3rem;
`

export const Actions = styled.div`
  padding-bottom: 0.5rem;
  > * {
    margin-right: 1rem;
  }
`

export const HeroImage = styled(BackgroundImage)`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`
