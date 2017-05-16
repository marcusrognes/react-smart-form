import React, {Component} from 'react';
import PropTypes from 'prop-types';
import defaultFormInterface from './defaultFormInterface';

class Form extends Component {
	constructor(props) {
		super(props);

		this.state = {
			values: {}, // Key value store
			validMap: {} // Key value store
		};
	}

	getChildContext() {
		return {
			setValue: this.setValue,
		};
	}

	setValue(name, value) {
		let {values, validMap} = this.state;

		values[name] = value;
		validMap[name] = this.isValueValid(name, value);

		this.setState({
			values: values,
			validMap: validMap
		});
	}

	isValueValid(name, value) {
		let {schema} = this.props;

		if (!schema[name]) {
			return false;
		}

		if (schema[name].isRequired) {
			if (typeof value === 'string' && value === '') {
				return false;
			}

			if (typeof value === 'boolean' && value === false) {
				return false;
			}

			if (Array.isArray(value) && value.length === 0) {
				return false;
			}
		}

		if (schema[name].validate) {
			return schema[name].validate(name, value);
		}

		return true;
	}

	render() {
		return <div>
			<h2>
				Form
			</h2>
		</div>;
	}
}

Form.defaultProps = {
	schema: {},
	formInterface: defaultFormInterface
};

Form.childContextTypes = {
	setValues: PropTypes.func
};

export default Form;
