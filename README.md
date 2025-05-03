# 🗺️ Event Map Demo

This is an interactive event map built as part of a product demo for Lynkr. It displays events in New York City and includes details like the event name, date, and time. Each marker shows a popup with basic event info, and the app pulls event data from a backend that uses Mapbox to geocode addresses.

---

## 💡 Why I Built This

At Lynkr, community is core, and I wanted to build something that visually reflects that connection in the real world. I chose to design an interactive event map that anchors in-person experiences to a shared physical space, giving users a way to discover what’s happening around them in real time. This map-based feature was inspired by the “Your Choice” prompt, but it naturally touches on several of the other challenge areas as well. For instance, I included branded events like Nike and Lululemon meetups to hint at how this map could support brand activations. With deeper integration, we could track attendance and post-event behavior to give sponsors insight without needing intrusive tracking.

The project also reinforces Lynkr’s focus on exclusive communities. Events are linked to specific groups with some private, like fraternity parties, and others public, laying the groundwork for a more curated and trust-based event discovery experience. Behind the scenes, the app also tracks attendance, group affiliations, and recurring participation. This is the foundation for useful analytics that would let student orgs and community leaders understand which events perform best and who’s most engaged, all with minimal input required from users.

In building this, I was reminded that great features don’t always need a complex interface—clarity and simplicity make for a smoother user experience. I also deepened my understanding of how product design and engineering must work hand-in-hand to bring something intuitive to life.

If I had more time, I would extend the map’s functionality with real-time updates, filtering by group or event type, RSVP check-ins, and lightweight post-event interactions to provide richer signals to brands and group organizers. I see this map not just as a visual layer, but as a foundation for meaningful in-person discovery and community-building within Lynkr’s mission.

---

## 🚀 How to Run the Demo

Even if you're not familiar with GitHub or technical tools, you can get this running in just a few steps.

### 1. Install Node.js
Go to [https://nodejs.org](https://nodejs.org) and download the **LTS version** for your system. Install it like any regular app.

### 2. Download This Project
Click the green "Code" button above and select **"Download ZIP"**. Unzip the folder somewhere on your computer.

### 3. Open Terminal in VS Code
Open the folder in [Visual Studio Code](https://code.visualstudio.com). Then:
- Go to `Terminal > New Terminal`
- In the terminal that opens at the bottom, run:

```
npm install
```

This installs everything the app needs.

### 4. Start the App
In the same terminal, run:

```
node server.js
```

You should see:
```
Server running at http://localhost:3000
```

### 5. Open the App
Open your browser and go to:
```
http://localhost:3000
```

You’ll see a map centered on NYU’s campus. Click a star to see each event’s name, date, and time.

---

## 🙋 Need Help?
If you get stuck, feel free to reach out. The setup is designed to be beginner-friendly and only takes a few minutes.

## 🧠 AI Prompting

The following prompts were used to guide and co-develop the application using AI assistance:

```
1. Is there an API that generates a map based on a location address?
2. Let's say I have a dictionary of events with corresponding address locations. I want to utilize a third party API to generate a map with these locations and make it interactive. Make an action plan.
3. Give me a Node.js template for beginning this task.
4. Attaches images of the app — adjust the UI to match the font, color, boxing, and feeling of the provided product images. Determine the font, size, and scale of the text and format the layout so it aligns accordingly. Make sure the project is cohesive with the product vision.
5. Write a README for this project.
```

These prompts informed the backend logic, frontend interface, and UI/UX direction of the project.

---
