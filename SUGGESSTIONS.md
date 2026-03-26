Findings (ordered by severity)

1. Sensitive message data is publicly exposed without authorization.
   Evidence: views.py:38, views.py:44, urls.py:11.
   Why it matters: anyone who discovers this endpoint can read all submitted contact messages, which is a privacy and compliance risk.
   Suggested improvement: require authentication/authorization on the list endpoint (for example admin-only), and consider pagination plus audit logging.
   **Step-by-Step Guidance**

- Keep current admin-only protection as-is. It is correct.
- Add REST_FRAMEWORK pagination settings in settings.py.
- Update MessageList tests to expect paginated shape.
- Add ApiAuditLog model in models.py and run migrations.
- Add audit write in MessageList view in views.py.
- Add tests:

1. admin request creates one audit log row
2. non-admin denied request optionally also logged (if you choose to log denied attempts)

- Re-run tests and deployment check.

2. Production security posture is currently unsafe by default.
   Evidence in code: settings.py:23, settings.py:26, settings.py:28, settings.py:131.
   Why it matters: hardcoded secret key, debug enabled, empty allowed hosts, and open CORS make accidental prod deployment risky.
   Validation: Django deploy check reported 7 security warnings including DEBUG, ALLOWED_HOSTS, and SECRET_KEY concerns.
   Suggested improvement: move secrets/env-specific flags to environment variables, split dev/prod settings, and lock CORS/hosts per environment.

**Step by Step guidance to implement/verify this safely**

- Confirm backend contract first.
- Check Project fields in models.py:18.
- Check what serializer returns (if using all fields, it should mirror model).
- Map card fields only from contract.
- Use description, solution, challenges, technologies, live_link, repo_link.
- Add null-safe rendering.
- Guard optional text fields and links with simple conditions.
- Add fallback UX.
- Show a default description and a no-links message.
- Validate in runtime.
- Test cards with:
  full data
  missing repo_link
  missing live_link
  both missing
- Keep tests aligned.
  > If you add API tests later, include a case where repo_link is null and ensure frontend handles it gracefully (manual or component test).

3. Project card uses a field that does not exist in backend model and may render invalid links.
   Evidence: ProjectCard.jsx:51, ProjectCard.jsx:70, models.py:26.
   Why it matters: project.hero_statement is not part of Project model fields, so UI can show blank/undefined content; repo_link is nullable so href can become invalid when absent.
   Suggested improvement: align card with actual API contract (description, solution, challenges), and render repo button conditionally like live_link.

**Step-by-step guidance (for future reference if model changes)**
Step 1 — Check the backend contract first.
Open models.py:18 and list every field on Project. That is your source of truth.

Step 2 — Check the serializer.
Open serializers.py and confirm which fields are in fields = [...]. Only those fields will appear in the API response.

Step 3 — Map only real fields in the card.
Every project.something in JSX must exist in that confirmed list. If you are unsure, console.log(project) after fetching to see the actual API shape.

Step 4 — Make nullable fields conditional.
Any model field with blank=True, null=True can be absent. Wrap its JSX in a truthiness guard: {project.field && <element>}.

Step 5 — Add a fallback for required display fields.
For fields like description that must always show something, add a default: project.description || "No description provided.".

Step 6 — Test all edge cases manually.

A project with both links: both buttons show.
A project with only live_link: only Live Site button shows.
A project with neither link: fallback message shows.
A project with all optional text fields empty: no blank sections appear.

4. Contact info is fetched twice in separate places, creating duplicate network traffic and state drift risk.
   Evidence: App.jsx:32, Contact.jsx:29.
   Why it matters: two sources of truth can diverge (one part of UI updated while another fails), and increases request cost.
   Suggested improvement: fetch once at app level and pass down, or centralize in a shared hook/context.

**Step-by-step guidance (for future changes to this pattern)**
Step 1 — Identify who owns the data.
Ask: "Which component is the highest in the tree that needs this data?" That component should be the one that fetches it. In this case App.jsx needs contact data for both Profile and Contact sections, so App.jsx is the owner.

Step 2 — Fetch once in the owner.
Use one useApiClient hook call and one useEffect in App.jsx. Do not duplicate this in any child.

Step 3 — Pass data, loading, and error as props.
All three states travel together. A child that only receives data but not loading cannot show a spinner. Pass all three.

Step 4 — Make child components props-only.
Remove any useEffect + fetch logic from Contact.jsx. The component should only import useState for form state (which belongs to it) and nothing else for data fetching.

Step 5 — Add null safety in the child.
const safeContactInfo = contactInfo || {} protects against the brief moment before the parent's fetch completes.

