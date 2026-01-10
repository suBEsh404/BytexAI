-- Migration: Add 'live' status to project_status enum
-- Date: 2026-01-10
-- Description: Adds 'live' as a valid project status and migrates 'active' to 'live'

-- Step 1: Add 'live' to the enum
ALTER TYPE project_status ADD VALUE IF NOT EXISTS 'live';

-- Step 2: Update existing 'active' projects to 'live' (optional - for consistency)
-- Uncomment the line below if you want to migrate existing 'active' projects to 'live'
-- UPDATE projects SET status = 'live' WHERE status = 'active';

-- Note: Both 'active' and 'live' are now valid values
-- The application will use 'live' for new projects going forward
