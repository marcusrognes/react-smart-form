import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
import Form from "../src/Form/index";


const schema = {
	name: {
		type: 'text',
		label: 'Name',
		isRequired: true
	},
	niceName: {
		type: 'text',
		label: 'Nice name',
		isRequired: false
	},
	description: {
		type: 'textarea',
		label: 'Description',
		isRequired: false
	}
};

storiesOf('Forms', module)
	.add('base', () => (
		<div>
			<h1>
				Forms base
			</h1>
			<Form
				onChange={(value, validMap, isValid) => {
					console.log(value, validMap, isValid);
				}}
				schema={schema}
			/>
		</div>
	));

