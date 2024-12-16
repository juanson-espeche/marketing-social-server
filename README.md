# MARKETING-SOCIAL-SERVER

**MARKETING-SOCIAL-SERVER** is a RESTful API built using **Deno** and the
**Oak** framework. It provides core functionalities such as authentication,
course management, and PostgreSQL database interaction, designed for both
development and production environments.

---

## Technologies Used

- **[Deno](https://deno.land/):** Secure runtime for TypeScript and JavaScript.
- **[Oak](https://deno.land/x/oak):** Middleware framework inspired by Koa for
  building APIs.
- **[PostgreSQL](https://www.postgresql.org/):** Relational database management
  system.
- **[Docker](https://www.docker.com/):** Containerization for development and
  deployment.
- **[Dotenv](https://deno.land/x/dotenv):** Environment variable management.
- **[Bcrypt](https://deno.land/x/bcrypt):** Password hashing and validation.
- **[JWT](https://deno.land/x/djwt):** Authentication using JSON Web Tokens.

---

## Project Structure

```
marketing-social-server/
│
├── src/
│   ├── config/               # Database and environment configurations
│   ├── constants/            # Global constants
│   ├── controllers/          # Route controller logic
│   ├── interfaces/           # TypeScript interfaces
│   ├── middlewares/          # Middleware logic (authentication, validation)
│   ├── models/               # Database models
│   ├── repositories/         # Database interaction logic
│   ├── routes/               # API routes
│   ├── services/             # Business logic
│   ├── tests/                # Unit and integration tests
│   ├── utils/                # Utilities (error handler, JWT, hashing)
│   ├── app.ts                # Oak server configuration
│   ├── deps.ts               # Centralized dependency imports
│   └── main.ts               # Application entry point
│
├── .env                      # Environment variables
├── .gitignore                # Files and directories ignored by git
├── deno.json                 # Deno configuration for tasks and formatting
├── deno.lock                 # Dependency lock file
├── docker-compose.yml        # Docker Compose configuration
├── Dockerfile                # Dockerfile for containerization
└── README.md                 # Project documentation
```

---

## Prerequisites

Ensure the following tools are installed before proceeding:

- **Deno:** [Deno Installation](https://deno.land/#installation)
- **Docker and Docker Compose:**
  [Docker Installation](https://docs.docker.com/get-docker/)
- **PostgreSQL** (optional if not using Docker):
  [PostgreSQL Installation](https://www.postgresql.org/download/)

---

## Installation and Configuration

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/marketing-social-server.git
   cd marketing-social-server
   ```

2. **Create the `.env` File**:\
   Add your environment variables to the `.env` file in the root directory:
   ```plaintext
   APP_ENV=dev
   APP_PORT=8000
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=marketing_social
   DB_HOST=postgres
   DB_PORT=5432
   JWT_SECRET=your_secret_key
   ```

3. **Run the Project with Docker**:
   ```bash
   docker-compose up --build -d
   ```

4. **Verify Services**:
   - Backend: [http://localhost:8000](http://localhost:8000)
   - PostgreSQL: Running on `localhost:5432`.

---

## Usage

### API Endpoints

| Endpoint             | Method | Description          |
| -------------------- | ------ | -------------------- |
| `/api/courses`       | GET    | Retrieve all courses |
| `/api/courses`       | POST   | Create a new course  |
| `/api/auth/login`    | POST   | User login with JWT  |
| `/api/auth/register` | POST   | User registration    |

More endpoints and details will be documented with **Swagger** in the future.

---

## Development Commands

### Run the Application

- **Start the server**:
  ```bash
  deno run --allow-env --allow-net src/main.ts
  ```

- **Development mode (auto-reload)**:
  ```bash
  deno run --allow-env --allow-net --watch src/main.ts
  ```

### Run Tests

- **Execute unit and integration tests**:
  ```bash
  deno test --allow-net --allow-env --allow-read
  ```

- **Generate test coverage**:
  ```bash
  deno test --allow-net --allow-env --allow-read --coverage=coverage/
  ```

### Formatting and Linting

- **Check code format**:
  ```bash
  deno fmt --check
  ```

- **Run linter**:
  ```bash
  deno lint
  ```

---

## Deployment with Docker

To deploy the application using Docker:

1. Build and run the containers:
   ```bash
   docker-compose up --build -d
   ```

2. Check running containers:
   ```bash
   docker-compose ps
   ```

3. View logs:
   ```bash
   docker-compose logs backend
   ```

---

## Project Testing

1. **Run Tests**: Execute all tests:
   ```bash
   deno test --allow-net --allow-env --allow-read
   ```

2. **Generate Coverage**: Generate test coverage reports:
   ```bash
   deno test --coverage=coverage/
   ```

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push your branch and open a Pull Request.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE)
file for details.

---

## Contact

- **Author:** Juan Leonidas Espeche
- **Email:** email@example.com
- **GitHub:** [Your GitHub Profile](https://github.com/your-username)
- **LinkedIn:** [Your LinkedIn Profile](https://linkedin.com/in/your-profile)
