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
			setValue: this.setValue.bind(this),
		};
	}

	setValue(name, value) {
		let {values, validMap} = this.state;
		let {onChange, onlyOnChangeOnValid} = this.props;

		values[name] = value;
		validMap[name] = this.isValueValid(name, value);

		this.setState({
			values: values,
			validMap: validMap
		}, () => {
			let isFullyValid = this.isFullyValid();

			if (onChange) {
				if (!isFullyValid && onlyOnChangeOnValid) {
					return;
				}

				onChange(values, validMap, isFullyValid);
			}
		});
	}

	isFullyValid() {
		let {validMap} = this.state;
		let isValid = true;

		Object.keys(validMap).forEach((key) => {
			if (!validMap[key]) {
				isValid = false;
			}
		});

		return isValid;
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

	onSubmit() {
		let {values, validMap} = this.state;
		let {onSubmit, onlySubmitOnValid} = this.props;

		let isFullyValid = this.isFullyValid();

		if (isFullyValid && onlySubmitOnValid) {
			onSubmit(values, validMap, isFullyValid);
		}
	}

	render() {
		let {schema, className, formInterface} = this.props;

		return <div className={className}>
			<form onSubmit={(e) => {
				e.preventDefault();
				this.onSubmit();
			}}>
				{schema && Object.keys(schema).map((schemaKey, index) => {
					let element = schema[schemaKey];

					if (!element.type) {
						throw new Error('Missing type from schema element in Form render');
					}

					let elementClassName = '';

					if (formInterface[element.type].className) {
						elementClassName += formInterface[element.type].className + ' ';
					}

					if (schema[schemaKey].className) {
						elementClassName += schema[schemaKey].className + ' ';
					}

					let {elementType, ...elementOptions} = Object.assign({}, formInterface[element.type], schema[schemaKey], {
						id: 'form-' + schemaKey + '-' + index,
						name: schemaKey,
						className: elementClassName,
						key: index
					});

					return React.createElement(
						elementType,
						elementOptions
					);
				})}
			</form>
		</div>;
	}
}

Form.defaultProps = {
	schema: {},
	formInterface: defaultFormInterface,
	className: 'form',
	elementClassName: 'form__element',
	onChange: (values, validMap, isValid) => {
		console.log(values, validMap, isValid);
	},
	onSubmit: (values, validMap, isValid) => {
		console.log(values, validMap, isValid);
	},
	onlySubmitOnValid: true,
	onlyOnChangeOnValid: false
};

Form.childContextTypes = {
	setValue: PropTypes.func
};

export default Form;
