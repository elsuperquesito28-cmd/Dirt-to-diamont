# Dirt to Diamond Backend

> **Status: In development**

The backend provides the API and server-side foundation for Dirt to Diamond. It is built with TypeScript, Bun, and Fastify, and is organized around game domains such as miners, tools, and games.

## Contents

- [Requirements](#requirements)
- [Install System Dependencies](#install-system-dependencies)
- [Install and Start the Backend](#install-and-start-the-backend)
- [Configuration](#configuration)
- [Technology Stack](#technology-stack)
- [Architecture and Project Structure](#architecture-and-project-structure)
- [Current API](#current-api)

## Requirements

- **Bun** is required to install the JavaScript/TypeScript dependencies and run the server.
- **PostgreSQL** is used by the database layer. The current placeholder API can start without a database connection; PostgreSQL is required when database-backed features are used.
- A terminal with internet access to download the tools and packages.

## Install System Dependencies

Install Bun first at the operating-system level. PostgreSQL is optional for starting the current placeholder server; install it now if you also intend to use the database-backed modules.

### Arch Linux

Install the basic tools required by the Bun installer:

```bash
sudo pacman -S --needed curl unzip
```

Install Bun using its official installer:

```bash
curl -fsSL https://bun.sh/install | bash
```

For database-backed features, install PostgreSQL and initialize its data directory once:

```bash
sudo pacman -S --needed postgresql
sudo -iu postgres initdb -D /var/lib/postgres/data
sudo systemctl enable --now postgresql
```

### Fedora

Install the basic tools required by the Bun installer:

```bash
sudo dnf install -y curl unzip
```

Install Bun using its official installer:

```bash
curl -fsSL https://bun.sh/install | bash
```

For database-backed features, install and initialize PostgreSQL:

```bash
sudo dnf install -y postgresql-server
sudo postgresql-setup --initdb
sudo systemctl enable --now postgresql
```

### Ubuntu

Install the basic tools required by the Bun installer:

```bash
sudo apt update
sudo apt install -y curl unzip
```

Install Bun using its official installer:

```bash
curl -fsSL https://bun.sh/install | bash
```

For database-backed features, install PostgreSQL:

```bash
sudo apt install -y postgresql
sudo systemctl enable --now postgresql
```

### Windows

Open PowerShell and install Bun using its official installer:

```powershell
irm bun.sh/install.ps1 | iex
```

Close and reopen the terminal if `bun` is not immediately available. For database-backed features, install PostgreSQL using the [official Windows installer](https://www.postgresql.org/download/windows/) and make sure its service is running.

Verify the Bun installation before continuing:

```sh
bun --version
```

## Install and Start the Backend

From the repository root, change into the backend directory, install the project dependencies, and start the server:

```sh
cd Backend
bun install
bun run start
```

The server listens on port `5000`. Keep the process running while using the API. No frontend is included in this backend directory.

## Configuration

The database connection is read from `DATABASE_URL`. An example is provided in [`.env.example`](.env.example). For database-backed features, create a local `.env` file from that example and update the URL to match your PostgreSQL username, password, host, port, and database name.

The current placeholder route does not access the database, so `DATABASE_URL` is not needed just to start the server. Do not use example credentials outside local development.

## Technology Stack

- **TypeScript** for the server and domain code
- **Bun** as the JavaScript runtime and package manager
- **Fastify** for the HTTP API
- **PostgreSQL** as the relational database
- **Drizzle ORM** for typed database access
- **Drizzle Kit** for schema and database tooling
- **OpenAPI and Swagger UI** for API documentation

## Architecture and Project Structure

The codebase uses a modular, domain-oriented structure inspired by Clean Architecture. Responsibilities are separated by game domain and technical role; this is an evolving design rather than a claim that every feature is fully implemented.

- `src/routes/` contains Fastify route modules and the HTTP entry points.
- `src/modules/game/`, `src/modules/miner/`, `src/modules/tool/`, and `src/modules/user/` group domain-specific code.
- Each domain can contain `domain/entity/` for business entities and `domain/errors/` for domain errors. The miner and tool areas also include handlers and factories where appropriate.
- `src/modules/shared/` contains shared entity contracts, dictionaries, and the master repository abstraction.
- `src/obejct_values/` contains strongly typed identifiers and other value objects used by the domain.
- `src/entities_base/` defines shared game data and configuration for minerals, miners, and tools.
- `src/database/database_schemas/` defines the PostgreSQL tables with Drizzle.
- `src/services/` contains shared result and error-handling utilities.
- `index.ts` configures Fastify, CORS, route autoloading, and the Swagger UI.

### Patterns in Use

- **Domain entities** keep game concepts and their state transitions together, for example miner upgrades and game progression.
- **Value objects** represent identifiers and domain-specific values with explicit types.
- **Factories** create configured domain objects, such as miners, while validating the requested type.
- **Handlers** coordinate application operations, such as selecting or adding miners and tools.
- **Repository pattern** centralizes database reads and writes behind `MasterRepository`, with Drizzle providing the persistence implementation.
- **Result-based error handling** uses typed success and failure results for operations that can fail.

The separation is intended to keep game rules independent from HTTP and persistence details, and to make the backend easier to extend as gameplay is implemented.

## Current API

- `GET /miner` returns placeholder sample data and is not connected to the miner repository yet.
- `/docs` serves the generated Swagger UI and API documentation.

The API and gameplay systems are still under active development; routes and domain modules may be incomplete or change as implementation continues.
