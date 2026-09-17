Design Phase 2 of the EcoTrail 2.0 product.

IMPORTANT:
Phase 1 has already established the complete EcoTrail brand identity, design tokens, typography, colors, spacing, iconography, components, motion principles, accessibility rules, and responsive behavior.

You MUST reuse the Phase 1 design system.

DO NOT create a new visual language.
DO NOT introduce new colors, typography, radii, shadows, button styles, or component styles unless absolutely necessary.

This phase is about creating the first complete user journey:

LANDING PAGE
→ AUTHENTICATION
→ ACCOUNT VERIFICATION / RECOVERY
→ ONBOARDING
→ PREFERENCE SUMMARY
→ HOME ENTRY

The result should feel like a real launch-ready product, not a hackathon mockup.

==================================================
1. PRODUCT CONTEXT
==================================================

Product:
EcoTrail 2.0

Tagline:
“Travel Greener. Explore Smarter.”

EcoTrail is an AI-powered sustainable and accessible travel platform.

The platform helps travelers:

- Discover destinations
- Plan trips using AI
- Compare conventional travel with greener alternatives
- Find accessibility-friendly travel and stays
- Understand estimated carbon emissions
- Optimize travel for sustainability, accessibility, cost and convenience
- Build and save itineraries
- Get weather and destination intelligence
- Understand why recommendations are made

Core product philosophy:

AI understands the traveler.

Real-world data informs the options.

EcoTrail's decision engine compares the options.

The traveler remains in control.

==================================================
2. DESIGN OBJECTIVE
==================================================

Create a polished first-time-user experience.

The user should immediately understand:

1. What EcoTrail does
2. Why it is different
3. How AI helps
4. That sustainability is measurable
5. That accessibility is treated seriously
6. That recommendations are transparent
7. That the user can customize priorities

The experience should feel:

Premium
Intelligent
Calm
Trustworthy
Human
Inclusive
Travel-oriented
Environmentally responsible

Avoid making the product feel like:

- a generic travel booking website
- a generic AI chatbot
- a generic sustainability dashboard
- a government portal
- a crypto/web3 product
- a futuristic sci-fi interface

==================================================
3. FIGMA FILE ORGANIZATION
==================================================

Create the following Figma pages:

01 — Brand & Design System
02 — Landing
03 — Authentication
04 — Onboarding
05 — Responsive Screens
06 — Prototype Flow
07 — States & Edge Cases
08 — Developer Handoff

Phase 1 already contains the design system.

Reuse its components and variables wherever possible.

==================================================
4. LANDING PAGE
==================================================

Create a premium responsive landing page.

Desktop width:
1440px

Also create:
1024px tablet
390px mobile

The landing page should have a clear visual hierarchy.

--------------------------------------------------
4.1 NAVIGATION
--------------------------------------------------

Create a clean premium navbar.

Left:

EcoTrail logo

Center / navigation:

How It Works
Discover
Eco-Twin
Accessibility
Impact

Right:

Log In
Get Started

The navbar should become a mobile navigation pattern on smaller screens.

Do not overload the navigation.

--------------------------------------------------
4.2 HERO SECTION
--------------------------------------------------

Primary headline:

“Travel Greener. Explore Smarter.”

Supporting message:

“Plan smarter journeys with AI-powered recommendations built around sustainability, accessibility, cost, and convenience.”

Primary CTA:

“Plan My Trip”

Secondary CTA:

“Explore Destinations”

Include a sophisticated travel/environment visual.

The visual should communicate:

travel
nature
navigation
technology
sustainability

Avoid generic stock-photo-heavy composition.

The hero should immediately communicate that EcoTrail is an intelligent travel planning platform.

--------------------------------------------------
4.3 AI PLANNING PREVIEW
--------------------------------------------------

Create a visually strong preview of the EcoTrail AI experience.

Example user input:

“Plan a sustainable 3-day trip from Pune to Goa.”

Show a simplified AI response preview.

Example:

Pune → Goa

Standard:
Flight + Taxi

Eco-Twin:
Train + Shared EV Shuttle

Then show compact metrics:

CO2e
Cost
Travel Time
Accessibility

Do NOT make the preview look like a normal chatbot.

It should look like an intelligent travel planning interface.

--------------------------------------------------
4.4 WHY ECOTRAIL
--------------------------------------------------

Create a section explaining the product's core capabilities.

Use four primary feature cards:

AI Travel Planning
Sustainable Recommendations
Accessibility Intelligence
Transparent Decisions

