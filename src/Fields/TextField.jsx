import React from 'react';
import FormItem from '../FormItem';

class TextField extends FormItem {
	render() {
		let {label, value, id, name, className, ...other} = this.props;

		return <div
			className={className + ' text-field'}
		>
			<label
				className="text-field__label"
				htmlFor={id}
			>
				{label}
			</label>
			<input
				id={id}
				className="text-field__input"
				defaultValue={value}
				name={name}
				onChange={(e) => {
					this.setValue(e.target.value);
				}}
			/>
		</div>;
	}
}

export default TextField;