Step 6 — If prop drilling becomes too deep (3+ levels), use Context.
For this app, passing props two levels down is fine and clear. If the tree grows, create a ContactContext that wraps the app and provides the same data everywhere without prop chains.

5. Networking is fragmented and hardcoded, which hurts maintainability and deployment portability.
   Evidence: axiosConfig.js:4, Projects.jsx:2, Projects.jsx:11, Profile.jsx:12, ProjectCard.jsx:30.
   Why it matters: using both axios instance and raw axios with localhost literals leads to inconsistent behavior across environments and harder debugging.
   Suggested improvement: route all API calls through one service layer and build media URLs from a single configurable base.

**Step-by-step guidance (for future changes or new components)**
Step 1 — Never import axios directly in a component.
If you need to make an API call, go to services.js and add a named function there. Import that function in your component, not axios itself.

Step 2 — Add new endpoints only in services.js.
One line per endpoint:

That is all. The component calls fetchSkills, never a raw URL.

Step 3 — Always use getMediaUrl() for image src values.
Never do src={project.project_image} directly. The backend returns a relative path like projects/photo.jpg. Without getMediaUrl, the browser tries to load it from the frontend origin, not the backend.

Step 4 — To change the API host for deployment, set env vars only.
On your hosting platform (Render, Railway, Vercel, etc.), set:

No code changes needed. Every component automatically uses the new host on next build because all of them flow through axiosConfig.js.

Step 5 — For local dev, create frontend/.env.local if you need to override.

Without this file, the fallback in axiosConfig.js handles it. Either way works.

Step 6 — If you add a new component that needs a media URL, import from services.

This keeps services.js as the only import boundary that components ever cross.

6. Excessive debug logging and inconsistent contact field mapping reduce readability and can leak internals.
   Evidence: Contact.jsx:27, Contact.jsx:43, Contact.jsx:9, serializers.py:21.
   Why it matters: production console noise obscures real errors; serializer exposes github_link but Contact section does not model/render it, causing inconsistent UX.
   Suggested improvement: remove noisy logs or guard them behind a dev flag, and keep frontend display model aligned with serializer fields.

   **Step-by-step guidance (for future changes to either file)**
   Step 1 — Audit logging in every component before committing.
   Search for console.log in the frontend:

Any console.log that is not inside a catch block or behind a dev flag is a candidate for removal.

Step 2 — The only acceptable console call pattern in production code.

Step 3 — If you need logging during development, guard it behind an env flag.

import.meta.env.DEV is true only when running vite dev. Vite strips it out of production builds entirely.

Step 4 — When adding or changing a serializer field, update the frontend in the same commit.
The rule is: serializer fields and frontend rendering should always match. If you add website_link to ContactInfoSerializer, add the corresponding JSX to Contact.jsx in the same change.

Step 5 — When removing a serializer field, search for its usage in the frontend first.

Remove all references before removing from the serializer, or the frontend silently renders nothing where the field used to be.

Step 6 — To verify alignment at any time, compare the serializer fields list against the JSX.
Open serializers.py:20 and list the fields array. Open Contact.jsx and check that every field is either rendered or explicitly skipped with a comment explaining why.

7. Minor code hygiene issues already detected by lint.
   Evidence: ProjectCard.jsx:11.
   Why it matters: unused imports are small, but they accumulate and lower code clarity.
   Validation: ESLint currently fails with one error for unused useEffect import.
   Suggested improvement: remove dead imports and keep lint clean in CI.

- verify the current ProjectCard import line and run lint so we can confirm whether this hygiene issue still exists or is already resolved.
  > npm run lint

**Common mistakes**

Removing logic but forgetting to update imports.
Auto-import tools adding hooks/components you never end up using.
Ignoring lint warnings locally and discovering them only at PR/CI time.
Disabling lint rules globally instead of fixing the root cause.
**Step-by-step guidance for implementing this pattern in future**

After each refactor, scan import lines first.
Quick check: if a symbol is imported, it should appear in the file body.
Run lint locally before commit.
In this repo: npm run lint from frontend.
Keep lint enforced in CI.
Make PR checks fail on lint errors so dead imports do not reach main.
Use editor settings to auto-remove unused imports on save (optional but helpful).
This prevents buildup of small hygiene issues over time.
Repeat for new files/components.
Especially after moving logic into hooks/services/components.

8. Test coverage gap on backend.
   Evidence: tests.py:1.
   Why it matters: regressions in API behavior/security can ship unnoticed, especially around permissions and nullable fields.
   Validation: Django test run found 0 tests.
   Suggested improvement: start with a small API test set for profile/contact read endpoints, message create validation, and message list authorization.
