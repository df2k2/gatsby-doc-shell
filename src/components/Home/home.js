import React from "react"

import Intro from "./intro"
import LinkCards from "./linkCards"

import { useData } from "../Data"

const getBackgroundImageLocation = images => {
  const defaultImage = images.find(element => element.base === "default-bg.jpg")
  const projectImage = images.find(element => element.base === "home-bg.jpg")

  return projectImage ? projectImage.publicURL : defaultImage.publicURL
}

const Home = props => {
  const { homeConfiguration, backgroundImages } = useData()

  const backgroundImageUrl = getBackgroundImageLocation(backgroundImages.nodes)

  const { title, subtitle, links } = homeConfiguration
  return (
    <>
      <Intro
        title={title}
        subtitle={subtitle}
        bgImageUrl={backgroundImageUrl}
      />
      <LinkCards cardsData={links} />
    </>
  )
}

export default Home
