import React from "react";
import styles from "../../css/shared/TextInput.module.scss";
import { PropTypes } from "prop-types";

const TextInput = ({
	type = "text",
	label,
	name,
	id,
	placeholder,
	required = false,
	val,
	handleChange,
	handleBlur,
	handleFocus,
	handleReset,
	autoComplete = "off",
	addRequiredFlag = false,
	readOnly = false,
	isDisabled = false,
	inputMode = "text",
	customStyles = {},
	customWidth = {},
	inputRef = null,
}) => {
	const custom = {
		...customStyles,
	};

	return (
		<div className={styles.TextInput} style={customWidth}>
			<label htmlFor={id} className={styles.TextInput_label}>
				{label}
				{addRequiredFlag && (
					<div className={styles.TextInput_requiredFlag}>*</div>
				)}
			</label>
			<input
				type={type}
				name={name}
				id={id}
				className={styles.TextInput_input}
				placeholder={placeholder}
				required={required}
				value={val}
				onChange={handleChange}
				onBlur={handleBlur}
				onFocus={handleFocus}
				onReset={handleReset}
				style={customStyles}
				autoComplete={autoComplete}
				aria-autocomplete="none"
				readOnly={readOnly}
				disabled={isDisabled}
				inputMode={inputMode}
				ref={inputRef}
			/>
		</div>
	);
};

export default TextInput;

// #PropTypes
TextInput.defaultProps = {
	required: false,
	addRequiredFlag: false,
	customStyles: {},
};

TextInput.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	id: PropTypes.string,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
	val: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleFocus: PropTypes.func,
	handleBlur: PropTypes.func,
	handleReset: PropTypes.func,
	addRequiredFlag: PropTypes.bool,
	customStyles: PropTypes.object,
};
