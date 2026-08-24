# Pulse Scene

**Pulse Scene** is a modern event discovery and booking platform built as a full-stack portfolio project.

The application focuses on a polished consumer-facing experience rather than a traditional admin dashboard. Users can discover events, filter and search the catalogue, save favorites, create bookings, manage digital tickets, cancel bookings, and leave reviews.

The project is intentionally structured as a real-world application with a separate Laravel REST API and Next.js frontend.

---

## Overview

Pulse Scene was designed around a simple idea:

> Discover something worth leaving the house for.

The product combines event discovery, booking, and digital ticket management in one interface with a strong visual identity and a clean full-stack architecture.

### Core experience

Users can:

- browse featured and curated events;
- explore events by category;
- search and filter the event catalogue;
- open detailed event pages;
- create an account and sign in;
- save and remove favorite events;
- book one or multiple tickets;
- receive a unique booking code;
- view a digital ticket with QR code;
- manage bookings from **My Tickets**;
- cancel active bookings;
- leave event reviews;
- view ratings and review counts.

Real payments are intentionally not included. The booking flow is fully functional, but checkout is simulated for portfolio purposes.

---

## Screens

Pulse Scene includes:

- Landing / discovery page
- Event catalogue
- Event details
- Login
- Registration
- Saved events
- Booking drawer
- Booking confirmation
- Digital ticket
- My Tickets
- Reviews
- Loading states
- Empty states
- Error states
- Custom 404 page

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- TanStack Query
- Zustand
- Lucide Icons
- QR code generation

### Backend

- Laravel 13
- PHP 8.3+
- Laravel Sanctum
- MySQL
- Laravel API Resources
- Form Requests
- Policies
- Eloquent ORM
- Factories and Seeders
- Feature Tests
- Laravel Pint

---

## Architecture

Pulse Scene uses a separated frontend/backend architecture.

```text
pulse/
├── backend/
└── frontend/
```

The frontend communicates with Laravel exclusively through the REST API.

```text
Browser
   │
   ▼
Next.js
   │
   ├── TanStack Query
   ├── Zustand
   ├── API clients
   └── DTO mappers
   │
   ▼
Laravel REST API
   │
   ├── Form Requests
   ├── Controllers
   ├── Services
   ├── Repository Interfaces
   ├── Eloquent Repositories
   ├── Policies
   └── API Resources
   │
   ▼
MySQL
```

### Backend responsibilities

Controllers are kept intentionally small.

Business and query logic is separated into dedicated layers where it adds value:

```text
Request
   ↓
Form Request
   ↓
Controller
   ↓
DTO
   ↓
Service
   ↓
Repository Interface
   ↓
Eloquent Repository
   ↓
Model / Database
   ↓
API Resource
```

The project uses repository interfaces to keep application services dependent on abstractions instead of concrete persistence implementations.

### Frontend state

Frontend state is split by responsibility.

**TanStack Query** manages server state:

- authenticated user;
- favorites;
- bookings;
- mutations;
- request states;
- cache invalidation;
- optimistic updates.

**Zustand** manages local UI state:

- booking drawer;
- selected ticket quantity;
- booking flow state.

Laravel remains the source of truth for persistent data.

---

## Main Domain Models

```text
User
├── bookings
├── favorites
└── reviews

Event
├── category
├── venue
├── organizer
├── images
├── bookings
├── favorites
└── reviews

Booking
├── user
└── event

Review
├── user
└── event

Favorite
├── user
└── event
```

Additional models:

- Category
- Venue
- Organizer
- EventImage

---

## Event Discovery

The public experience includes several curated sections:

- Featured Event
- Trending
- Categories
- This Weekend
- Popular in Chișinău

The homepage uses a dedicated discovery endpoint rather than making multiple independent requests for every section.

```http
GET /api/v1/home
```

Event catalogue:

```http
GET /api/v1/events
```

Supported filters include:

```text
search
category
location
date
price
per_page
```

Example:

```http
GET /api/v1/events?search=music&category=music&price=paid
```

---

## Authentication

Pulse Scene uses **Laravel Sanctum SPA authentication** with session cookies and CSRF protection.

Authentication endpoints:

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/me
```

Protected frontend actions automatically redirect guests to the login page and preserve the intended destination.

Example:

```text
Guest clicks Favorite
        ↓
