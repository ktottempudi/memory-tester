//import logo from './logo.svg';
import './App.css';
import Level from './components/level';
import DisplayItem from './components/DisplayItem'
import React, { Component } from 'react';


class App extends Component{
	state = {
		level: 'null',
		guessing_time: 0,
		memorize_time: 5,
		randomNumber: [0],
		is_guessing: false,
		testArray: [1, 2, 3, 4, 5, 6] // For easy level
	};

	// Choosing the level and setting in the state
	chooseLevel = choice => {
		if (choice === 'Easy'){
			this.setState({level: 'Easy', guessing_time: 10})
		}

		else {
			let newArray = Array.from({length: 30}, (_, i) => i + 1); // Create new array of length 30
			this.setState({level: 'Hard', guessing_time: 30, testArray: newArray})
		}

	}

	// Countdown clock
	startTimer = () => {
		if (this.state.memorize_time > 0){
			this.timer = setInterval(this.countDown, 1000);
		}
		else{
			this.stopClock();
		}
	}

	countDown = () => {
		if (this.state.memorize_time > 0){
			this.setState({memorize_time: this.state.memorize_time - 1});
		}
		else{
			clearInterval(this.timer);
			this.stopClock();
		}

	}

	stopClock = () => {
		if (this.state.is_guessing === false){
			clearInterval(this.timer);
			this.setState({memorize_time: this.state.guessing_time, is_guessing: true});
			this.startTimer();
		}
		
	}

	// Random Number Generator
	generateRandomNumber = choice => {
		const min = 1;
		const max = 100;
		if (choice === 'Easy'){
			let newNumber = [Math.floor(Math.random() * (max - min) + 1)];
			this.setState({randomNumber: newNumber});
		}
		else{
			let tempNumArray = [];
			for (var i =0; i<5; i++){
				let addNum = Math.floor(Math.random() * (max - min) + 1);
				tempNumArray.push(addNum);
			}
			this.setState({randomNumber: tempNumArray});
		}
	}

	handelReset = () => {
		clearInterval(this.timer);
		this.setState({level: 'null', guessing_time: 0, memorize_time: 5, 
			is_guessing: false, randomNumber: [0],
			testArray: [1, 2, 3, 4, 5, 6]});
	}

	render(){
		return(
				<div className="Container">
				{ /* Switching between different pages */ }
					{ this.state.level === 'null' ? (
						<Level chooseLevel={this.chooseLevel} generateRandomNumber={this.generateRandomNumber}/> 
						// Passing Props down to child components
						) 
					: (<DisplayItem memorize_time={this.state.memorize_time} startTimer={this.startTimer}
						randomNumber={this.state.randomNumber} is_guessing={this.state.is_guessing}
						testArray={this.state.testArray} handelReset={this.handelReset}/>)
					}
				</div> 
			);
	}
}


export default App;
