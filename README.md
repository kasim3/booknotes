# Book Notes Application

A web application for managing your book collection, ratings, and notes. This project is part of Angela Yu's Web Development Bootcamp course and is created for learning purposes.

## About This Project

This project is a full-stack web application built as part of my learning journey in Angela Yu's Web Development Bootcamp. It demonstrates the implementation of:

- RESTful API design
- Database operations with PostgreSQL
- Server-side rendering with EJS
- Frontend styling with CSS
- External API integration
- Responsive web design

## Features

- 📚 Add and manage your book collection
- ⭐ Rate books on a scale of 1-5
- 📝 Add detailed notes for each book
- 🔍 Search books using Open Library API
- 📅 Track when you read each book
- 🖼️ Automatic book cover image fetching
- 📱 Responsive design for all devices

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- EJS (Embedded JavaScript)
- Open Library API

## Credits

- Book cover images are fetched from [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers)
- Course instructor: [Angela Yu](https://www.udemy.com/user/4b4368a3-b0c0-4159-a6f3-8be36ddc411a/)
- Course: [The Complete 2024 Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a PostgreSQL database
4. Set up environment variables in `.env`:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/dbname
   PORT=3000
   ```
5. Run the application:
   ```bash
   npm start
   ```

## Database Schema

```sql
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(13),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    notes TEXT,
    read_date DATE
);
```

## Project Structure

```
booknotes/
├── views/
│   ├── partials/         # Reusable EJS components
│   ├── public/           # Static assets
│   └── *.ejs            # View templates
├── routes/
│   └── bookRoutes.js    # Route handlers
├── db.js                # Database connection
├── server.js            # Main application file
└── package.json         # Project dependencies
```

## Known Issues

1. Book cover image fetching:

   - Sometimes fails to load images from Open Library API
   - Fallback mechanism needs improvement
   - Image quality varies significantly

2. Search functionality:
   - Limited to 10 results
   - No pagination
   - Search results could be more relevant
   - No caching mechanism

## Future Upgrades

### High Priority

1. Image Handling

   - Implement local image storage
   - Add image compression
   - Better fallback mechanism for failed image loads
   - Add image upload option for custom covers

2. Search Improvements
   - Add pagination to search results
   - Implement search history
   - Add filters (by author, year, etc.)
   - Add local search for user's collection

### Medium Priority

1. User Features

   - User authentication
   - Personal book collections
   - Reading progress tracking
   - Book recommendations

2. UI/UX Enhancements
   - Dark mode support
   - Custom themes
   - Reading statistics dashboard
   - Export/Import functionality

### Low Priority

1. Additional Features
   - Book series management
   - Reading goals
   - Social sharing
   - Mobile app version

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Learning Outcomes

This project helped me learn:

- Building full-stack web applications
- Working with databases
- API integration
- Frontend development
- Responsive design
- Error handling
- Code organization
- Git version control
