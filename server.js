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
  { name: "Concert at Central Park", address: "Central Park, New York, NY", date: "2025-05-10T19:30:00-04:00", privacy: "Public", group: "Music Lovers", recurring: false, signedUp: true, groupGoingCount: 5 },
  { name: "Tech Meetup", address: "500 5th Ave, New York, NY", date: "2025-05-12T18:00:00-04:00", privacy: "Private", group: "Class of 2026", recurring: true, signedUp: false, groupGoingCount: 3 },
  { name: "Gallery Opening", address: "11 W 53rd St, New York, NY", date: "2025-05-15T17:00:00-04:00", privacy: "Public", group: "Arts & Community Service", recurring: false, signedUp: false, groupGoingCount: 2 },
  { name: "Poetry Slam", address: "70 Washington Square S, New York, NY", date: "2025-05-16T19:00:00-04:00", privacy: "Public", group: "Creative Writers Club", recurring: false, signedUp: true, groupGoingCount: 4 },
  { name: "Branded Nike Run Club Meetup", address: "285 Lafayette St, New York, NY", date: "2025-05-17T08:00:00-04:00", privacy: "Public", group: "Nike NYC", recurring: true, signedUp: false, groupGoingCount: 15 },
  { name: "Film Screening Night", address: "721 Broadway, New York, NY", date: "2025-05-18T20:00:00-04:00", privacy: "Public", group: "NYU Cinema Club", recurring: false, signedUp: true, groupGoingCount: 6 },
  { name: "Career Panel at Stern", address: "44 W 4th St, New York, NY", date: "2025-05-19T17:30:00-04:00", privacy: "Private", group: "NYU Stern Network", recurring: false, signedUp: false, groupGoingCount: 1 },
  { name: "Yoga in the Park", address: "Washington Square Park, New York, NY", date: "2025-05-20T08:00:00-04:00", privacy: "Public", group: "Wellness Club", recurring: true, signedUp: true, groupGoingCount: 5 },
  { name: "Startup Demo Day", address: "60 Washington Square S, New York, NY", date: "2025-05-21T13:00:00-04:00", privacy: "Private", group: "Entrepreneurs Society", recurring: false, signedUp: false, groupGoingCount: 2 },
  { name: "Study Abroad Info Session", address: "7 E 12th St, New York, NY", date: "2025-05-22T16:00:00-04:00", privacy: "Public", group: "Global Programs", recurring: false, signedUp: true, groupGoingCount: 4 },
  { name: "Delta Chi Rooftop Party", address: "15 Waverly Pl, New York, NY", date: "2025-05-23T22:00:00-04:00", privacy: "Private", group: "Delta Chi", recurring: false, signedUp: true, groupGoingCount: 10 },
  { name: "Hackathon Kickoff", address: "6 MetroTech Center, Brooklyn, NY", date: "2025-05-24T10:00:00-04:00", privacy: "Private", group: "CS Club", recurring: false, signedUp: true, groupGoingCount: 7 },
  { name: "Volunteering Day", address: "75 Varick St, New York, NY", date: "2025-05-25T09:00:00-04:00", privacy: "Public", group: "Community Outreach", recurring: false, signedUp: false, groupGoingCount: 2 },
  { name: "Photography Walk", address: "Brooklyn Bridge Park, Brooklyn, NY", date: "2025-05-26T15:00:00-04:00", privacy: "Public", group: "Visual Arts Collective", recurring: false, signedUp: false, groupGoingCount: 4 },
  { name: "Language Exchange Meetup", address: "14 E 4th St, New York, NY", date: "2025-05-27T18:00:00-04:00", privacy: "Private", group: "International Students", recurring: true, signedUp: true, groupGoingCount: 6 },
  { name: "Board Game Night", address: "18 Waverly Pl, New York, NY", date: "2025-05-28T20:00:00-04:00", privacy: "Public", group: "Casual Hangouts", recurring: true, signedUp: true, groupGoingCount: 5 },
  { name: "Branded Lululemon Mindfulness Session", address: "520 Broadway, New York, NY", date: "2025-05-29T11:00:00-04:00", privacy: "Public", group: "Lululemon Community", recurring: false, signedUp: false, groupGoingCount: 20 },
  { name: "Sigma Alpha Epsilon Pre-Game", address: "13 University Pl, New York, NY", date: "2025-05-30T21:00:00-04:00", privacy: "Private", group: "SAE Fraternity", recurring: false, signedUp: true, groupGoingCount: 8 },
  { name: "AI Ethics Forum", address: "32 Waverly Pl, New York, NY", date: "2025-05-31T17:00:00-04:00", privacy: "Public", group: "Tech & Society", recurring: false, signedUp: false, groupGoingCount: 4 },
  { name: "Grad School Prep Workshop", address: "5-11 University Pl, New York, NY", date: "2025-06-01T11:00:00-04:00", privacy: "Private", group: "Academic Support", recurring: false, signedUp: false, groupGoingCount: 2 }
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
