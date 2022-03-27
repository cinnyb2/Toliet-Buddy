# Toilet Buddy

Your best pal for finding a place to go when nature calls.

This repository contains the frontend and the backend for Toilet Buddy.

- Backend: FastAPI, Firebase (PyBase), Twilio, Python, Google Cloud Language, Javascript
- Frontend: HTML, CSS, Javascript, Bootstrap

## Web Hosting

The website can be visited here:

https://public-washroom-f51ff.web.app/map

## Project Setup (frontend)

After cloning the repository. cd into the frontend and enter the line below to host the site locally.

`npm run serve `

## Inspiration

In almost every big city, it can be almost impossible to find a public restroom, and god forbid if you do find one it is closed or not accessibility friendly. Public restrooms are sparse and difficult to locate, especially if you are not a local, and the bathroom experience can vary greatly depending on the cleanliness of the washroom. Store owners also regularly turn away people from using their store washroom unless they are a customer.

_Toilet buddy_ is here to help you eliminate the frustration of finding a washroom regardless if you are an international traveler or being a tourist in your own city and help you feel relieved when nature is calling.

_Toilet Buddy_ is a web service to help users find the closest restroom in big cities. This will not only increase the quality of life but also reduce the need to "use the street".

## What it does

- Shows the locations of public restrooms.
- Add new restroom location.
- Register for notification about nearest restrooms.
- Add reviews to a restroom.
- See all added reviews.

## How we built it

We sketch the app layout with Figma. The entire application is a plain Javascript frontend communication with the FastAPI Python backend. The frontend is hosted on Firebase while the backend is using GCP's Compute Engine, a basic VM.

### Backend

Hosted on GCP's Compute Engine, we are using FastAPI to communicate with our frontend to get bathroom information and post new information from users. The FastAPI talks to Firestore, retrieving information and passing it along. We also install PyBase, a python Firebase wrapper so we can work completely in python for the most part for the backend.

We also use Twilio to text users about nearby restrooms as well as a confirmation for when they add an entry to the site.

### Frontend

The frontend uses plain HTML/CSS/JavaScript as its core technologies, as well as Bootstrap5 for UI and GoogleMaps API for `/map`.

## Challenges we ran into

Because our project utilized a lot of Google services, we encountered issues trying to navigate around GCP/Firebase. Some include:

- an unformatted entry into Firebase's Firestore Database, broke our backend for around an hour
- unable to use GCP's Cloud Run due to issues with exposing ports and a Docker image
- a misconfiguration in the CE's firewall, couldn't access the server
- blocked communication between HTTPS Firebase and HTTP CE
- couldn't redeem MLH GCP credits
- properly removing API keys from GitHub and development
- constantly having Git merge conflicts
- everyone was using different bootstrap templates, so ensuring that all the pages are consistent was a challenge

## Accomplishments that we're proud of

Each of us was able to challenge ourselves by working with new tools and APIs. Moreover, we have been very supportive and helpful to each other by assisting them to the best of our knowledge. In the end, the team has made a functional product with most of the features we have envisioned from the start, and we bring home new knowledge, as well as new tools to explore later on. We knew we took on an ambitious project and we are really proud of what we were able to achieve in 24 hours.

## What we learned

We have integrated many APIs from various providers, which was a valuable learning experience. Solving conflicts helps us understand more thoroughly how things work behind the scene. In addition, as a team consisting of different skill sets and from different time zones, we learned how to communicate and teamwork effectively. We also learn how to help each other since each teammate had different varying of experience with certain tech stacks and applications. It was everyone's first experience working with Google Maps API, so getting all the additional APIs to work together on top of that was rather challenging.

## What's next for Toilet Buddy

Regarding the development of Toilet Buddy, we plan to expand our project to a larger scope to cover more places across the world. We hope to build a community that contributes back and makes the world a bit easier to navigate at least toilet-wise. We are also searching for new datasets which include more information, such as accessibility (wheelchair access) to implement a search and filter function that can be previewed on our Figma.

We have also implemented NLP sentiment analysis that we currently are not displaying, but we hope to use it to moderate reviews to give feedback to business owners. In the future, we would also like to create QR codes for each washroom and allow people to scan them to give feedback and notify the janitorial staff if it requires additional attention to cleanliness, facilities are not working, or lack of toilet paper.
