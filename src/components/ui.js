import React from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"
import { mix, tint, shade, transparentize } from "polished"

export const Wrapper = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    padding: 0 2rem;
  }
`

export const Button = styled.button`
  display: inline-block;
  position: relative;
  line-height: 2rem;
  font-size: 1rem;
  padding: 0 1rem;
  text-align: center;
  min-width: 8rem;
  border-radius: ${props => props.theme.radius.small};
  border: none;
  transition: all 150ms ${props => props.theme.easing};
  color: ${props => props.theme.color.white};
  background-color: ${props => transparentize(0.8, props.theme.color.black)};
  border-bottom: 3px solid
    ${props => transparentize(0.8, props.theme.color.black)};
  cursor: pointer;
  z-index: 1;
  box-shadow: 0 3px 4px ${props => transparentize(0.8, props.theme.color.black)};
  text-shadow: 0 1px 1px
    ${props => transparentize(0.5, props.theme.color.black)};

  &:after,
  &:before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: ${props => props.theme.radius.small}
      ${props => props.theme.radius.small} 0 0;
    transition: all 150ms ${props => props.theme.easing};
  }

  &:after {
    box-shadow: inset 0 0 3px
      ${props => transparentize(0.6, props.theme.color.black)};
  }

  &:before {
    background-color: ${props => props.theme.color.foreground};
    opacity: 0;
  }

  &:hover {
    &:before {
      opacity: 0.15;
    }
  }

  &:active {
    &:before {
      opacity: 0;
    }
    &:after {
      opacity: 0;
    }
    box-shadow: none;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.color.secondary};
  }

  ${p =>
    p.primary &&
    css`
      background-color: ${props => props.theme.color.primary};
      color: ${props => props.theme.color.white};
    `};
`

export const Paper = styled.div`
  background-color: ${props => props.theme.color.background};
  border: 1px solid
    ${props =>
      mix(0.93, props.theme.color.background, props.theme.color.foreground)};
  padding: 2rem 2rem;
  border-radius: ${props => props.theme.radius.small};

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    padding: 2.5rem 3rem;
  }

  @media (min-width: ${props => props.theme.breakpoints.large}) {
    padding: 3rem 4rem;
  }
`

export const Banner = styled.div`
  position: relative;
  border-radius: ${props => props.theme.radius.small}
    ${props => props.theme.radius.small} 0 0;
  overflow: visible;
  flex: 0 0 auto !important;
  padding: 2rem 2rem;

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    padding: 2.5rem 3rem;
  }

  @media (min-width: ${props => props.theme.breakpoints.large}) {
    padding: 3rem 4rem;
  }

  > * {
    margin: 0;
  }

  & + ${Paper} {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  ${p =>
    p.big &&
    css`
      padding: 6rem 2rem 2rem 2rem;

      @media (min-width: ${props => props.theme.breakpoints.small}) {
        padding: 7rem 3rem 2.5rem 3rem;
      }

      @media (min-width: ${props => props.theme.breakpoints.large}) {
        padding: 8rem 4rem 3rem 4rem;
      }
    `};

  ${p =>
    p.underline &&
    css`
      &:after {
        content: "";
        display: block;
        position: absolute;
        bottom: -1px;
        width: 35%;
        min-width: 10rem;
        max-width: 100%;
        height: 2px;
        background-color: ${props => props.theme.color.secondary};
      }
    `};
`

export const BannerText = styled.div`
  h1,
  h2,
  h3 {
    color: ${props => props.theme.color.primary};
  }
  * {
    position: relative;
    display: inline-block;
    &:before {
      content: "";
      display: block;
      position: absolute;
      top: -0.5rem;
      left: -0.75rem;
      right: -0.75rem;
      bottom: -0.5rem;
      background-color: ${props => props.theme.color.background};
      z-index: -1;
    }
  }
`

export const BannerImage = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: -1;

  img {
    margin: 0;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    object-fit: cover;
  }
`
