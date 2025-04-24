// event_map_app/server.js
const express = require('express');
const axios   = require('axios');
const path    = require('path');
require('dotenv').config();

const app          = express();
const PORT         = process.env.PORT || 3000;
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

// Serve our static frontend
app.use(express.static(path.join(__dirname, 'public')));

// ------------------------------------------------------------------
// 1) Sample events array, now with signedUp & groupGoingCount
// ------------------------------------------------------------------
const events = [
  {
    name:             "Concert at Central Park",
    address:          "Central Park, New York, NY",
    date:             "2025-05-10T19:30:00-04:00",
    privacy:          "Public",
    group:            "Music Lovers",
    recurring:        false,
    signedUp:         true,      // you’re signed up
    groupGoingCount:  5          // 5 people from your groups
  },
  {
    name:             "Tech Meetup",
    address:          "500 5th Ave, New York, NY",
    date:             "2025-05-12T18:00:00-04:00",
    privacy:          "Private",
    group:            "Class of 2026",
    recurring:        true,
    signedUp:         false,
    groupGoingCount:  3
  },
  {
    name:             "Gallery Opening",
    address:          "11 W 53rd St, New York, NY",
    date:             "2025-05-15T17:00:00-04:00",
    privacy:          "Public",
    group:            "Arts & Community Service",
    recurring:        false,
    signedUp:         false,
    groupGoingCount:  2
  }
];

// ------------------------------------------------------------------
// 2) Geocode & merge lat/lon, then serve
// ------------------------------------------------------------------
app.get('/api/events', async (req, res) => {
  try {
    const results = await Promise.all(
      events.map(async evt => {
        const geoUrl = 
          `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
          `${encodeURIComponent(evt.address)}.json` +
          `?access_token=${MAPBOX_TOKEN}&limit=1`;

        const response = await axios.get(geoUrl);
        const [lon, lat] = response.data.features[0].geometry.coordinates;

        // spread in lat & lon
        return { ...evt, lat, lon };
      })
    );
    res.json(results);
  } catch (err) {
    console.error('Failed to geocode:', err.message);
    res.status(500).send('Error geocoding addresses');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
