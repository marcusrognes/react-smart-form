import React, {Component} from 'react';
import TextField from "../Fields/TextField";
import TextareaField from "../Fields/TextareaField";

const defaultFormInterface = {
	text: {
		elementType: TextField,
		type: 'text'
	},
	textarea: {
		elementType: TextareaField,
	}
};

export default defaultFormInterface;
