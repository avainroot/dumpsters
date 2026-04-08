# Dumpster Management Web App

This project is a web application for managing dumpster locations. Users can input information about dumpsters, including their address, coordinates (WGS 84), number of containers with volumes, associated buildings, and servicing company. The data is stored in a structured database to minimize duplicates. The application is divided into two main parts: `client` (frontend) and `server` (backend).

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup](#setup)
  - [Server](#server-setup)
  - [Client](#client-setup)
- [Usage](#usage)
- [Notes](#notes)

---

## Features

- Add dumpster sites with location, container info, and associated buildings.
- Manage multiple dumpster sites served by a single company.
- Structured database to avoid duplicate entries.
- Intuitive frontend interface using React and TailwindCSS.
- Local development using SQLite database.

---

## Tech Stack

**Frontend (`client`)**

- React 19
- Vite
- TypeScript
- TailwindCSS
- React Query
- Zod & React Hook Form

**Backend (`server`)**

- NestJS 11
- TypeScript
- Prisma ORM with SQLite
- Class-validator & Class-transformer
- RxJS
- Swagger for API documentation

---

## Project Structure

```
project-root/
│
├── client/          # Frontend (React + Vite)
├── server/          # Backend (NestJS + Prisma + SQLite)
```

---

## Setup

### Server Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Create a `.env` file with the following content:

```env
DATABASE_URL="file:./dumpsters.db"
```

3. Install dependencies:

```bash
npm install
```

4. Initialize Prisma:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

> This will create the SQLite database (`dumpsters.db`) and apply the initial schema.

5. Start the server in development mode:

```bash
npm run start:dev
```

Server API will be available at `http://localhost:3000`.

---

### Client Setup

1. Navigate to the client directory:

```bash
cd client
```

2. Create a `.env.local` file with your Yandex Maps API key:

```env
VITE_YAPI=YOUR_YANDEX_MAPS_API_KEY
```

3. Install dependencies:

```bash
npm install
```

4. Start the frontend in development mode:

```bash
npm run dev
```

Frontend will be available at `http://localhost:5173` (or the port Vite specifies).

---

## Usage

1. Open the frontend URL in your browser.
2. Use the intuitive form to add dumpster sites:
   - Address (text)
   - Coordinates (WGS 84)
   - Number of containers and their volume
   - Associated buildings
   - Servicing company
3. Submit the form — data will be saved to the SQLite database.
4. The backend API can be tested via Swagger at `http://localhost:3000/api`.

---

## Notes

- Multiple dumpster sites can be managed by the same company.
- Data structure minimizes duplication to maintain consistency.
- Local development uses SQLite, but the setup supports other databases with Prisma configuration.
- Make sure both `server` and `client` are running simultaneously for full functionality.

> ⚠️ This repository is a demonstration project.
> The code is protected by copyright. Any use without the author's permission is prohibited.
> Licensing inquiries: dev@rootflow.ru
