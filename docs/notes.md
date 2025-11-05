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


**MIDTERM NOTES**

## 1. In the following code, what does the link element do?

The `<link>` element links external resources to an HTML document, most commonly used to connect CSS stylesheets. Example: `<link rel="stylesheet" href="styles.css">`. It's placed in the `<head>` section.

## 2. In the following code, what does a div tag do?

A `<div>` is a generic block-level container element used for grouping content. It takes full width, starts on a new line, and is used for structural organization and applying styles.

## 3. In the following code, what is the difference between the #title and .grid selector?

- **#title** (ID selector): Targets one unique element with `id="title"`. Higher specificity.
- **.grid** (class selector): Targets all elements with `class="grid"`. Can be applied to multiple elements, lower specificity.

## 4. In the following code, what is the difference between padding and margin?

- **Padding**: Space *inside* the element between content and border. Shows element's background color.
- **Margin**: Space *outside* the element beyond the border. Creates distance between elements.

## 5. Given this HTML and this CSS how will the images be displayed using flex?

With `display: flex` on a container, images default to displaying in a row, aligned at the start, and can shrink if needed. Exact behavior depends on additional flex properties (flex-direction, justify-content, align-items, etc.).

## 6. What does the following padding CSS do?

Padding creates space around an element's content inside its border. Syntax:
- `padding: 10px;` (all sides)
- `padding: 10px 20px;` (vertical horizontal)
- `padding: 10px 20px 15px 25px;` (top right bottom left - clockwise)

## 7. What does the following code using arrow syntax function declaration do?

Arrow functions provide concise syntax for writing functions:
```javascript
const myFunc = (a, b) => a + b;  // implicit return
const hello = () => "Hello";      // no parameters
```
Key difference: Arrow functions don't bind their own `this`.

## 8. What does the following code using map with an array output?

`map()` creates a new array by calling a function on each element:
```javascript
[1, 2, 3].map(x => x * 2)  // Output: [2, 4, 6]
```

## 9. What does the following code output using getElementByID and addEventListener?

`document.getElementById('id')` retrieves an element by ID. `addEventListener('event', callback)` attaches an event handler that executes when the event fires (e.g., 'click', 'submit').

## 10. What does the following line of Javascript do using a # selector?

`document.querySelector('#id')` selects the first element matching the CSS selector (# indicates ID). Returns the element or null if not found.

## 11. Which of the following are true? (mark all that are true about the DOM)

The DOM (Document Object Model):
- Is a tree-like representation of HTML document structure
- Is an API that allows JavaScript to manipulate HTML/CSS
- Is made up of nodes where each HTML element is a node
- Is dynamically updateable
- Is created by the browser when the page loads

## 12. By default, the HTML span element has a default CSS display property value of:

`inline` - The span element flows with text, doesn't start on a new line, and only takes up necessary width.

## 13. How would you use CSS to change all the div elements to have a background color of red?

```css
div {
  background-color: red;
}
```

## 14. How would you display an image with a hyperlink in HTML?

```html
<a href="destination-url">
  <img src="image-path.jpg" alt="Description">
</a>
```

## 15. In the CSS box model, what is the ordering of the box layers starting at the inside and working out?

1. **Content** (innermost)
2. **Padding**
3. **Border**
4. **Margin** (outermost)

## 16. Given the following HTML, what CSS would you use to set the text "trouble" to green and leave the "double" text unaffected?

Use a specific selector targeting the element containing "trouble", such as:
```css
#trouble { color: green; }
```
Or use a more specific descendant/child selector to target only the desired element.

## 17. What will the following code output when executed using a for loop and console.log?

The output depends on the specific loop conditions and what is logged. A typical for loop outputs each iteration's value to the console based on the loop counter and console.log statement.

## 18. How would you use JavaScript to select an element with the id of "byu" and change the text color of that element to green?

```javascript
document.getElementById('byu').style.color = 'green';
// OR
document.querySelector('#byu').style.color = 'green';
```

## 19. What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?

- Paragraph: `<p>`
- Ordered list: `<ol>`
- Unordered list: `<ul>`
- First level heading: `<h1>`
- Second level heading: `<h2>`
- Third level heading: `<h3>`

## 20. How do you declare the document type to be html?

```html
<!DOCTYPE html>
```
Place at the very beginning of the document, before the `<html>` tag.

## 21. What is valid javascript syntax for if, else, for, while, switch statements?

```javascript
// if/else
if (condition) { } else if (condition) { } else { }

// for
for (let i = 0; i < 5; i++) { }

// while
while (condition) { }

// switch
switch (expression) {
  case value1:
    break;
  case value2:
    break;
  default:
}
```

## 22. What is the correct syntax for creating a javascript object?

```javascript
const obj = {
  property1: "value",
  property2: 42,
  method: function() { }
};
// OR
const obj = new Object();
```

## 23. Is it possible to add new properties to javascript objects?

**Yes**. Use dot notation or bracket notation:
```javascript
obj.newProp = value;
obj['newProp'] = value;
```

## 24. If you want to include JavaScript on an HTML page, which tag do you use?

The `<script>` tag:
```html
<script src="file.js"></script>  <!-- External -->
<script>
  // Inline JavaScript
</script>
```

## 25. Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?

Use a selector targeting the specific element containing "animal":
```javascript
document.getElementById('animal').textContent = 'crow';
// OR
document.querySelector('#animal').textContent = 'crow';
```

## 26. Which of the following correctly describes JSON?

JSON (JavaScript Object Notation) is a lightweight, text-based data format for storing and exchanging data. It's language-independent, uses human-readable syntax with keys in double quotes, and supports strings, numbers, objects, arrays, booleans, and null.

## 27. What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo do?

- **chmod**: Change file permissions
- **pwd**: Print working directory
- **cd**: Change directory
- **ls**: List directory contents
- **vim**: Command-line text editor
- **nano**: Simple text editor
- **mkdir**: Make/create directory
- **mv**: Move or rename files
- **rm**: Remove/delete files
- **man**: Display manual/help for commands
- **ssh**: Secure Shell - remote connection
- **ps**: Show running processes
- **wget**: Download files from web
- **sudo**: Execute with superuser privileges

## 28. Which of the following console command creates a remote shell session?

**ssh** (Secure Shell)
```bash
ssh username@hostname
```

## 29. Which of the following is true when the -la parameter is specified for the ls console command?

`ls -la` combines:
- `-l`: Long format (permissions, owner, size, date)
- `-a`: All files including hidden files (starting with `.`)

Shows detailed information for all files including hidden ones.

## 30. Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?

- **Top-level domain (TLD)**: `.click`
- **Root domain**: `bozo.click`
- **Subdomain**: `banana.fruit` (or `banana` is subdomain of `fruit.bozo.click`)

Domain hierarchy reads right-to-left.

## 31. Is a web certificate is necessary to use HTTPS.

**Yes**. HTTPS requires an SSL/TLS certificate to encrypt communication and verify the server's identity.

## 32. Can a DNS A record can point to an IP address or another A record.

A DNS A record **only points to an IPv4 address**, not to another A record. A records map domain names directly to IP addresses. To point to another domain, use a CNAME record.

## 33. Port 443, 80, 22 is reserved for which protocol?

- **Port 443**: HTTPS (secure web traffic)
- **Port 80**: HTTP (unsecured web traffic)
- **Port 22**: SSH (Secure Shell)

## 34. What will the following code using Promises output when executed?

Promises execute asynchronously. They resolve or reject, with `.then()` handling success and `.catch()` handling errors. Output depends on the specific promise code, but promise callbacks execute in the microtask queue before regular tasks.

