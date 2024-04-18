import React from 'react'
import "./style.css"
import Grid from '../../components/Grid/Grid'

function Dashboard() {

  return (
    <div className='dasboard_container'>
        playground
            <div className='playground_container'>
                <button className='playground_buttons'>grid name editor</button>
                <Grid />
                <button className='playground_buttons'>grid size customizer</button>
                <button className='playground_buttons'>cell visual customizer</button>
            </div>
    </div>
  )
}

export default Dashboard