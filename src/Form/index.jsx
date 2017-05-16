import React, {Component} from 'react';
import PropTypes from 'prop-types';
import defaultFormInterface from './defaultFormInterface';

class Form extends Component {
	constructor(props) {
		super(props);

		let {schema} = props;
		let values = {};
		let validMap = {};

		Object.keys(schema).forEach((schemaKey, index) => {
			values[schemaKey] = schema[schemaKey].value;
			validMap[schemaKey] = this.isValueValid(schemaKey, schema[schemaKey].value);
		});

		this.state = {
			values: values,
			validMap: validMap
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
		let {schema, formInterface} = this.props;

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

		if (formInterface[schema[name].type].validate) {
			return formInterface[schema[name].type].validate(name, value);
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

		if (!isFullyValid && onlySubmitOnValid) {
			return;
		}

		onSubmit(values, validMap, isFullyValid);
	}

	render() {
		let {schema, className, elementClassName, formInterface, displaySubmitButton, submitButtonLabel} = this.props;

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

					let currentElementClassName = '';

					if (formInterface[element.type].className) {
						currentElementClassName += formInterface[element.type].className + ' ';
					}

					if (schema[schemaKey].className) {
						currentElementClassName += schema[schemaKey].className + ' ';
					}

					if (elementClassName) {
						currentElementClassName += elementClassName + ' ';
					}

					let {elementType, ...elementOptions} = Object.assign({}, formInterface[element.type], schema[schemaKey], {
						id: 'form-' + schemaKey + '-' + index,
						name: schemaKey,
						className: currentElementClassName,
						key: index
					});

					return React.createElement(
						elementType,
						elementOptions
					);
				})}
				{displaySubmitButton && <input
					type="submit"
					value={submitButtonLabel}
				/>}
			</form>
		</div>;
	}
}

Form.defaultProps = {
	schema: {},
	displaySubmitButton: true,
	submitButtonLabel: 'Submit',
	formInterface: defaultFormInterface,
	className: 'form',
	elementClassName: 'form__element',
	onChange: (values, validMap, isValid) => {
	},
	onSubmit: (values, validMap, isValid) => {
	},
	onlySubmitOnValid: true,
	onlyOnChangeOnValid: false
};

Form.childContextTypes = {
	setValue: PropTypes.func
};

export default Form;
