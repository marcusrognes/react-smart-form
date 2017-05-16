import React, {Component} from 'react';
import TextField from "../Fields/TextField";
import TextareaField from "../Fields/TextareaField";
import SelectField from "../Fields/SelectField";

const defaultFormInterface = {
	text: {
		elementType: TextField,
		type: 'text'
	},
	email: {
		elementType: TextField,
		type: 'email',
		validate: (name, value) => {
			let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			return re.test(value);
		}
	},
	number: {
		elementType: TextField,
		type: 'number',
		validate: (name, value) => {
			return !isNaN(parseFloat(value)) && isFinite(value);
		}
	},
	select: {
		elementType: SelectField,
	},
	textarea: {
		elementType: TextareaField,
	}
};

export default defaultFormInterface;
