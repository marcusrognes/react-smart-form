import React from 'react';
import FormItem from '../FormItem';
import './SelectFieldStyle.scss';

class SelectField extends FormItem {
	render() {
		let {label, value, id, name, className, options, ...other} = this.props;

		return <div
			className={className + ' select-field'}
		>
			<label
				className="select-field__label"
				htmlFor={id}
			>
				{label}
			</label>
			<select
				id={id}
				className="select-field__input"
				defaultValue={value}
				name={name}
				onChange={(e) => {
					this.setValue(e.target.value);
				}}
			>
				{Object.keys(options).map((optionKey, i) => <option
					key={i}
					value={optionKey}
				>
					{options[optionKey]}
				</option>)}
			</select>
		</div>;
	}
}

export default SelectField;
