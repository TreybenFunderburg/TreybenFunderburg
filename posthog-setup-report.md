<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Funderworks studio site. PostHog is now initialized client-side via `instrumentation-client.ts` (the Next.js 15.3+ approach), with a reverse proxy configured in `next.config.ts` to route events through `/ingest` and reduce ad-blocker interference. Server-side tracking is provided by a `lib/posthog-server.ts` factory that's used in the `sendContactMessage` Server Action. Nine events are instrumented across six files, covering the full visitor journey from the first hero CTA click through to a confirmed contact submission.

| Event | Description | File |
|---|---|---|
| `hero_start_project_clicked` | User clicks the primary "Start a Project" CTA in the hero section | `sections/Hero.tsx` |
| `hero_services_clicked` | User clicks the "Our Services" secondary button in the hero | `sections/Hero.tsx` |
| `nav_start_project_clicked` | User clicks "Start a Project" in the header nav (desktop or mobile, tracked separately via `nav_type` property) | `components/layout/Header.tsx` |
| `portfolio_project_clicked` | User clicks a portfolio project card (includes `project_name`, `project_url`, `project_category` properties) | `sections/Portfolio.tsx` |
| `contact_form_submitted` | Contact form successfully submitted — primary conversion event (includes `has_company` property) | `sections/Contact.tsx` |
| `contact_form_error` | Contact form submission failed (includes `error` message property) | `sections/Contact.tsx` |
| `contact_email_clicked` | User clicks the direct email link in the contact section | `sections/Contact.tsx` |
| `capabilities_cta_clicked` | User clicks "Let's talk →" at the bottom of the Capabilities page | `app/capabilities/page.tsx` (via `components/ui/CapabilitiesCTA.tsx`) |
| `contact_submitted` | **Server-side**: email successfully sent via Resend (includes `has_company`, `message_length` properties) | `app/actions/contact.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/469343/dashboard/1709723)
- [Contact form submissions](https://us.posthog.com/project/469343/insights/XdEYAEvn) — daily line chart of the primary conversion event
- [CTA to contact funnel](https://us.posthog.com/project/469343/insights/5CBN9nBU) — conversion from hero/nav CTA click → form submitted
- [CTA clicks over time](https://us.posthog.com/project/469343/insights/1VCPhd5A) — hero vs nav vs capabilities CTA click volume by week
- [Portfolio project clicks](https://us.posthog.com/project/469343/insights/ggEQAMgs) — which projects get the most interest, broken down by name
- [Contact form success vs error](https://us.posthog.com/project/469343/insights/EpvhNUEm) — submission health check showing successes vs failures

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
