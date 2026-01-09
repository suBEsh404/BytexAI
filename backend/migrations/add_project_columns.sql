-- Migration: Add short_description and review_count columns to projects table
-- Run this if your database already exists and needs these columns added

-- Add short_description column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='projects' AND column_name='short_description') THEN
        ALTER TABLE projects ADD COLUMN short_description VARCHAR(300);
    END IF;
END $$;

-- Add review_count column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='projects' AND column_name='review_count') THEN
        ALTER TABLE projects ADD COLUMN review_count INTEGER DEFAULT 0;
    END IF;
END $$;

-- Update existing projects to have short_description based on description
UPDATE projects 
SET short_description = LEFT(description, 200) 
WHERE short_description IS NULL AND description IS NOT NULL;

-- Update review_count based on actual reviews
UPDATE projects p
SET review_count = (
    SELECT COUNT(*) 
    FROM reviews r 
    WHERE r.project_id = p.id
)
WHERE review_count IS NULL OR review_count = 0;

-- Create a trigger to automatically update review_count when reviews are added/removed
CREATE OR REPLACE FUNCTION update_project_review_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE projects 
        SET review_count = review_count + 1 
        WHERE id = NEW.project_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE projects 
        SET review_count = GREATEST(review_count - 1, 0) 
        WHERE id = OLD.project_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if it exists and create new one
DROP TRIGGER IF EXISTS trigger_update_review_count ON reviews;
CREATE TRIGGER trigger_update_review_count
AFTER INSERT OR DELETE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_project_review_count();

COMMENT ON COLUMN projects.short_description IS 'Short description for project cards (max 300 chars)';
COMMENT ON COLUMN projects.review_count IS 'Cached count of reviews for performance';
