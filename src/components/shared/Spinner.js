import React from "react";
import styles from "../../css/shared/Spinner.module.scss";
import { PropTypes } from "prop-types";

// range helper: creates array [1...12]
const range = (start, stop, callback) => {
	return Array.from({ length: stop - start }, (_, i) => callback(i + start));
};

const Spinner = ({ customStyles = {}, color = "#ffffff" }) => {
	const dots = range(0, 8, (x) => x + 1);

	return (
		<div className={styles.Loader} style={customStyles}>
			{dots.map((dot, index) => (
				<div
					className={styles.Loader_dot}
					key={dot}
					style={{ backgroundColor: color }}
				/>
			))}
		</div>
	);
};
export default Spinner;

Spinner.propTypes = {
	customStyles: PropTypes.object,
};