Each card should include:

Icon
Title
Short explanation
Subtle interaction affordance

Keep the cards visually lightweight.

--------------------------------------------------
4.5 ECO-TWIN FEATURE
--------------------------------------------------

Create a dedicated Eco-Twin section.

Headline:

“See the better alternative.”

Explain:

Eco-Twin compares a conventional travel plan with a lower-impact alternative while keeping the destination and trip requirements fixed.

Show a visual comparison:

STANDARD
vs
ECO-TWIN

Metrics:

Carbon
Cost
Time
Accessibility

The design should communicate that users are not simply being told what to choose.

They are being shown the trade-offs.

CTA:

“See How Eco-Twin Works”

--------------------------------------------------
4.6 ACCESSIBILITY FEATURE
--------------------------------------------------

Create a section showing that accessibility is part of trip planning.

Use examples such as:

Step-free access
Wheelchair accessibility
Accessible transport
Accessible stay

Show verification indicators such as:

Verified
Business Declared
OSM Supported
Unknown

Important:

Do NOT imply that AI alone verifies accessibility.

The UI should communicate evidence and confidence.

--------------------------------------------------
4.7 SHOW YOUR MATH
--------------------------------------------------

Create a concise transparency section.

Headline:

“Know where the numbers come from.”

Show:

Activity Data
×
Emission Factor
=
Estimated CO2e

Then show supporting information:

Distance
Travel Mode
Emission Factor
Source

The section should establish trust.

--------------------------------------------------
4.8 HOW IT WORKS
--------------------------------------------------

Create a simple 4-step journey:

01
Tell us about your trip

02
EcoTrail understands your priorities

03
Compare sustainable and accessible options

04
Build and save your journey

Use the Phase 1 visual system.

Do not create overly complex illustrations.

--------------------------------------------------
4.9 IMPACT SECTION
--------------------------------------------------

Create an elegant sustainability impact section.

Show example metrics such as:

Lower-carbon travel
Accessible choices
Transparent recommendations

Do not fabricate claims such as “1 million users saved X tonnes”.

Use illustrative/demo numbers only where clearly presented as examples.

--------------------------------------------------
4.10 TRUST SECTION
--------------------------------------------------

Create a trust section emphasizing:

Verified information
Transparent calculations
Real-world travel data
Accessibility evidence

Use the existing verification component from Phase 1.

--------------------------------------------------
4.11 FINAL CTA
--------------------------------------------------

Create a strong closing CTA.

Headline:

“Your next journey can be better.”

Supporting text:

“Plan a trip that works for you — and leaves a lighter footprint.”

Primary CTA:

“Start Planning”

--------------------------------------------------
4.12 FOOTER
--------------------------------------------------

Create a complete production footer.

Include:

EcoTrail logo
Product
Discover
Planner
Eco-Twin
Accessibility
About
Privacy
Terms
Contact

Use realistic navigation hierarchy.

==================================================
5. AUTHENTICATION
==================================================

Create the complete authentication experience.

The authentication system uses:

Firebase Authentication

Do NOT design a Django JWT authentication flow.

Create these screens:

1. Login
2. Sign Up
3. Forgot Password
4. Password Reset Confirmation
5. Email Verification
6. Authentication Loading
7. Authentication Error
8. Authentication Success

--------------------------------------------------
5.1 LOGIN
--------------------------------------------------

Create:

Welcome back

Email
Password

Forgot password?

Log In

Divider:

OR

Continue with Google

Link:

Don't have an account?
Create one

Include:

password visibility toggle
validation
loading state
error state
focus state

Keep authentication friction low.

--------------------------------------------------
5.2 SIGN UP
--------------------------------------------------

Create:

Create your EcoTrail account

Email
Password
Confirm Password

Create Account

Optional:

Continue with Google

Include terms/privacy acknowledgement.

Show password strength in a subtle, useful manner.

Do not create unnecessary fields.

--------------------------------------------------
5.3 FORGOT PASSWORD
--------------------------------------------------

Create:

Reset your password

Enter your email and we'll send you a reset link.

Email

Send Reset Link

States:

Default
Loading
Email Sent
Email Not Found
Invalid Email
Network Error

--------------------------------------------------
5.4 EMAIL VERIFICATION
--------------------------------------------------

Create:

Verify your email

Explain why verification is required.

Actions:

Resend Email
Change Email
Continue

Include:

Resending state
Success state
Error state

--------------------------------------------------
5.5 AUTHENTICATION LOADING
--------------------------------------------------

