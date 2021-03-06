import React, { useState, createContext } from "react"

import { useData } from "../Data"
import getPageGroup from "../util/getPageGroup"

import defaultStyles from "./treeNavigation.module.css"
import { getPath } from "./util"

import "@spectrum-css/sidenav"
import Branch from "./branch"

const TreeNavigationContext = createContext()

const TreeNavigation = props => {
  const { slug } = props
  const { pageGroups } = useData()

  const group = getPageGroup(slug, pageGroups)

  const initialOpen = []

  if (group) {
    getPath(group, initialOpen, slug)
  }

  const [openBranches, setOpenBranches] = useState(initialOpen)
  const [fullyExpanded, setFullyExpanded] = useState(false)

  const expand = url => {
    setOpenBranches(openBranches.concat([url]))
  }

  const expandAll = () => {
    const newArray = []

    const nodeVisitor = node => {
      if (node) {
        newArray.push(node.url)

        if (node.pages) {
          node.pages.forEach(element => {
            nodeVisitor(element)
          })
        }
      }
    }

    nodeVisitor(group)

    setOpenBranches(newArray)
    setFullyExpanded(true)
  }

  const collapse = url => {
    setOpenBranches(openBranches.filter(entry => entry != url))
  }

  const collapseAll = () => {
    setOpenBranches([])
    setFullyExpanded(false)
  }

  const api = {
    openBranches: openBranches,
    fullyExpanded: fullyExpanded,
    expand: expand,
    expandAll: expandAll,
    collapse: collapse,
    collapseAll: collapseAll,
  }

  if (group) {
    return (
      <TreeNavigationContext.Provider value={api}>
        <div className={defaultStyles.root}>
          <Branch currentPage={slug} pages={group.pages} depth={0} />
        </div>
      </TreeNavigationContext.Provider>
    )
  }

  return null
}

export default TreeNavigation

export { TreeNavigationContext }
