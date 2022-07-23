// Week
export interface Schedule {
	monday: Monday;
	tuesday: Tuesday;
	wednesday: Wednesday;
	thursday: Thursday;
	friday: Friday;
	saturday: Saturday;
	sunday: Sunday;
}

// Days
export interface Monday {
	lunch?: Lunch;
	night?: Diner;
}
export interface Tuesday {
	lunch?: Lunch;
	night?: Diner;
}
export interface Wednesday {
	lunch?: Lunch;
	night?: Diner;
}
export interface Thursday {
	lunch?: Lunch;
	night?: Diner;
}
export interface Friday {
	lunch?: Lunch;
	night?: Diner;
}
export interface Saturday {
	lunch?: Lunch;
	night?: Diner;
}
export interface Sunday {
	lunch?: Lunch;
	night?: Diner;
}

// Hours
export interface Lunch {
	opened_at?: string;
	closed_at?: string;
}
export interface Diner {
	opened_at?: string;
	closed_at?: string;
}
