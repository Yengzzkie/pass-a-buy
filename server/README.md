# Pass-A-Buy

## Table of Contents

- [Overview](#overview)
- [Project Requirements](#project-requirements)
- [Features](#features)
- [Built With](#built-with)
- [Getting Started](#getting-started)

## Overview

A community-driven marketplace-like app designed to connect people looking to buy items from specific locations with travelers willing to bring those items back. 

## Features

- Users can post requests for items with details like location, dates, capacity, and fee.
- Travelers can browse requests, accept jobs, and earn fees for fulfilling them.
- Email verification is implemented to ensure authentic user base.
- This project leverages PostgreSQL, Express, and Prisma on the backend and provides a streamlined, safe way for users to handle transactions and leave reviews, ensuring trust within the platform.
- Admin route will also be added for community control

## Built With

- List the main technologies or libraries used, such as:
  - React
  - Zustand for global state management
  - Tailwind CSS
  - JavaScript
  - Postgres / Prisma ORM
  - Node / Express

## Getting Started
- Make sure you have [Postgres](https://www.postgresql.org/) installed and setup in your machine.

### Installation
1. Clone the repo
   ```bash
   git clone https://github.com/yengzzkie/pass-a-buy.git

2. Navigate to the project folder
   ```bash
   cd pass-a-buy

3. Install dependencies
   ```bash
   npm install

4. Run the server and client
   ```bash
   npm run dev

5. Server will be running in http://localhost:8080 and client server will be running on http://localhost:5173
