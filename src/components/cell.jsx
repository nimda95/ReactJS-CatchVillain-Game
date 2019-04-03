import React, {Component} from 'react';


class Cell extends Component{

    state = { id: this.props.id, cellData: this.props.cell };

    render() {
        let className = "cell"
        className += (this.state.cellData.hasVilain) ? " hasVilain" : "";
        className += (this.state.cellData.containsHero) ? " containsHero" : "";
        return (
            <div className={className}></div>
        );
    }
}

export default Cell;