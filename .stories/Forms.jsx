import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
import Form from "../src/Form/index";


const schema = {
	name: {
		type: 'text',
		label: 'Name',
		value: 'Test Testerson',
		isRequired: true
	},
	niceName: {
		type: 'text',
		label: 'Nice name',
		value: 'test-testerson',
		isRequired: false
	},
	email: {
		type: 'email',
		label: 'Email',
		value: 'test@testerson.com',
		isRequired: true
	},
	date: {
		type: 'date',
		label: 'Date',
		value: '',
		isRequired: true
	},
	time: {
		type: 'time',
		label: 'Time',
		value: '',
		isRequired: true
	},
	number: {
		type: 'number',
		label: 'Number',
		value: 0,
		isRequired: true
	},
	select: {
		type: 'select',
		label: 'Select',
		value: 'second',
		options: {
			first: 'First',
			second: 'Second',
			third: 'Third',
			fourth: 'Fourth',
			fifth: 'Fifth',
		},
		isRequired: true
	},
	description: {
		type: 'textarea',
		value: 'This is the description of test testerson,\nsome newline stuff',
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
				onSubmit={(value, validMap, isValid) => {
					console.log('Is submit valid', isValid);
				}}
				onlySubmitOnValid={false}
				schema={schema}
			/>
		</div>
	));

