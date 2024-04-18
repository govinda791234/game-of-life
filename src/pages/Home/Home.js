import React from 'react'
import { useContext } from 'react';
import "./style.css"
import { Context } from '../../Context';
import { Link } from 'react-router-dom';
function Home() {
    const { gridList } = useContext(Context);

  return (
    <div className='dasboard_container'>
        <div className='playground_container'>
            <div className='center-content flex-column'>
                {gridList.map((grid,index)=><Link to={"/playground?grid="+(index+1)} key={`Grid-${index}`} className='playground_buttons'>Grid {index+1}</Link>)}
                <button className='playground_buttons'>Add Grid</button>
            </div>
        </div>
    </div>
  )
}

export default Home