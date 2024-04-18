import React from 'react'
import "./style.css"

function GridItem({backgroundColor,gridClickHandler}) {
  return (
    <div className='grid-item' onClick={gridClickHandler} style={{backgroundColor:backgroundColor}}></div>
  )
}

export default GridItem