Create a polished authentication loading state.

Examples:

Checking your session...
Signing you in...
Creating your account...
Preparing EcoTrail...

Do not use an oversized spinner.

--------------------------------------------------
6. ONBOARDING
==================================================

Create a short, intelligent onboarding experience.

IMPORTANT:

Do NOT make onboarding feel like a long form.

The onboarding should feel like EcoTrail is learning how to personalize recommendations.

Create approximately 5–7 steps.

Include a clear progress indicator.

Example:

1 / 7

--------------------------------------------------
6.1 WELCOME
--------------------------------------------------

Headline:

“Let's make EcoTrail work for you.”

Supporting text:

“Tell us what matters most when you travel. You can change these preferences anytime.”

CTA:

“Let's Go”

--------------------------------------------------
6.2 TRAVEL STYLE
--------------------------------------------------

Ask:

“What kind of trips do you enjoy?”

Options may include:

Nature
Culture
Adventure
Relaxation
City Exploration
Food & Local Experiences

Allow multiple selections.

Use cards/chips from the Phase 1 component library.

--------------------------------------------------
6.3 SUSTAINABILITY PRIORITY
--------------------------------------------------

Ask:

“How important is lower-impact travel?”

Create an intuitive preference control.

Options:

Not a priority
Somewhat important
Important
Very important
Top priority

Do not use technical sustainability terminology.

Explain:

“This helps EcoTrail balance greener options with your other preferences.”

--------------------------------------------------
6.4 ACCESSIBILITY
--------------------------------------------------

Ask:

“What accessibility features should EcoTrail prioritize?”

Options may include:

Step-free access
Wheelchair-friendly routes
Accessible accommodation
Accessible transport
Minimal walking
No specific requirement

Include:

“Prefer not to specify”

Important:

Use respectful language.

Do not force users to disclose sensitive information.

Explain that accessibility preferences are used to personalize recommendations.

--------------------------------------------------
6.5 BUDGET
--------------------------------------------------

Ask:

“What is your typical travel budget?”

Allow:

Budget range
Currency
Flexible / strict preference

Keep it simple.

--------------------------------------------------
6.6 CONVENIENCE
--------------------------------------------------

Ask:

“How much convenience are you willing to trade for a greener option?”

Create a clear slider.

Example:

Maximum convenience
Balanced
Greener choices

This preference will later influence recommendation weights.

Make the interaction visually understandable.

--------------------------------------------------
6.7 SUMMARY
--------------------------------------------------

Create a personalized preference summary.

Example:

Your EcoTrail profile

Travel:
Nature + Culture

Sustainability:
High Priority

Accessibility:
Step-free + Accessible Stay

Budget:
Moderate

Convenience:
Balanced

CTA:

“Create My Travel Profile”

Secondary:

“Edit Preferences”

==================================================
7. PERSONALIZATION CONFIRMATION
==================================================

After onboarding, create a short success state.

Headline:

“You're all set.”

Supporting text:

“EcoTrail will use these preferences to personalize your travel recommendations.”

Show a compact visual summary.

CTA:

“Start Exploring”

This CTA leads into the future Home experience.

Do not design the full Home page in this phase.

==================================================
8. RESPONSIVE DESIGN
==================================================

Create responsive versions for:

Desktop
Tablet
Mobile

Desktop:
1440px

Tablet:
1024px

Mobile:
390px

Pay special attention to:

Navbar
Hero
Authentication forms
Onboarding cards
Preference controls
Progress indicator
CTA placement
Footer

Mobile layouts must be intentionally designed.

Do NOT simply scale desktop screens down.

--------------------------------------------------
9. INTERACTION DESIGN
==================================================

Create prototype interactions.

Landing:

Get Started
→ Sign Up

Log In
→ Login

Plan My Trip
→ Login / Sign Up if unauthenticated

Authentication:

Login success
→ Onboarding

Sign Up
→ Email Verification
→ Onboarding

Forgot Password
→ Reset confirmation

Onboarding:

Next
→ Next step

Back
→ Previous step

Skip where appropriate

Complete onboarding
→ Personalization confirmation

Start Exploring
→ Home placeholder

--------------------------------------------------
10. MOTION
==================================================

Reuse the Phase 1 motion system.

Use subtle motion for:

Hero entrance
CTA hover
Card hover
Authentication transitions
Onboarding transitions
Progress changes
Selection states
Success confirmation

Onboarding transitions should feel smooth and directional.

