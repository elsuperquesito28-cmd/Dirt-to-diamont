# Dirt to Diamond

> **Status: In development**

Dirt to Diamond is a mining-themed incremental game inspired by clicker games such as Cookie Clicker. Build a mining operation from the ground up: gather minerals, recruit miners, improve their equipment, and expand the places where they live and work.

## Contents

- [Game Overview](#game-overview)
- [Core Game Systems](#core-game-systems)
- [Goal](#goal)
- [Project Status](#project-status)
- [Technology Stack](#technology-stack)
- [Dependencies](#dependencies)

## Game Overview

The game combines active clicking with incremental progression. Players earn coins and grow their mining operation over time, using miners and tools to improve the collection of valuable resources. The long-term vision is to balance investment in people, equipment, and buildings to make the operation more productive.

## Core Game Systems

### Miners

Miners are the workforce at the heart of the operation. The current game design defines three miner types: **Beginner**, **Intermediate**, and **Expert**. Miners have different progression limits and capacities, and can be upgraded as the operation grows.

### Tools

Tools support mineral collection and shape how efficiently different resources can be gathered. The current design includes a **Pick**, a **Drill**, and a **Big Drill**, with upgrade and mineral-probability values defined for each.

### Buildings

Buildings are intended to provide housing for miners. Expanding the available accommodation will let players support a larger workforce and continue growing their mining operation. The building system is part of the planned gameplay and has not yet been implemented in the current backend.

### Minerals and Economy

The game data currently includes **Coal**, **Copper**, **Iron**, **Diamond**, **Ruby**, **Terracotta**, and **Emerald**. Coins provide the basis for purchasing and improving parts of the operation, while clicking is also represented in the game model.

## Goal

Grow a small mining operation into a thriving one. Recruit and develop miners, invest in better tools, and build housing to accommodate more workers. The broader goal is to increase mineral production and build wealth through steady, incremental progress.

## Project Status

This project is actively being developed. The current repository focuses on the backend foundation, including game, miner, tool, and user domain models; PostgreSQL schema definitions; and a Fastify API. The miner and tool configurations establish core game data, while gameplay features such as the building system and complete mining loop remain under development. The current `/miner` route is a placeholder, so the systems described above should not be read as a finished playable game.

## Technology Stack

- **Language:** TypeScript
- **Runtime:** Bun
- **API server:** Fastify
- **Database:** PostgreSQL
- **Database toolkit:** Drizzle ORM and Drizzle Kit
- **API documentation:** OpenAPI with Swagger UI

## Dependencies

The backend uses the following packages:

- `fastify` for the HTTP server
- `@fastify/autoload` for route loading
- `@fastify/cors` for cross-origin resource sharing
- `@fastify/swagger` and `@fastify/swagger-ui` for API documentation
- `drizzle-orm` and `drizzle-kit` for database access and schema tooling
- `postgres` as the PostgreSQL driver
- `typescript` and `@types/bun` for TypeScript and Bun type support
