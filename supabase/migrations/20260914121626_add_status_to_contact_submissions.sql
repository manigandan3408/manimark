/*
# Add status column to contact_submissions

1. Modified Tables
- `contact_submissions` — added `status` column (text, default 'new') to track the lifecycle of each submission (new, read, responded, archived).

2. Security
- No RLS policy changes. Existing INSERT-only policy for anon/authenticated remains unchanged.
- Only the service role (edge functions) can read or update rows.

3. Notes
- The new column is nullable=false with a default of 'new' so existing rows (if any) get a sensible value.
- No data is lost; this is a purely additive change.
*/

ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new';

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at
  ON contact_submissions (created_at DESC);