/login?next=/events/electric-nights
        ↓
Sign in
        ↓
Return to event
```

---

## Favorites

Favorites are persisted in MySQL.

```http
GET    /api/v1/me/favorites
POST   /api/v1/events/{slug}/favorite
DELETE /api/v1/events/{slug}/favorite
```

The frontend uses optimistic updates through TanStack Query, so favorite state updates immediately and is synchronized with the backend afterward.

---

## Booking Flow

Bookings are fully persistent.

```http
POST   /api/v1/bookings
GET    /api/v1/me/bookings
GET    /api/v1/bookings/{booking}
DELETE /api/v1/bookings/{booking}
```

A booking stores a price snapshot so previously created tickets are not affected if an event price changes later.

```text
Booking
├── code
├── quantity
├── unit_price
├── total_price
├── currency
├── status
├── booked_at
└── cancelled_at
```

Booking codes are generated by the backend:

```text
PLS-XXXXXXXX
```

### Booking validation

The backend validates:

- authentication;
- ticket quantity;
- published event status;
- event availability;
- event capacity;
- booking ownership;
- cancellation permissions.

Capacity-sensitive booking creation runs inside a database transaction.

---

## Digital Tickets

Every successful booking produces a dedicated digital ticket.

Tickets include:

- event title;
- date;
- time;
- venue;
- admission type;
- quantity;
- booking code;
- QR code.

Example route:

```text
/tickets/PLS-XXXXXXXX
```

Cancelled bookings remain visible in booking history, but their tickets are marked inactive.

---

## Reviews

Authenticated users can review published events.

```http
POST /api/v1/events/{slug}/reviews
```

Review rules:

- rating must be between 1 and 5;
- review text is optional;
- one review per user per event;
- draft events cannot be reviewed.

Event detail responses expose:

- average rating;
- total review count;
- recent reviews.

---

## API Overview

### Public

```http
GET /api/health

GET /api/v1/home
GET /api/v1/categories
GET /api/v1/events
GET /api/v1/events/{slug}

POST /api/v1/auth/register
POST /api/v1/auth/login
```

### Authenticated

```http
POST /api/v1/auth/logout
GET  /api/v1/me

GET    /api/v1/me/favorites
POST   /api/v1/events/{slug}/favorite
DELETE /api/v1/events/{slug}/favorite

POST   /api/v1/bookings
GET    /api/v1/me/bookings
GET    /api/v1/bookings/{booking}
DELETE /api/v1/bookings/{booking}

POST /api/v1/events/{slug}/reviews
```

---

## Demo Data

Pulse Scene includes deterministic portfolio seed data instead of generic Faker content.

Example events include:

- Electric Nights
- Tech Future 2026
- Midnight Jazz Session
- Urban Food Weekend
- Digital Art Immersion
- Rooftop Cinema Night
- Sunset City Run
- Ceramic Sunday
- Symphony Under Stars
- Wine & Vinyl
- Makers Market
- Stand-up After Dark

The demo database also contains categories, organizers, venues, reviews, favorites, and bookings.

---

## Demo Account

A seeded demo account is available:

```text
Email:    demo@pulsescene.test
Password: pulse2026
```

The demo user includes saved events and booking history so the authenticated experience can be explored immediately.

> The account exists only in seeded demo environments.

---

# Local Development

## Requirements

Make sure the following are installed:

- PHP 8.3+
- Composer
- MySQL
- Node.js
- npm

---

## 1. Clone the repository

```bash
git clone <repository-url>
cd pulse-scene
```

---

## 2. Backend Setup

```bash
cd backend
composer install
```

Create the environment file:

```bash
cp .env.example .env
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

Configure MySQL in `backend/.env`:

```dotenv
APP_NAME="Pulse Scene"
APP_URL=http://localhost:8000

FRONTEND_URL=http://localhost:3000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pulse_scene
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:3000
```

Create the database:

```sql
CREATE DATABASE pulse_scene
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
```

Run migrations and seed demo data:

```bash
php artisan migrate --seed
```

Start Laravel:

```bash
php artisan serve --host=localhost --port=8000
```

Backend:

```text
http://localhost:8000
```

API:

```text
http://localhost:8000/api/v1
```

---

## 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create the local environment file:

```bash
cp .env.example .env.local
```

Configure:

```dotenv
API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

Start Next.js:

```bash
npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

