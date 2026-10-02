# MileHigh Signs (MERN)

## Requirements
Node 18+ and MongoDB running locally (or put an Atlas link in server/.env).

## Run
    npm run install-all
    npm run dev

Site: http://localhost:5173   API: http://localhost:5000

## Adding your pictures
Copy them into client/public/images/ using the names listed in client/src/data.js
(logo.png, hero-bg.jpg (main background), hero-2.jpg, hero-3.jpg (optional), about-1.jpg, service-signage.jpg, p-signage-1.jpg ...).
Missing pictures show a striped placeholder with the expected file name.
Edit phone, WhatsApp, email, location and social links at the top of data.js.

## Quote requests
Saved in MongoDB collection "quotes"; uploaded files land in server/uploads/.
