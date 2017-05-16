import React from 'react';
import FormItem from '../FormItem';
import './TextFieldStyle.scss';

class TextField extends FormItem {
	render() {
		let {label, value, id, name, type, className} = this.props;

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
				type={type}
				onChange={(e) => {
					this.setValue(e.target.value);
				}}
			/>
		</div>;
	}
}

export default TextField;
