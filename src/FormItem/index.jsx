import React, {Component} from 'react';
import PropTypes from 'prop-types';

class FormItem extends Component {
	setValue(value) {
		let {name, onChange} = this.props;
		let {setValue} = this.context;

		setValue(name, value);

		if (onChange) {
			onChange(name, value);
		}
	}

	render() {
		return <div/>;
	}
}

FormItem.contextTypes = {
	setValue: PropTypes.func
};

export default FormItem;
