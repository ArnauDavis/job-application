// Function to format a date into 'YYYY-MM-DD' format
/*
const formatDate = (date) => {
    if (!date) return '' // Return empty string if no date is provided

    // Ensure the input is a valid date object (or a string that can be parsed into a date)
    const parsedDate = new Date(date)

    // Check if the date is valid
    if (isNaN(parsedDate)) {
        return '' // Return empty string if the date is invalid
    }

    // Extract year, month, and day from the date
    const year = parsedDate.getFullYear()
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0') // Add leading zero if needed
    const day = String(parsedDate.getDate()).padStart(2, '0') // Add leading zero if needed

    // Return the formatted date as 'YYYY-MM-DD'
    return `${year}-${month}-${day}`
}
*/
// helper function to format the dates
function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    return formattedDate;
}
module.exports = { formatDate }