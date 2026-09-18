/*
# Create contact_submissions table

1. New Tables
- `contact_submissions` — stores messages submitted through the website contact form
  - `id` (uuid, primary key)
  - `name` (text, not null) — customer name
  - `email` (text, not null) — customer email
  - `phone` (text, nullable) — customer phone number
  - `request_type` (text, not null) — type of request: Project Enquiry, Website Problem, Service Request, Feedback, Other
  - `message` (text, not null) — the message/problem description
  - `email_sent` (boolean, default false) — whether the email notification was successfully sent
  - `created_at` (timestamptz, default now()) — submission timestamp

2. Security
- Enable RLS on `contact_submissions`.
- Allow anon + authenticated INSERT only (visitors can submit forms without signing in).
- No SELECT/UPDATE/DELETE for anon — only the service role (edge function) can read rows.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  request_type text NOT NULL,
  message text NOT NULL,
  email_sent boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anon + authenticated) to insert new submissions
DROP POLICY IF EXISTS "anon_insert_submissions" ON contact_submissions;
CREATE POLICY "anon_insert_submissions"
ON contact_submissions FOR INSERT
TO anon, authenticated WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies for anon or authenticated
-- Only the service role (used by edge functions) can read/manage rows
