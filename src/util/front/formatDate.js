export const formatDateTime = () => {
    const parsedDate = new Date();

    const day = parsedDate.getDate().toString().padStart(2, '0');
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0'); // Month starts from 0
    const hour = parsedDate.getHours().toString().padStart(2, '0');
    const minutes = parsedDate.getMinutes().toString().padStart(2, '0');
    const year = parsedDate.getFullYear().toString()

    return `${hour}:${minutes} - ${day}.${month} - ${year}`;
};