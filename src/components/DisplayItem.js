import React, { Component } from 'react';
import Dialog from './Dialog';

class DisplayItem extends Component {

	// Start timer here to prevent it from skipping time intervals
	componentDidMount(){

		this.holdArray = this.props.testArray; // Temp Array to decide how many buttons to create
		
		// Randomly assigned the number using is supposed to guess to a random position
		if (this.props.randomNumber.length === 5){
			for (var j=0; j<5; j++){
				let position = Math.floor(Math.random() * (5 * j) + 1);
				this.holdArray[position] = this.props.randomNumber[j];
			}
		}

		else{
			let newNumber = Math.floor(Math.random() * (6 - 1) + 1);
			this.holdArray[newNumber] = this.props.randomNumber[0];
		}

		// Generating random numbers for the other buttons
		for (var i = 0; i < this.holdArray.length; i++) {

			let currentNum = this.holdArray[i];
			if (this.props.randomNumber.includes(currentNum)){

				if (i !== this.holdArray.findIndex(x => x === currentNum)){
					this.holdArray[i] = Math.floor(Math.random() * (100 - 1) + 1);
				}
			}

			else{
				let num = Math.floor(Math.random() * (100 - 1) + 1);
				if (this.props.randomNumber.includes(num)){
					this.holdArray[i] = num + 1;
				}
				else{
					this.holdArray[i] = num;
				}
			}

		}

		this.isOpen = false;
		this.isCorrectNum = false;

		this.props.startTimer();

	}

	sayNumber(){
		if (this.props.randomNumber.length === 5){
			return this.props.randomNumber[0] + " " + this.props.randomNumber[1] + " " + 
			this.props.randomNumber[2] + " " + this.props.randomNumber[3] + " " +
			this.props.randomNumber[4];
		}
		else{
			return this.props.randomNumber[0];
		}
	}


	handelOpenChange(){
		if (this.isOpen === true){
			this.isOpen = false;
		}
		else{
			this.isOpen = true;
		}
	}

	// Check to see if clicked number is right one 
	checkNum(number){
		if (this.props.randomNumber.includes(number)){
			this.isCorrectNum = true;
		}
		else{
			this.isCorrectNum = false;
		}
		this.isOpen = true;
	}

	// Say whether user guessed right or wrong
	sayResult(){
		if (this.isCorrectNum === true){
			return "Congragulations You chose the right number";
		}
		else{
			return "Sorry You chose the wrong number";
		}
	}


	eventReset(){
		this.props.handelReset();
	}

	handelCloseDialog(){
		this.handelOpenChange();
	}

	render() {
		let resetStyle = {
			padding: 1 + 'em',
			margin: 1 + 'em',
			alignSelf: 'flex-end'
		}

		let buttonContainerStyle = {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		}

		return(
			<div className="container"  style={{display: 'flex', flexDirection: 'column', 
				alignItems: 'center', justifyContent: 'center'}}>

				<span className="buttonContainer" style={buttonContainerStyle}>
					{/* Countdown Timer*/}
					<button style={{padding: 1 + 'em', margin: 1 + 'em'}} 
					> Time Left: {this.props.memorize_time} </button>

					{/* Reset Button */} 
					<button style={resetStyle} onClick={() => this.eventReset()}> Reset </button>

				</span>

				{ this.props.is_guessing === false ? (
				
				<h4 style={{textAlign: 'center'}}> The number is {this.sayNumber()} </h4>
				
				) : (<span> 
					{this.props.testArray.map((number, index) => {
						return <button key={index} style={{margin: 1 + 'em'}} 
						onClick={() => this.checkNum(this.holdArray[index])}> 
						{this.holdArray[index]} </button>
					})}
				</span>) }

				{ this.isOpen === true ? (<Dialog handelCloseDialog={this.handelCloseDialog.bind(this)}> 
				{this.sayResult()} </Dialog>) : (null) }	
			</div>

			);
	}
}

export default DisplayItem;