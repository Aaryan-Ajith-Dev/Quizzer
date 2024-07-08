# Just Another API

## Overview

This project is a RESTful API built with Node.js and Mongoose, demonstrating various skills that I have learnt. The API provides authentication, validation, error handling, and more.

## Table of Contents

- [Just Another API](#node-mongoose-api)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Configuration](#configuration)
  - [Usage](#usage)
    - [Running the Server](#running-the-server)

## Features

- User Authentication and Authorization (JWT)
- CRUD operations for various resources
- Input validation and sanitization
- Error handling
- Pagination and filtering
- Logging and monitoring

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm
- Mongoose

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Aaryan-Ajith-Dev/node-mongoose-api.git
    cd Just-Another-API
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

### Configuration

1. Create a `.env` file in the root directory and add the following environment variables:

    ```env
    PORT=3000
    DB=mongodb://localhost:27017/your-database
    SECRET_ACCESS_TOKEN=your_jwt_secret
    ```

## Usage

### Running the Server

Start the development server:

```bash
npm start
```
The server will be running at http://localhost:3000.
