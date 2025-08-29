# **App Name**: FreeMovies

## Core Features:

- Admin Authentication: Secure admin login with username and password validation. The logic uses a tool to evaluate entered credentials against stored values.
- Movie Upload: Admin uploads movie details (title, description, year, external link, thumbnail).
- Movie Modification: Admin edits or deletes existing movie entries.
- Movie Display: Display movie thumbnails, titles, descriptions, and release years on the homepage.
- External Link Redirect: Clicking a movie thumbnail opens the external movie link in a new tab.
- SEO Optimization: Automatic generation of SEO-friendly URLs, meta titles, meta descriptions, structured data (JSON-LD), sitemap.xml, and robots.txt. Also includes Open Graph and Twitter Card meta tags. The content of the title and description are created with the help of a tool that considers user's viewing history, and the general popularity.
- Error Handling: Display default placeholder image if movie thumbnail is broken; display 'Temporarily unavailable' message if the external link is invalid.

## Style Guidelines:

- Primary color: Deep purple (#673AB7) to convey a sense of sophistication and entertainment.
- Background color: Dark gray (#303030) for a modern, cinematic feel, providing good contrast with content.
- Accent color: Light blue (#2196F3) to highlight interactive elements and call-to-action buttons.
- Body font: 'Inter', sans-serif, to ensure a clean and modern look, as well as excellent readability, particularly on screens.
- Headline font: 'Space Grotesk', sans-serif, for headings to convey a modern and engaging style.
- Use flat, minimalist icons related to movies and user actions for a clean interface.
- Implement smooth transitions and loading animations for enhanced user experience.