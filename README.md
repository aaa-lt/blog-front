# blog-front

## Project Overview

The frontend is a user interface built with TypeScript and Vue.js 3 to display the blog posts, series, and post details with support for Markdown rendering.

---

## Technologies

- **TypeScript**
- **Vue.js 3**
- **Vue Router**: For navigation between pages.
- **Markdown Plugins**: For rendering Markdown content, code highlighting, and diagrams.

---

## Features

1. **Front Page**

   - Display posts as cards.
   - Infinite scroll with lazy loading.
   - Posts sorted by creation date (newest first).

2. **Series Page**

   - List all blog series with descriptions and images.
   - Highlight recent posts within each series.

3. **Post Details Page**
   - Render Markdown-based content.
   - Support for:
     - Code syntax highlighting.
     - Diagrams using libraries like `mermaid`.

---

## Tasks

### Project Initialization

- [ ] Initialize Vue.js 3 project with TypeScript.
- [ ] Add Tailwind
- [ ] Install dependencies (`axios`, `Markdown-it`, `mermaid`).
- [ ] Set up basic routing structure (Home, Series, Post Details).

### Page Development

#### a. Front Page

- [ ] Design card-based layout for posts.
- [ ] Implement lazy-loading and infinite scrolling.
- [ ] Integrate API for fetching posts.

#### b. Series Page

- [ ] Display series cards (title, description, image).
- [ ] Integrate API to fetch all series.

#### c. Post Details Page

- [ ] Fetch post details using the API.
- [ ] Render Markdown content with syntax highlighting.
- [ ] Add diagram support using `mermaid`.

### API Integration

- [ ] Create a reusable API service using `axios`.
- [ ] Handle loading states and error messages for API requests.

### Deployment

- [ ] Configure `.env` for base API URL.
- [ ] Deploy to Railway

---

## License

This is a personal project and not intended for commercial use.
