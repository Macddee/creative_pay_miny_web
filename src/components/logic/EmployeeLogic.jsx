import moment from 'moment';

export function convertFromJulianToDateTime(julian_time, required_format = 'YYYY-MM-DD') {
  if(julian_time === 0) return "";

  try {
    julian_time = parseFloat(julian_time) - 1; // Subtract 1 from the Julian date
    let julianEpoch = new Date(Date.UTC(1800, 0, 1));
    let delta = julian_time * 24 * 60 * 60 * 1000; // Convert Julian days to milliseconds
    let converted_date = new Date(julianEpoch.getTime() + delta);

    // Format the date
    let day = String(converted_date.getUTCDate()).padStart(2, '0');
    let month = String(converted_date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero indexed
    let year = converted_date.getUTCFullYear();
    return `${year}-${month}-${day}`; // Return the date in DD/MM/YYYY format
  } catch (e) {
    return console.log(e);
  }
}

export function convertFromDateTimeToJulian(dateString) {
  // if (!dateString) {
  //   dateString = moment().format('YYYY-MM-DD'); // Current date
  // }

  try {
    let date = new Date(dateString);
    let julianEpoch = new Date(Date.UTC(1800, 0, 1));
    let inputDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    let delta = inputDate - julianEpoch - 11 * 60 * 1000; // Subtract 11 minutes
    let julianDate = delta / (24 * 60 * 60 * 1000); // Convert milliseconds to Julian days
    console.log(Math.round(julianDate) + 1);
    return Math.round(julianDate) + 1; // Add 1 to the Julian date

  } catch (e) {
    console.log(e);
  }
}