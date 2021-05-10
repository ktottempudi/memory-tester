import React, { Component } from 'react';

class Dialog extends Component{

	//event handeler for dialog close
	dialogClose(){
		this.props.handelCloseDialog();
	}

	render() {
		let dialogStyles = {
			display: 'flex',
			flexDirection: 'column',
			padding: 1 + 'em',
			position: 'fixed',
			borderRadius: '10px',
			background: 'grey',
			top: '40%'
		};

		let buttonStyles = {
			cursor: 'pointer',
			alignSelf: 'flex-end',
			border: 'none',
			padding: 0

		};

		return(

			<div style={dialogStyles}>

				<button style={buttonStyles} onClick={() => this.dialogClose()}>x</button>

				<div> 
					{this.props.children} 
					{/*Have what is written in parent component be displayed*/} 
				</div>


			</div>

			);
	}
}

export default Dialog;