import { useState } from "react";

// ✓ UPDATED AS OF 10/24/2020 at 9:26 AM
// - Enabled 'touched' support on ALL event handlers
// - Handles resetting 'touched' on: 'handleReset()' or 'isSubmitting' state

const initialState = {
	values: {},
	touched: {},
	isSubmitting: false,
};

export const useForm = ({ ...vals }) => {
	const [formState, setFormState] = useState({
		values: { ...vals },
		touched: {},
		isSubmitting: false,
	});

	const handleBlur = (e) => {
		e.persist();
		const { name } = e.target;
		const { touched } = formState;
		return setFormState({
			...formState,
			touched: { ...touched, [name]: true },
		});
	};

	// marks 'touched' true when focused
	const handleTouched = (e) => {
		const { name } = e.target;
		const { touched } = formState;

		setFormState({
			...formState,
			touched: { ...touched, [name]: true },
		});
	};

	const handleFocus = (inputRef) => {
		return inputRef.current.focus();
	};

	const handleReset = (e) => {
		if (!e || e === undefined)
			return console.warn(
				`The event arg ('e') is not defined, please pass it as an argument!`
			);
		e.persist();
		return setFormState({
			...formState,
			touched: {},
			values: { ...vals },
		});
	};

	const handleChange = (e) => {
		e.persist();
		const { name, value } = e.target;
		const { values, touched } = formState;

		return setFormState({
			...formState,
			values: { ...values, [name]: value },
			touched: { ...touched, [name]: true },
		});
	};

	const handleKeyDown = (e) => {
		const { name, value } = e.target;
		const { touched, values } = formState;

		return setFormState({
			...formState,
			values: { ...values, [name]: value },
			touched: { ...touched, [name]: true },
		});
	};

	const handleCheckbox = (e) => {
		e.persist();
		const { name, checked } = e.target;
		const { values, touched } = formState;

		return setFormState({
			...formState,
			values: { ...values, [name]: checked },
			touched: { ...touched, [name]: true },
		});
	};

	const handleSubmit = (e, callback = null) => {
		e.preventDefault();
		e.persist();
		setFormState({
			...formState,
			touched: {},
			isSubmitting: true,
		});
		// invoke optional callback, otherwise return
		if (!callback) return;
		return callback();
	};

	return {
		formState,
		setFormState,
		handleBlur,
		handleFocus,
		handleTouched,
		handleReset,
		handleCheckbox,
		handleChange,
		handleKeyDown,
		handleSubmit,
	};
};
