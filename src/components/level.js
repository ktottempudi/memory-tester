import React, { Component } from 'react';

class Level extends Component {

	render() {
		return(
			<div className="Level">

				<h4 style={{padding: 10 + 'px'}}> Choose a level. Easy or Hard. The Easy level will be 
				give you 5 seconds to memorize a number. 
				You will then have 10 seconds to say what they are given a list. The Hard level 
				will give 5 seconds to memorize 5 numbers. You will have then have to say what 
				the numbers are given a list.</h4>

				<span style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

					<button style={{margin: 1 + 'em', padding: 1 + 'em'}} 
					onClick={() => {this.props.chooseLevel('Easy'); this.props.generateRandomNumber('Easy')}}>Easy</button>
					{/* Use Arrow function to avoid calling sayLevel function on render */} 

					<button style={{margin: 1 + 'em', padding: 1 + 'em'}} 
					onClick={() => {this.props.chooseLevel('Hard'); this.props.generateRandomNumber('Hard')}}>Hard</button>

				</span>

			</div>
			);
	}

}

export default Level;
