import React, {Component} from 'react';
import Cell from './cell';


class Board extends Component{

    state = {
        board: [],
        stepsCounter: 0,
        vailainsCaptued: 0
    }
    directions = {"up": 38, "down": 40, "left": 37, "right": 39};
    vilainsCells = []
    currentHeroCell = [];
    boardHeight = 0;
    boardWidth = 0;
    vilansCount = 0;

    startGame = () => {
        this.boardHeight = parseInt(prompt("Please enter the height of the grid", 7))
        this.boardWidth = parseInt(prompt("Please enter the width of the grid", 7))
        this.vilansCount = Math.floor(Math.sqrt(this.boardHeight*this.boardWidth))
        
        var newBoard = [];
        var cellsIds = []
        for(var i=0; i<this.boardHeight; i++){
            var row = [];
            for(var j=0; j<this.boardWidth; j++){
                row.push({id:i + "_" + j, row: i, column: j, hasVilain: false, containsHero: false})
                cellsIds.push(i + "_" + j)
            }
            newBoard.push(row)
            row.id = i;
        }

        this.vilainsCells = this.getRandomElementsFromArray(cellsIds, this.vilansCount+1)
        var modifiedCellIds;
        for(var i in this.vilainsCells){
            modifiedCellIds = this.vilainsCells[i].split("_")
            modifiedCellIds[0] = parseInt(modifiedCellIds[0])
            modifiedCellIds[1] = parseInt(modifiedCellIds[1])
            newBoard[modifiedCellIds[0]][modifiedCellIds[1]].hasVilain = true;
        }
        newBoard[parseInt(modifiedCellIds[0])][parseInt(modifiedCellIds[1])].hasVilain = false;
        newBoard[parseInt(modifiedCellIds[0])][parseInt(modifiedCellIds[1])].containsHero = true;
        this.currentHeroCell = modifiedCellIds;
        
        this.setState({board: newBoard})
        
        document.getElementById('startGameBtn').style['display'] = 'none'
        document.getElementsByClassName('board')[0].style['display'] = 'block'
        document.addEventListener("keydown", this.handleMovement, false);
    }

    getRandomElementsFromArray = (arr, n) => {
        var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");

        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

    handleMovement = (event) => {
        if(this.state.vailainsCaptued === this.vilansCount){
            alert("You have killed all the vilains using " + this.state.stepsCounter + " steps");
            return;
        }
        try{
            switch(event.keyCode){
                case this.directions.up:
                    this.state.board[this.currentHeroCell[0]][this.currentHeroCell[1]].containsHero = false;
                    this.state.board[this.currentHeroCell[0]-1][this.currentHeroCell[1]].containsHero = true;
                    if(this.state.board[this.currentHeroCell[0]-1][this.currentHeroCell[1]].hasVilain){
                        this.state.board[this.currentHeroCell[0]-1][this.currentHeroCell[1]].hasVilain = false;
                        this.state.vailainsCaptued++;
                    }
                    this.currentHeroCell[0] = this.currentHeroCell[0]-1
                    this.state.stepsCounter++;
                    this.setState({})
                    break;
                case this.directions.down:
                    this.state.board[this.currentHeroCell[0]][this.currentHeroCell[1]].containsHero = false;
                    this.state.board[this.currentHeroCell[0]+1][this.currentHeroCell[1]].containsHero = true;
                    if(this.state.board[this.currentHeroCell[0]+1][this.currentHeroCell[1]].hasVilain){
                        this.state.board[this.currentHeroCell[0]+1][this.currentHeroCell[1]].hasVilain = false;
                        this.state.vailainsCaptued++;
                    }
                    this.currentHeroCell[0] = this.currentHeroCell[0]+1
                    this.state.stepsCounter++;
                    this.setState({})
                    break;
                case this.directions.left:
                    this.state.board[this.currentHeroCell[0]][this.currentHeroCell[1]].containsHero = false;
                    this.state.board[this.currentHeroCell[0]][this.currentHeroCell[1]-1].containsHero = true;
                    if(this.state.board[this.currentHeroCell[0]][this.currentHeroCell[1]-1].hasVilain){
                        this.state.board[this.currentHeroCell[0]][this.currentHeroCell[1]-1].hasVilain = false;
                        this.state.vailainsCaptued++;
                    }
                    this.currentHeroCell[1] = this.currentHeroCell[1]-1
                    this.state.stepsCounter++;
                    this.setState({})
                    break;
                case this.directions.right:
                    this.state.board[this.currentHeroCell[0]][this.currentHeroCell[1]].containsHero = false;
                    this.state.board[this.currentHeroCell[0]][this.currentHeroCell[1]+1].containsHero = true;
                    if(this.state.board[this.currentHeroCell[0]][this.currentHeroCell[1]+1].hasVilain){
                        this.state.board[this.currentHeroCell[0]][this.currentHeroCell[1]+1].hasVilain = false;
                        this.state.vailainsCaptued++;
                    }
                    this.currentHeroCell[1] = this.currentHeroCell[1]+1
                    this.state.stepsCounter++;
                    this.setState({})
                    break;
                default:
                    break;
            }
        }catch(e){console.log(e)}
    }

    //TODO : refactor all the conditions into this function
    moveHero = (zeroOrOne, plusOrMinus)=>{
        this.state.board[this.currentHeroCell[0]][this.currentHeroCell[1]].containsHero = false;

        this.state.board[this.currentHeroCell[0] + (zeroOrOne ? plusOrMinus : 0)][this.currentHeroCell[1] + (!zeroOrOne ? plusOrMinus : 0)].containsHero = true;
        if(this.state.board[this.currentHeroCell[0] + (zeroOrOne ? plusOrMinus : 0)][this.currentHeroCell[1] + (!zeroOrOne ? plusOrMinus : 0)].hasVilain){
            this.state.board[this.currentHeroCell[0] + (zeroOrOne ? plusOrMinus : 0)][this.currentHeroCell[1] + (!zeroOrOne ? plusOrMinus : 0)].hasVilain = false;
            this.state.vailainsCaptued++;
        }
        this.currentHeroCell[(zeroOrOne ? 0 : 1)] = this.currentHeroCell[(zeroOrOne ? 0 : 1)]+plusOrMinus
        this.state.stepsCounter++;
        this.setState({})
    }

    render() {
        Object.freeze(this.directions)
        return (
            <div>
                <button onClick={this.startGame} id="startGameBtn" className="btn btn-success startGameButton">Start Game</button>
                <div className="board">
                    <div className="row">Steps : {this.state.stepsCounter}</div>
                    <div className="row">Vailains Captued : {this.state.vailainsCaptued}</div>
                    <div className="row">Remaining : {this.vilansCount - this.state.vailainsCaptued}</div>
                    {this.state.board.map((row) => {
                        return <div key={row.id} className='row'>{
                            row.map((cell)=>{
                                return <Cell key={cell.id} cell={cell}/>
                            })}
                        </div>
                    })}
                </div>
            </div>
            
        );
    }
}

export default Board;