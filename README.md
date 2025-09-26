# BeatQueue

## Specification Deliverable

### Elevator Pitch

BeatQueue is a web app designed to solve one of the biggest headaches for performing DJs: managing song requests. It replaces the chaos of people shouting requests or showing you their phones with a simple, live queue. As the DJ, you create a room, share a link, and the crowd can add and upvote songs from Apple Music and SoundCloud. This way, I can keep the flow of the set while also getting real-time feedback on what the crowd wants to hear.

### Design

**1. Login Screen**

![Login Screen Sketch](images/BeatQueue.png)

A minimal login/registration page. Just the app name, inputs for email/password, and a login button.

**2. Main Event Screen (DJ View)**

![Main Event Screen Sketch](images/c.png)

This is the main interface. It'll show the event name, a list of requested songs with their upvote counts, and controls for the DJ to manage the queue. The search bar will have a clear toggle to switch between searching Apple Music and SoundCloud.

### Key Features

- Standard, secure login and registration for DJs
- DJs can spin up a new event room with a unique, shareable URL
- The playlist is collaborative and updates for everyone instantly. No page refreshes needed
- Guests can pull tracks from Apple Music for official releases and SoundCloud for all the essential remixes and bootlegs
- A simple upvote feature lets the crowd push the most popular requests to the top
- The DJ has final say and can manage the queue by removing tracks or marking them as played

### Technologies

I am going to use the required technologies in the following ways:

- **HTML:** The structure will be built with semantic HTML5—one page for login and another for the main app interface.
- **CSS:** The styling will be a clean, responsive dark-mode UI built with standard CSS. It needs to look good on a laptop in a dark room and on a guest's phone. I'll add some simple transitions for a smoother feel.
- **React:** - Provides login, event dashboard, song queue, song, music search, and use of React for routing and components.
- **Service** - Backend service with endpoints for:
    - register
    - login
    - events
    - eventId
    - search
- **DB/Login** - Stores user data, events (each room's data and song queue). Credentials securely stored in database. Can't access unless authenticated.
- **WebSocket:** - When a user add or upvotes a song, it's broadcast to all other users.

## Deployment instructions

1. Clone this repository to your development environment.
1. Create a `dbConfig.json` file that contains the credentials to access your Mongo Database. This must be placed in the root of the project.

   ```json
   {
     "hostname": "YourMongoDbAccount.xiu1cqz.mongodb.net",
     "userName": "YourMongoDbUsername",
     "password": "YourMongoDbPassword"
   }
   ```

1. NPM install both the frontend and backend dependencies.

   ```sh
   npm install
   cd ui
   npm install
   cd ..
   ```

1. Use the `deploy.sh` shell script to deploy Voter to an EC2 instance. You will need the PEM key in order to run the script.

   ```sh
   ./deploy.sh -k ~/keys/yourkeyhere.pem -h yourdomainnamehere.click
   ```

1. Verify that the application is running on the domain.

   ```sh
   curl startup.cs260.click
   ```

1. **Optional**: If you want to modify the candidates that are currently voted on then alter `finalists.json`. The format of the file is as follows:

   ```json
   {
     "candidate": [{ "name": "Meg", "url": "https://game.com", "votes": 0, "id": "game" }]
   }
   ```

   You can update the candidates with the following endpoint call:

   ```sh
   curl -X PUT localhost:4000/api/candidate -H "Content-Type:application/json" --data '@finalists.json'
   ```
