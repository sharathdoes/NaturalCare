# NaturalCure - Natural Remedies Platform

A Next.js 14 application for sharing and discovering natural remedies.

## Features

- **User Authentication**: Sign in with Google (NextAuth.js).
- **Remedy Management**: Create, Read, Update, and Delete (CRUD) natural remedies.
- **Search & Filter**: Search remedies by keywords and filter by tags.
- **Interactions**: Like, dislike, and verify remedies.
- **Doctor Verification**: Verified doctors can review and verify remedies.
- **Responsive UI**: Built with Tailwind CSS and Shadcn UI.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (via NeonDB)
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS, Shadcn UI
- **Authentication**: NextAuth.js
- **State Management**: React Context, React Hooks

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/nextjstest.git
    cd nextjstest
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    DATABASE_URL=postgres://user:password@host:port/dbname
    NEXTAUTH_SECRET=your_nextauth_secret
    NEXTAUTH_URL=http://localhost:3000
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```

4.  **Run database migrations:**
    ```bash
    npm run db:push
    # or use drizzle kit directly if configured
    npx drizzle-kit push
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

6.  **Open the app:**
    Visit `http://localhost:3000` in your browser.

## API Documentation

The application provides a RESTful API for managing remedies.

### Remedies

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/remedies/all` | Get all remedies (supports filtering) | No |
| `GET` | `/api/remedies/[id]` | Get a specific remedy by ID | No |
| `POST` | `/api/remedies/create` | Create a new remedy | Yes |
| `PUT` | `/api/remedies/[id]` | Update an existing remedy | Yes (Owner) |
| `DELETE` | `/api/remedies/[id]` | Delete a remedy | Yes (Owner) |
| `POST` | `/api/remedies/search` | Search remedies | No |
| `POST` | `/api/remedies/likes_dislikes` | Like or dislike a remedy | Yes |
| `POST` | `/api/remedies/verify` | Verify a remedy (Doctors only) | Yes (Doctor) |

### API Usage Examples

**Get all remedies:**
```bash
curl -X POST http://localhost:3000/api/remedies/all -H "Content-Type: application/json" -d '{}'
```

**Get a single remedy:**
```bash
curl http://localhost:3000/api/remedies/123e4567-e89b-12d3-a456-426614174000
```

**Create a remedy:**
```bash
curl -X POST http://localhost:3000/api/remedies/create \
  -H "Content-Type: application/json" \
  -d '{"title": "Ginger Tea", "description": "Good for cold", "tags": ["Herbal"]}'
```

**Update a remedy:**
```bash
curl -X PUT http://localhost:3000/api/remedies/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -d '{"description": "Excellent for cold and flu"}'
```

**Delete a remedy:**
```bash
curl -X DELETE http://localhost:3000/api/remedies/123e4567-e89b-12d3-a456-426614174000
```