Example:

Step 2 → Step 3

Use a subtle horizontal transition.

Do NOT use excessive animations.

Support reduced-motion preferences.

==================================================
11. COMPONENT REUSE
==================================================

Reuse Phase 1 components.

Do NOT recreate:

Buttons
Inputs
Cards
Badges
Typography
Icons
Modals
Toasts
Navigation patterns

unless the Phase 2 context genuinely requires a variant.

If a variant is required:

Create it as a controlled variant of the existing component.

Maintain consistent naming.

==================================================
12. STATES
==================================================

Design important states for every interactive area.

Include:

Default
Hover
Focus
Pressed
Disabled
Loading
Success
Error
Empty

Authentication-specific:

Invalid credentials
Email already registered
Password mismatch
Weak password
Verification pending
Verification success
Network error
Session expired

Onboarding-specific:

No selection
Selected
Maximum selections
Validation
Saving
Saved
Back navigation

==================================================
13. ACCESSIBILITY
==================================================

Maintain WCAG 2.2 AA principles from Phase 1.

Ensure:

Strong text contrast
Visible keyboard focus
Large touch targets
Clear labels
Accessible form validation
Meaningful error messages
No color-only information
Reduced-motion support
Logical reading order

Accessibility must be especially strong on:

Authentication
Forms
Preference selection
Sliders
Progress indicators
CTA buttons

==================================================
14. CONTENT STYLE
==================================================

Use concise, human language.

Avoid:

“Leverage AI-powered optimization...”

Prefer:

“Tell us what matters. We'll handle the planning.”

Avoid:

“Carbon-aware itinerary generation.”

Prefer:

“Find a lower-impact way to get there.”

The tone should be:

Confident
Helpful
Warm
Clear
Intelligent

==================================================
15. VISUAL HIERARCHY
==================================================

Prioritize:

1. Primary user action
2. Product value
3. Trust
4. Supporting information
5. Secondary actions

Do not overwhelm the user with metrics.

Use whitespace intentionally.

The interface should feel spacious and premium.

==================================================
16. DESIGN HANDOFF
==================================================

For every major component/screen:

- Use consistent component names
- Use Auto Layout
- Use reusable components
- Use variants for states
- Use design variables/tokens from Phase 1
- Maintain consistent spacing
- Document responsive behavior
- Document important interaction states

Add developer notes where implementation behavior is important.

The eventual implementation is:

Frontend:
React 18
Vite
JavaScript
React Router
Axios
Leaflet / React-Leaflet
Vanilla CSS

Backend:
Django
Django REST Framework

Authentication:
Firebase Authentication

Database:
PostgreSQL

AI:
Google Gemini

Therefore:

Do not design interactions that require a proprietary design framework.

==================================================
17. FINAL PROTOTYPE FLOW
==================================================

Create a connected Figma prototype for this complete journey:

Landing
↓
Get Started
↓
Sign Up
↓
Email Verification
↓
Welcome Onboarding
↓
Travel Style
↓
Sustainability
↓
Accessibility
↓
Budget
↓
Convenience
↓
Preference Summary
↓
Profile Created
↓
Home Entry

Also create:

Landing
↓
Login
↓
Home Entry

And:

Login
↓
Forgot Password
↓
Reset Confirmation

==================================================
18. QUALITY BAR
==================================================

Before completing Phase 2, perform a design audit.

Check:

- Does every screen use Phase 1 components?
- Is the visual language consistent?
- Is the landing page immediately understandable?
- Does authentication feel trustworthy?
- Is onboarding short and intuitive?
- Are accessibility questions respectful?
- Are sustainability preferences easy to understand?
- Are mobile layouts properly designed?
- Are all important states represented?
- Are interactions realistic?
- Is the prototype fully connected?
- Can the screens realistically be implemented with React + Vanilla CSS?

Fix inconsistencies before finalizing.

==================================================
FINAL INSTRUCTION
==================================================

Create Phase 2 as a polished, production-ready experience.

The goal is NOT to create many screens.

The goal is to create one excellent, coherent first-user journey:

DISCOVER ECOTRAIL
→ TRUST ECOTRAIL
→ CREATE ACCOUNT
→ PERSONALIZE EXPERIENCE
→ ENTER THE PRODUCT

Reuse the existing EcoTrail Phase 1 design system throughout.

Do not redesign Phase 1.

Do not create the full Home, Discover, Planner, My Trips, Eco Insights, or Profile pages yet.

Those belong to later phases.