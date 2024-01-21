import React from "react";
import styles from "../../css/shared/Navbar.module.scss";
import { PropTypes } from "prop-types";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const Navbar = () => {
	return (
		<nav className={styles.Navbar}>
			<ul className={styles.Navbar_list}>
				<li className={styles.Navbar_list_item}>
					<NavLink to="/">Home</NavLink>
				</li>
				<li className={styles.Navbar_list_item}>
					{/* <NavLink to="/">Home</NavLink> */}
				</li>
				<li className={styles.Navbar_list_item}>
					{/* <NavLink to="/">Home</NavLink> */}
				</li>
				<li className={styles.Navbar_list_item}>
					{/*  */}
					{/*  */}
				</li>
			</ul>
			{/*  */}
			{/*  */}
		</nav>
	);
};

export default Navbar;

Navbar.defaultProps = {};

Navbar.propTypes = {};
