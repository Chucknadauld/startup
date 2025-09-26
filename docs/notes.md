Server URL: https://startup.beatqueue.click/

Server IP: http://44.208.222.219/

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
