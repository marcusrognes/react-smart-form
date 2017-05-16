import React from 'react';
import FormItem from '../FormItem';

class TextareaField extends FormItem {
	render() {
		let {label, value, id, name, className, ...other} = this.props;

		return <div
			className={className + ' textarea-field'}
		>
			<label
				htmlFor={id}
				className="textarea-field__label"
			>
				{label}
			</label>
			<textarea
				id={id}
				className="textarea-field__input"
				defaultValue={value}
				name={name}
				onChange={(e) => {
					this.setValue(e.target.value);
				}}
			/>
		</div>;
	}
}

export default TextareaField;
