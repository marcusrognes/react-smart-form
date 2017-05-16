import React from 'react';
import FormItem from '../FormItem';

class TextField extends FormItem {
	render() {
		let {label, defaultValue, id, name, className, ...other} = this.props;

		return <div
			className={className}
		>
			<label htmlFor={id}>
				{label}
			</label>
			<input
				id={id}
				defaultValue={defaultValue}
				name={name}
				onChange={(e) => {
					this.setValue(e.target.value);
				}}
			/>
		</div>;
	}
}

export default TextField;