## Important: Hostname Consistency

For Sanctum cookie authentication, use `localhost` consistently.

Recommended:

```text
Frontend: http://localhost:3000
Backend:  http://localhost:8000
```

Avoid mixing:

```text
localhost
127.0.0.1
```

during browser authentication testing.

---

# Reset Demo Database

To completely reset the local database and restore showcase data:

```bash
cd backend
php artisan migrate:fresh --seed
```

---

# Testing

## Backend

Run the Laravel test suite:

```bash
cd backend
php artisan test
```

Format PHP code with Laravel Pint:

```bash
./vendor/bin/pint
```

Recommended backend quality check:

```bash
./vendor/bin/pint
php artisan test
```

---

## Frontend

```bash
cd frontend
npm run lint
npm run build
```

---

## Full Quality Check

Before committing:

```bash
cd backend
./vendor/bin/pint
php artisan test

cd ../frontend
npm run lint
npm run build
```

---

# Environment Files

Local secrets are not committed.

Frontend tracked example:

```text
frontend/.env.example
```

Backend tracked example:

```text
backend/.env.example
```

Local environment files such as the following should remain ignored:

```text
backend/.env
frontend/.env.local
```

---

# Project Structure

```text
pulse/
├── backend/
│   ├── app/
│   │   ├── Contracts/
│   │   ├── DTOs/
│   │   ├── Enums/
│   │   ├── Exceptions/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   ├── Requests/
│   │   │   └── Resources/
│   │   ├── Models/
│   │   ├── Policies/
│   │   ├── Repositories/
│   │   └── Services/
│   │
│   ├── database/
│   │   ├── factories/
│   │   ├── migrations/
│   │   └── seeders/
│   │
│   ├── routes/
│   └── tests/
│
└── frontend/
    ├── public/
    │   └── images/
    │
    └── src/
        ├── app/
        ├── components/
        ├── features/
        │   ├── auth/
        │   ├── booking/
        │   ├── events/
        │   ├── favorites/
        │   └── reviews/
        │
        ├── lib/
        └── stores/
```

---

# Design Direction

Pulse Scene intentionally avoids the visual language of dashboards and generic SaaS products.

The interface is built around:

- editorial layouts;
- oversized typography;
- photography-first event cards;
- dark and light section contrast;
- restrained accent color;
- generous whitespace;
- cinematic event heroes;
- subtle hover states;
- responsive layouts;
- premium consumer-product styling.

The goal is for the application to feel closer to a modern ticketing or culture platform than an internal business tool.

---

# Scope

Pulse Scene is intentionally focused.

Included:

- public event discovery;
- authentication;
- search and filtering;
- favorites;
- bookings;
- digital tickets;
- cancellation;
- reviews;
- responsive UI;
- loading/error/empty states;
- seeded showcase data;
- automated backend tests.

Not included:

- Stripe or real payments;
- organizer dashboard;
- full admin panel;
- OAuth;
- chat;
- notifications;
- real-time infrastructure;
- social networking;
- analytics dashboard;
- mobile application.

This keeps the project complete and demonstrable without turning it into an unfinished startup prototype.

---

# Code Quality

The project prioritizes maintainability without unnecessary overengineering.

Backend conventions include:

- thin controllers;
- Form Requests;
- DTOs;
- service-layer orchestration;
- repository interfaces;
- Eloquent repository implementations;
- API Resources;
- policies;
- enums;
- domain exceptions;
- database transactions;
- typed relationships;
- factories;
- deterministic seeders;
- feature tests;
- Laravel Pint.

Frontend conventions include:

- reusable components;
- TypeScript domain types;
- transport types separated from UI models;
- dedicated API clients;
- mapper functions;
- TanStack Query for server state;
- Zustand for local UI state;
- route-level composition;
- loading/error/empty states;
- responsive components;
- no large monolithic page components.

---

# Portfolio Purpose

Pulse Scene was created as a commercial-looking full-stack portfolio project demonstrating:

- Laravel API architecture;
- Next.js application architecture;
- authentication;
- relational data modeling;
- transactional booking logic;
- REST API design;
- state management;
- modern frontend UX;
- responsive consumer-facing design;
- testing and code quality practices.

It is designed to be explored as a product, not as a tutorial application.

---

## License

This project is intended primarily for portfolio and demonstration purposes.
