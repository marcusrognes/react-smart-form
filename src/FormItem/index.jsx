import React, {Component} from 'react';

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
		return <div>
			<h3>
				FormItem
			</h3>
		</div>;
	}
}

export default FormItem;
