# Email campaign attachments

Drop per-campaign PDF attachments here. Filenames must match the
`attachment_path` values in `core/email.py`.

Current expected files:

- `hacker_package.pdf` — attached to the `acceptances` (hackers) campaign.
  Public mirror: `hacker-package.pdf` in the frontend public folder.
- `hacker_schedule.pdf` — attached to the `acceptances` (hackers) campaign.
  Public mirror: `hacker-schedule.pdf` in the frontend public folder.
- `mentor_package.pdf` — attached to the `mentor_acceptances` campaign.
  Public mirror: `mentor-package.pdf` in the frontend public folder.
- `judge_package.pdf` — attached to the `judge_acceptances` campaign.
  Public mirror: `judging-package.pdf` in the frontend public folder.
  Note: backend file uses "judge", frontend public file uses "judging" —
  asymmetric because the frontend deploy owns the public filename and we
  link to whatever resolves on bearhacks.com.

The same PDFs should also be copied to the frontend public folder
(`bearhacks-frontend/2026/public/`) so the in-email "Download the PDF" link
resolves at `https://bearhacks.com/<file>.pdf`. Filename convention:
underscores on disk, hyphens in public URLs.

## Calendar files

Two RFC-5545 invites back the "Apple / Outlook (.ics)" link in the acceptance
emails. Copy each to `bearhacks-frontend/2026/public/` so they resolve at
`https://bearhacks.com/<file>.ics`. Times are UTC (EDT is UTC-4).

- `bearhacks-2026.ics` — full-weekend hackathon event (Fri 4 PM – Sun 5 PM ET).
  Used by the `mentor_acceptances` campaign.
- `bearhacks-2026-judging-day.ics` — Sunday judging block only (9 AM – 4 PM ET).
  Used by the `judge_acceptances` campaign; the Google Calendar link in that
  email points at the shared "Judging Day" event instead of a render template.

Update `DTSTAMP`, `DTSTART`, and `DTEND` in either file if the event dates
change.
