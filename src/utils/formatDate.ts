const dateFormat = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short' });
const timeFormat = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' });

export function displayDrawDate(date: Date) {
    const formattedDate = dateFormat.format(date);
    const formattedTime = timeFormat.format(date);
    return `${formattedDate} ${formattedTime}`;
}