Copilot Agent Prompt — Update Django Backend

Goal
- Update and extend the Django backend under `octofit-tracker/backend` to add user-linked activities, teams, leaderboards, and related API endpoints. Make minimal, focused changes and keep project structure consistent.

Constraints & environment
- Work only inside `octofit-tracker/backend` and `octofit-tracker/backend/octofit_tracker`.
- Use Django ORM and existing `djongo` (MongoDB) configuration from `octofit_config/settings.py` — do not write direct MongoDB scripts.
- If editing files, use `apply_patch` (or equivalent file-write) operations and keep changes minimal.
- Update `INSTALLED_APPS`, `urls`, and `settings` only when necessary and follow existing patterns (codespace handling for `ALLOWED_HOSTS`).

High-level tasks (implement in order)
1. Replace `Activity.user` CharField with a proper ForeignKey to `django.contrib.auth.models.User`.
2. Add a `Team` model and a `TeamMembership` (or `Membership`) model linking `User` and `Team` with role and joined timestamp.
3. Add serializers for `Team`, `Membership`, `Activity` (keep `id` serialized as string), and `User` profile summary.
4. Add viewsets and routes:
   - `ActivityViewSet` (already exists) — update to filter by `user` and support creating activities for authenticated users.
   - `TeamViewSet` and `MembershipViewSet`.
   - `LeaderboardView` — read-only endpoint that aggregates total distance/duration per user or team.
5. Wire API routes under `octofit_tracker/tracker/urls.py` using a `DefaultRouter` and explicit leaderboard path.
6. Add admin registrations for `Team` and `Membership`.
7. Create and run migrations, then populate seed data (small set) via Django management shell or a fixture.

Editing instructions for the agent
- Use fully-qualified app names where necessary (e.g., `octofit_tracker.tracker`).
- When changing `models.py`, make accompanying `serializers.py`, `views.py`, and `admin.py` edits in the same patch if possible.
- Ensure serializers convert primary keys to strings where appropriate (ObjectId compatibility).
- Add tests if quick unit tests are trivial; otherwise skip tests but ensure migrations run locally.
- After code changes run:
  - `source octofit-tracker/backend/venv/bin/activate`
  - `python octofit-tracker/backend/manage.py makemigrations`
  - `python octofit-tracker/backend/manage.py migrate --run-syncdb`
  - Seed data using a short script or `manage.py shell` commands.

Commit & push
- Stage only the changed backend files, commit with a concise message like: `feat(tracker): add teams, membership, user-linked activities, leaderboard` and push to the active branch.
- If unsure about destructive changes, create a draft branch `feature/tracker-updates` and open a PR.

Questions to ask the user before destructive actions
- Should `Activity.user` become a ForeignKey to `User` now, or keep as-is for faster iteration?
- Do you want automatic migration commits pushed, or should I prepare the patch and wait for your review before pushing?

Finish criteria
- `octofit-tracker/backend` runs migrations successfully against configured MongoDB.
- New API endpoints are registered at `/api/activities/`, `/api/teams/`, `/api/memberships/`, and `/api/leaderboard/`.
- Minimal seed data present and admin shows `Team`, `Membership`, and `Activity` entries.

Notes
- Follow existing project style and use `octofit_tracker` package paths.
- Keep changes scoped and explain any backward-incompatible migrations in the commit message.
