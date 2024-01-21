import {
	format,
	compareAsc,
	compareDesc,
	addDays,
	subDays,
	formatDistance,
	formatDistanceToNow,
	formatDistanceStrict,
	isAfter,
	isBefore,
	isEqual,
	isExists,
	isFuture,
	isPast,
	min,
	max,
} from "date-fns";

// Formats:
// - "MM-dd-yyyy 'at' hh:mm a" => 12/25/2023 at 9:05 PM
const formatDate = (date: Date, dateFormat: string = "MM/dd/yyyy"): string => {
	return format(date, dateFormat);
};

// calculates time between two dates in words (12/22/2023-12/25/2023) => 'about 2 days'
const formatDistanceInWords = (baseDate: Date, toDate: Date): string => {
	const distance = formatDistance(toDate, baseDate);
	return distance;
};
// calculates time to now (12/22/2023-12/25/2023) => 'about 2 days ago'
const formatDistanceToNowInWords = (date: Date): string => {
	const distance = formatDistanceToNow(date, { addSuffix: true });
	return distance;
};
// calculates time between two dates in words (12/22/2023-12/25/2023) => '2 days'
// does NOT use approximate terms such as 'about', 'less than' etc
const formatDistanceInWordsStrict = (baseDate: Date, toDate: Date): string => {
	const distance = formatDistanceStrict(toDate, baseDate);
	return distance;
};

// defines 'order' argument as either ASC or DESC only
type Order = "ASC" | "DESC";

const sortDates = (dates: Date[] = [], order: Order = "ASC"): Date[] => {
	switch (order) {
		case "ASC": {
			const ascOrder = dates.sort(compareAsc);
			return ascOrder;
		}
		case "DESC": {
			const descOrder = dates.sort(compareDesc);
			return descOrder;
		}

		default:
			return dates;
	}
};

// returns latest (most recent) date from list
const getLatestDateFromList = (dates: Date[]): Date => {
	const latest = max(dates);
	return latest;
};
// returns latest (most recent) date from list
const getEarliestDateFromList = (dates: Date[]): Date => {
	const earliest = min(dates);
	return earliest;
};

// add x days to a date & return the date
const addDaysToDate = (date: Date, daysToAdd: number): Date => {
	const newDate = addDays(date, daysToAdd);
	return newDate;
};
// subtract x days from a date & return the date
const subDaysToDate = (date: Date, daysToSub: number): Date => {
	const newDate = subDays(date, daysToSub);
	return newDate;
};

// check if 'isThisAfter' comes after 'baseDate'
const isAfterDate = (baseDate: Date, isThisAfter: Date): boolean => {
	const wasAfter = isAfter(isThisAfter, baseDate);
	return wasAfter;
};
// check if 'isThisBefore' comes before 'baseDate'
const isBeforeDate = (baseDate: Date, isThisBefore: Date): boolean => {
	const wasBefore = isBefore(isThisBefore, baseDate);
	return wasBefore;
};

// are dates equal
const areDatesEqual = (date1: Date, date2: Date): boolean => {
	const equal = isEqual(date1, date2);
	return equal;
};

// checks if the year, month & day exists as a real date
const doesDateExist = (year: number, month: number, day: number): boolean => {
	const exists = isExists(year, month, day);
	return exists;
};

// is date in the future (to now)
const isFutureDate = (date: Date): boolean => {
	const future = isFuture(date);
	return future;
};
// is date in the past (to now)
const isPastDate = (date: Date): boolean => {
	const past = isPast(date);
	return past;
};

// date formatting utils
export {
	formatDate,
	formatDistanceToNowInWords,
	formatDistanceInWords,
	formatDistanceInWordsStrict,
};

// date calculation & sorting utils
export { sortDates, addDaysToDate, subDaysToDate };

// date comparators
export {
	isBeforeDate,
	isAfterDate,
	areDatesEqual,
	doesDateExist,
	isFutureDate,
	isPastDate,
	getEarliestDateFromList,
	getLatestDateFromList,
};
