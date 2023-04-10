const dynamictimestamp = (timestamp) => {
    // const timeAgoInSeconds = ((Date.now() - timestamp) / 1000) - (31536000 * 53 + (2592000 * 3));
    // const timeAgoInSeconds = ((Date.now() - timestamp) / 10000000000);
    const timeAgoInSeconds = ((Math.round(Date.now() / 1000) - timestamp));
    // const timeAgoInSeconds = (Date.now() - timestamp);
    console.log("datenow: ", Date.now())
    console.log("timestamp: ", timestamp)
    let timeOutput = "";
    if (timeAgoInSeconds < 60) {
        timeOutput = "Just Now";
    } else if (timeAgoInSeconds < 120) {
        timeOutput = "1 Minute Ago"
    } else if (timeAgoInSeconds < 3600) {
        timeOutput = Math.round(timeAgoInSeconds / 60) + " Minutes Ago"
    } else if (timeAgoInSeconds < 7200) {
        timeOutput = "1 Hour Ago"
    } else if (timeAgoInSeconds < 86400) {
        timeOutput = Math.round(timeAgoInSeconds / 3600) + " Hours Ago"
    } else if (timeAgoInSeconds < 172800) {
        timeOutput = "1 Day Ago"
    } else if (timeAgoInSeconds < 2592000) {
        timeOutput = Math.round(timeAgoInSeconds / 86400) + " Days Ago"
    } else if (timeAgoInSeconds < 5256006) {
        timeOutput = "1 Month Ago"
    } else if (timeAgoInSeconds < 31536000) {
        timeOutput = Math.round(timeAgoInSeconds / 2592000) + " Months Ago"
    } else if (timeAgoInSeconds < 63072000) {
        timeOutput = "1 Year Ago"
    } else {
        timeOutput = Math.round(timeAgoInSeconds / 31536000) + "Years Ago"
    }
    return timeOutput;
}

export default dynamictimestamp;