-- Fresh schema for BytexAI backend (PostgreSQL)
-- Separated Users and Developers into independent tables

-- Drop existing objects in dependency order
DROP TABLE IF EXISTS bookmarks CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS project_skills CASCADE;
DROP TABLE IF EXISTS admin_logs CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS content CASCADE;
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS developers CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Enums
CREATE TYPE project_status AS ENUM ('draft', 'active', 'completed', 'archived');
CREATE TYPE review_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE notification_type AS ENUM ('project_update', 'review_received', 'bookmark_update', 'system_notification');
CREATE TYPE owner_type AS ENUM ('user', 'developer');

-- Users Table (for regular users only)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_image_url VARCHAR(500),
    bio TEXT,
    location VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT TRUE,
    reset_token VARCHAR(255),
    reset_token_expires TIMESTAMP,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Developers Table (independent, not linked to users)
CREATE TABLE developers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_image_url VARCHAR(500),
    bio TEXT,
    expertise VARCHAR(255),
    years_of_experience INTEGER,
    github_url VARCHAR(500),
    portfolio_url VARCHAR(500),
    linkedin_url VARCHAR(500),
    hourly_rate DECIMAL(10, 2),
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT TRUE,
    is_available BOOLEAN DEFAULT TRUE,
    reset_token VARCHAR(255),
    reset_token_expires TIMESTAMP,
    rating DECIMAL(3, 2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    total_projects INTEGER DEFAULT 0,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects (owned by developers)
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    developer_id INTEGER NOT NULL REFERENCES developers(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    short_description VARCHAR(300),
    category VARCHAR(100),
    tags VARCHAR(100)[],
    status project_status DEFAULT 'draft',
    image_url VARCHAR(500),
    repository_url VARCHAR(500),
    live_url VARCHAR(500),
    budget DECIMAL(10, 2),
    featured BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Reviews (users review projects)
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    status review_status DEFAULT 'pending',
    helpful_count INTEGER DEFAULT 0,
    unhelpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(project_id, user_id)
);

-- Bookmarks (users bookmark projects or developers)
CREATE TABLE bookmarks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    developer_id INTEGER REFERENCES developers(id) ON DELETE CASCADE,
    bookmark_type VARCHAR(50) NOT NULL CHECK (bookmark_type IN ('project', 'developer')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog posts (by users/admins)
CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    author_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt VARCHAR(500),
    featured_image_url VARCHAR(500),
    category VARCHAR(100),
    tags VARCHAR(100)[],
    is_published BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CMS-like content
CREATE TABLE content (
    id SERIAL PRIMARY KEY,
    page_name VARCHAR(255) NOT NULL,
    section_name VARCHAR(255) NOT NULL,
    content_key VARCHAR(255) UNIQUE NOT NULL,
    content_value TEXT,
    content_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    developer_id INTEGER REFERENCES developers(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title VARCHAR(255),
    message TEXT,
    related_id INTEGER,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reports (for content moderation)
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    reported_by_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    reported_by_developer_id INTEGER REFERENCES developers(id) ON DELETE SET NULL,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    developer_id INTEGER REFERENCES developers(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin logs
CREATE TABLE admin_logs (
    id SERIAL PRIMARY KEY,
    action VARCHAR(255) NOT NULL,
    entity_type VARCHAR(100),
    entity_id INTEGER,
    changes JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Refresh tokens for rotation (supports users and developers)
CREATE TABLE refresh_tokens (
    id SERIAL PRIMARY KEY,
    owner_type owner_type NOT NULL,
    owner_id INTEGER NOT NULL,
    token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    revoked_at TIMESTAMP,
    replaced_by_token VARCHAR(500),
    user_agent VARCHAR(500),
    ip VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_developers_email ON developers(email);
CREATE INDEX idx_projects_developer_id ON projects(developer_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_reviews_project_id ON reviews(project_id);
CREATE INDEX idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_developer_id ON notifications(developer_id);
CREATE INDEX idx_refresh_tokens_owner ON refresh_tokens(owner_type, owner_id);
