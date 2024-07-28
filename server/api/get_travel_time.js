async function get_travel_time(origin, destination) {
  try {
    const apiKey = "AIzaSyDqCLoFetpgqicI9D6OkdXozzfQJhIGV64";
    const baseUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?";

    // Prepare the parameters for the API request
    const params = new URLSearchParams({
      origins: origin,
      destinations: destination,
      key: apiKey,
      departure_time: "now",
      traffic_model: "pessimistic",
      units: "imperial",
    });

    // Send the API request and get the response
    const url = baseUrl + params;
    const response = await fetch(url);
    const data = await response.json();

    // Extract relevant information from the response
    const status = data.status;
    if (status !== "OK") {
      return `Error: ${status}`;
    }
    var time = data.rows[0].elements[0].duration.text;
    var distance = data.rows[0].elements[0].distance.text.split(" ")[0];
    // Calculate toll using a hypothetical toll calculator service (example calculation)

    // Return the results
    if (distance.includes(",")) {
      distance = distance.replace(",", "");
    }
    var travelTime = 0;
    if (time.includes("day")) {
      time = time.split("day ")[1];
      travelTime += parseInt(time.split(" ")[0]) * 24 * 60;
    }
    const match = time.match(/(?:(\d+) hours?)?(?: ?(\d+) mins?)?/);
    if (match) {
      const hours = match[1] ? parseInt(match[1]) : 0;
      const minutes = match[2] ? parseInt(match[2]) : 0;
      travelTime += hours * 60 + minutes;
    }
    return { travelTime: travelTime, distance: distance };
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

module.exports = get_travel_time;
