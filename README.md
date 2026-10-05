# Fubball

## Tech Stack
- **Backend:** Laravel
- **Frontend:** React, TypeScript, Inertia.js
- **Styling:** Tailwind CSS (v4), DaisyUI

## Setup & Installation

This project uses Laravel Sail, a light-weight command-line interface for interacting with Laravel's default Docker development environment.

### 1. Configure Sail Alias
First, add `sail` as a shell alias to make running commands easier. You can add this to your `~/.zshrc` or `~/.bashrc`:
```bash
alias sail="./vendor/bin/sail"
```
*Run `source ~/.zshrc` (or equivalent) to apply the alias immediately.*

### 2. Install Dependencies

Install composer: https://getcomposer.org/download/

Install the PHP and Node dependencies:
```bash
composer install
npm ci
```

### 3. Environment Configuration
Copy the example environment file:
```bash
cp .env.example .env
```
Ensure your `.env` configuration is correct, then generate an application key:
```bash
php artisan key:generate
```

### 4. Start the Application
Start the Docker containers in the background:
```bash
sail up -d
```

### 5. Run Migrations & Seed the Database
```bash
sail artisan migrate:fresh --seed
```

### 6. Start the Frontend Development Server
In a separate terminal, start Vite to compile your frontend assets:
```bash
npm run dev
```

Your application should now be accessible at [http://localhost](http://localhost).
