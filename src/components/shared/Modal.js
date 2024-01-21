import React, { useRef, useEffect } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { PropTypes } from "prop-types";
import styles from "../../css/shared/Modal.module.scss";
import sprite from "../../assets/icons/buttons.svg";
import { useKeyboardShortcut } from "../../hooks/useKeyboardShortcut";

// ##TODOS:
// - Implement close via 'ESC' key ✓

const Modal = ({ title, closeModal, children }) => {
	const modalRef = useRef();
	const { isOutside } = useOutsideClick(modalRef);
	const userEscaped = useKeyboardShortcut(["Escape"]);
	useLockBodyScroll(); // run on mount ONLY

	// Closes modal when:
	// - clicking outside
	// - 'ESC' key is pressed
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		if (isOutside || userEscaped) {
			return closeModal();
		}
		return () => {
			isMounted = false;
		};
	}, [isOutside, closeModal, userEscaped]);
	return (
		<aside className={styles.Modal} ref={modalRef}>
			<section className={styles.Modal_top}>
				<h4 className={styles.Modal_top_title}>{title}</h4>
				<svg className={styles.Modal_top_icon} onClick={closeModal}>
					<use xlinkHref={`${sprite}#icon-clearclose`}></use>
				</svg>
			</section>
			<section className={styles.Modal_main}>{children}</section>
		</aside>
	);
};

export default Modal;

Modal.propTypes = {
	title: PropTypes.string,
	closeModal: PropTypes.func,
	children: PropTypes.element,
};
