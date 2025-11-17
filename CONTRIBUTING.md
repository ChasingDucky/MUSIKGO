# Contributing to MUSIKGO

Thank you for your interest in contributing to MUSIKGO!

## Development Setup

1. Fork and clone the repository
2. Install dependencies:
   ```bash
   npm run install:all
   ```

3. Set up environment variables:
   - Copy `client/.env.example` to `client/.env`
   - Copy `server/.env.example` to `server/.env`
   - Update the values as needed

4. Start MongoDB (required for backend)

5. Seed the database:
   ```bash
   cd server
   npm run seed
   ```

6. Start development servers:
   ```bash
   npm run dev
   ```

## Project Structure

- `client/` - React frontend application
- `server/` - Node.js backend API

## Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Run linters before committing:
  ```bash
  npm run lint
  ```

## Commit Guidelines

- Use clear and descriptive commit messages
- Follow conventional commits format:
  - `feat:` - New feature
  - `fix:` - Bug fix
  - `docs:` - Documentation changes
  - `style:` - Code style changes
  - `refactor:` - Code refactoring
  - `test:` - Test changes
  - `chore:` - Build/tooling changes

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Test your changes thoroughly
4. Update documentation if needed
5. Submit a pull request

## Questions?

Feel free to open an issue for any questions or concerns.
