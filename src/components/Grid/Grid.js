import React, { useContext, useEffect, useRef, useState } from 'react'
import './style.css'
import GridItem from '../GridItem/GridItem'
import { Link, useLocation } from 'react-router-dom'; 
import { Context } from '../../Context';

function Grid() {
    const location = useLocation();
    const gridNumber = new URLSearchParams(location.search).get('grid')-1;
    const { gridList } = useContext(Context);

    const [grid, setGrids] = useState([])
    const [playGame,setPlayGame]=useState(false)
    let rows=gridList[gridNumber].rows;
    let cols=gridList[gridNumber].cols;
    let gridContainer=useRef();


    useEffect(() => {
        renderNodes();
        // eslint-disable-next-line
    }, [grid])

    // use effect to call 2d array function
    useEffect(() => {
        let s=""
        for(let i=0;i<gridList[gridNumber].cols;i++){
            s+="auto ";
        }
        gridContainer.current.style=`grid-template-columns:${s}`;
        setGrids(create2DArray(rows,cols));
      }, [gridList,gridNumber,rows,cols])
    
    // function to create 2d array
    function create2DArray(m, n) {
        return Array.from({ length: m }, () => Array(n).fill(0));
    }
    const renderNodes = () => {
        const nodes = [];
        for (let i = 0; i < grid.length; i++) {
          for (let j = 0; j < grid[i].length; j++) {
            // Create a unique key for each node if needed
            const key = `node-${i}-${j}`;
            // Create React nodes for each item in the 2D array
            nodes.push(<GridItem key={key} gridClickHandler={()=>gridClickHandler(i,j)} backgroundColor={grid[i][j]===0?"#da0c0c":"#4cd14c"}/>);
          }
        }
        return nodes;
      };

    //function to change grid live state
    function gridClickHandler(i,j){
        let newArr=Array.from(grid);
        if(newArr[i][j]===0){
            newArr[i][j]=1;
        }
        else newArr[i][j]=0;

        setGrids(newArr);
    }

    //game of life algorithm 
    const gameOfLife = function(board) {
        rows=board.length;
        cols=board[0].length;
    
        for(let i=0;i<rows;i++){
            for(let j=0;j<cols;j++){
                let neighbors=countNeighbour(i,j,board);
                if(board[i][j]===1 && (neighbors===2 || neighbors===3)){
                    board[i][j]=3;
                }
                else if(neighbors===3){
                    board[i][j]=2;
                }
            }
        }
        // let countOne=0;
        
        for(let i=0;i<rows;i++){
            for(let j=0;j<cols;j++){
                if(board[i][j]===1){
                    board[i][j]=0;
                }
                else if(board[i][j]===2 || board[i][j]===3){
                    board[i][j]=1;
                }
            }
        }
        return board;
    };

    // function to count neighbour of a particular index
    function countNeighbour(r,c,board){
        let count=0;
        for(let i=r-1;i<r+2;i++){
            for(let j=c-1;j<c+2;j++){
                if((r===i && c===j) || i<0 || j<0 || i===rows|| j===cols){
                    continue;
                }
                if(board[i][j]===1 || board[i][j]===3){
                    count++;
                }
            }
        }
        return count;
    }

    useEffect(() => {
        let intervalId;
        if(playGame){
            intervalId= setInterval(() => {
                // Copy the previous grid
                const prevGrid = JSON.parse(JSON.stringify(grid));
                // Calculate the next generation
                const newArr = gameOfLife(Array.from(grid));
                // Check if the grid has changed
                if (isChanged(newArr, prevGrid)) {
                  // Update the state with the new grid
                  setGrids(newArr);
                } else {
                  // If the grid hasn't changed, end the game
                  alert("gameOver");
                  setPlayGame(false)
                }
              }, 500);
              return () => clearInterval(intervalId);

        } // Adjust the interval as needed
  
      // Clean up the interval when the component unmounts
        // eslint-disable-next-line
    }, [playGame]); 

    // function to start game
    function play(){
        let prevGrid=JSON.parse(JSON.stringify(grid));
        let newArr=gameOfLife(JSON.parse(JSON.stringify(grid)));
        if(isChanged(newArr,prevGrid)){
            setPlayGame(true)
        }
    }
    // function to stop game when finished
    function isChanged(newArr,prev){
        for(let i=0;i<rows;i++){
            for(let j=0;j<cols;j++){
                if(newArr[i][j]!==prev[i][j]){
                    return true;
                }
            }
        }
        return false
    }

    // function to reset game
    function reset(){
        setGrids(create2DArray(rows,cols));
        setPlayGame(false)
    }
    return (
    <>
        <div className='align-center'>
            <button className='playground_buttons' onClick={play}>play</button>
            <button className='playground_buttons' onClick={reset}>pause/reset</button>
            <Link className='playground_buttons' to="/">home button</Link>
        </div>
        <div className='grid' ref={gridContainer}>
            {renderNodes()}
        </div>
    </>
  )
}


export default Grid