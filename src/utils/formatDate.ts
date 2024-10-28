export function displayDrawDate(date: Date) {
    return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short',  hour: '2-digit', minute: '2-digit' }).format(date).replace(',', '');
}