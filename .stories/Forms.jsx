import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
import Form from "../src/Form/index";


const schema = {
	name: {
		type: 'text',
		isRequired: true
	}
};

storiesOf('Forms', module)
	.add('base', () => (
		<div>
			<h1>
				Forms base
			</h1>
			<Form
				schema={schema}
			/>
		</div>
	));

