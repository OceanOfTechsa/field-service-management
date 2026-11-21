/**
 * Formats a date like: "Friday, 20th February"
 */
export function FormatDate(date: Date = new Date()): string {
    const days: string[] = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const months: string[] = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const dayName: string = days[date.getDay()];
    const day: number = date.getDate();
    const monthName: string = months[date.getMonth()];

    const GetOrdinal = (n: number): string => {
        const s: string[] = ["th", "st", "nd", "rd"];
        const v: number = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return `${dayName}, ${GetOrdinal(day)} ${monthName}`;
}

export function isLate(date: Date = new Date()): boolean {
    const hour = date.getHours();
    return hour < 5 || hour >= 21;
}


/**
 * Returns a greeting based on the current time of day
 */
export function GetGreeting(date: Date = new Date()): string {
    const hour: number = date.getHours();

    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Up late";
}

export function GetWelcomeMessage(name?: string): string {
    const greeting: string = GetGreeting();
    const date: string = FormatDate();

    return name
        ? `${greeting}, ${name}. Today is ${date}.`
        : `${greeting}. Today is ${date}.`;
}