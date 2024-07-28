const { add } = require("date-fns");

async function get_coordinates(location) {
    const apiKey = 'AIzaSyDqCLoFetpgqicI9D6OkdXozzfQJhIGV64'
    
    const address = location;
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.status === 'OK') {
        const result = data.results[0];
        const { lat, lng } = result.geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        console.error('Geocoding API request failed:', data.status);
        console.log(apiUrl);
        throw new Error('Geocoding API request failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
      return null;
    }
  }

module.exports = get_coordinates;