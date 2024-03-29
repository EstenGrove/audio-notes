import React, { useEffect } from "react";
import styles from "../../css/shared/Button.module.scss";
import { PropTypes } from "prop-types";

const Button = ({
	isDisabled = false,
	handleClick,
	handleSubmit,
	children,
	customStyles,
	title,
	type = "button",
	parentRef = null,
	focusOnMount = false,
}) => {
	// apply focus onMount, if requested by parent
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		if (parentRef?.current && focusOnMount) {
			parentRef?.current?.focus();
		}

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<button
			ref={parentRef}
			type={type}
			className={styles.Button}
			disabled={isDisabled}
			onClick={handleClick}
			onSubmit={handleSubmit}
			style={customStyles}
			title={title}
		>
			{children}
		</button>
	);
};

export default Button;

Button.defaultProps = {
	isDisabled: false,
	type: "button",
};

Button.propTypes = {
	type: PropTypes.string,
	isDisabled: PropTypes.bool,
	handleClick: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func,
	children: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array,
		PropTypes.string,
	]),
	customStyles: PropTypes.object,
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
