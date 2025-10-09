Server URL: https://startup.beatqueue.click/

Server IP: http://44.208.222.219/

To deploy:
./scripts/deployFiles.sh -k ~/Downloads/production.pem -h startup.beatqueue.click -s startup

To use Prettier (cd project root):
Check what needs formatting:
prettier --check .
Format all files automatically:
prettier --write .
Format only specific file types:
prettier --write "_.html" "_.css"

## HTML Development Notes

Created 4 main pages:

- index.html - login page where DJs can sign in or register
- dashboard.html - main DJ control panel for creating/managing events
- event.html - DJ view of live events with song queue management
- join.html - guest page where people can join events and request songs

Progress:
-I made sure to use proper semantic HTML tags like header, nav, main, footer etc. Added navigation between all the pages so you can click around and see the full flow.
-I Put in a bunch of realistic content - DJ names, song titles, vote counts, user stats. Also added some stuff to show how the music search would work.
-I'm still using placeholder images for now but the structure is there for album covers and profile pics.
-The login forms are set up for both DJ registration and guest access. I also built out tables to show how the database info would be displayed like event stats, song queues, voting data.
-I added sections for live updates and a chat to show where the WebSocket stuff will go later. It should be easy to connect the real-time features once I get to that part.

## CSS Development Notes

Styling Progress:

- Created a dark theme with purple accent colors that works well for DJ/music apps
- Used CSS Grid and Flexbox for responsive layouts that work on all screen sizes
- Added hover effects and transitions for better user experience
- Styled all components: event cards, song queues, search results, tables, forms
- Implemented mobile-first responsive design with breakpoints at 768px and 480px
- Used CSS custom properties and consistent spacing throughout
- Made sure images and buttons are properly sized and accessible


## React Phase 1 Development Notes

### Setup & Structure
- Installed Vite, React, React Router, and React Bootstrap with npm
- Reorganized: moved assets to public/, created src/ with component folders
- Renamed main.css to app.css, changed body selector to .body

### Converting to React
- Key changes: `class` → `className`, `for` → `htmlFor`
- `value` → `defaultValue`, `checked` → `defaultChecked` for uncontrolled inputs
- Self-closing tags need slash: `<img />`
- index.html just has a root div, index.jsx renders App into it

### React Router
- BrowserRouter wraps everything
- Routes define URL patterns, added NotFound for 404s

### Issues Fixed
- Forgot to change body to .body in CSS first time
- Image paths needed to start from public/: `/placeholder.png`
- Had to update Caddyfile for static file serving

### Deployment
- deployReact.sh runs `npm run build` then uploads dist/ folder
- Vite bundles and optimizes everything automatically
- Way faster than manual deployment

### What's Next (Phase 2)
- Add useState hooks 
- Connect forms and buttons to actual functions
- Backend API integration
- WebSocket for real-time updates