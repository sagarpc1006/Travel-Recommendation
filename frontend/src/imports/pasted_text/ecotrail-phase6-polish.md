EcoTrail 2.0 — PHASE 6
FINAL PRODUCTION POLISH + RESPONSIVE + MOTION + ACCESSIBILITY + COMPLETE PROTOTYPE + DEVELOPER HANDOFF

Continue the existing EcoTrail 2.0 Figma project from Phases 1–5.

IMPORTANT:
This is the FINAL DESIGN + PRODUCTION POLISH phase.

Do NOT redesign the product from scratch.

Do NOT introduce a new visual language.

Do NOT replace established components.

Do NOT add major new features.

Instead, audit, refine, connect and productionize the entire EcoTrail experience created in Phases 1–5.

The final Figma file should look and behave like a launch-ready SaaS/travel product rather than a collection of hackathon screens.

--------------------------------------------------
1. FINAL PRODUCT EXPERIENCE
--------------------------------------------------

The complete EcoTrail journey must now work as one coherent experience:

LANDING
→ AUTHENTICATION
→ ONBOARDING
→ HOME
→ AI TRAVEL COMMAND CENTER
→ DISCOVER
→ DESTINATION INTELLIGENCE
→ PLANNER
→ RECOMMENDATIONS
→ GREEN & ACCESSIBLE SCORE
→ ECO-TWIN
→ SHOW YOUR MATH
→ SELECT OPTION
→ BUILD ITINERARY
→ ACCESSIBILITY VERIFICATION
→ ITINERARY
→ SAVE TRIP
→ MY TRIPS
→ ECO INSIGHTS
→ PROFILE
→ ACCESSIBILITY PROFILE
→ PRIVACY CONTROLS

The core product loop is:

DISCOVER
→ ASK
→ PLAN
→ COMPARE
→ VERIFY
→ CHOOSE
→ ORGANIZE
→ TRAVEL
→ UNDERSTAND IMPACT

Make this journey visually and interactively consistent from beginning to end.

--------------------------------------------------
2. GLOBAL DESIGN AUDIT
--------------------------------------------------

Audit every screen created in Phases 1–5.

Check:

• Typography consistency
• Font sizes
• Font weights
• Line heights
• Spacing
• Grid alignment
• Card dimensions
• Button dimensions
• Border radius
• Shadows
• Icon sizing
• Color usage
• Component states
• Information hierarchy
• Empty states
• Error states
• Loading states
• Responsive behavior

Remove visual inconsistencies.

No screen should look like it was designed separately from the rest of the product.

--------------------------------------------------
3. DESIGN SYSTEM AUDIT
--------------------------------------------------

Review the complete design system.

Ensure consistent:

• Color tokens
• Semantic colors
• Typography tokens
• Spacing tokens
• Radius tokens
• Elevation
• Iconography
• Components
• Component variants
• States

Verify semantic states:

SUCCESS
WARNING
ERROR
INFO

Accessibility states:

VERIFIED
BUSINESS DECLARED
OSM SUPPORTED
AI SUPPORTED
UNKNOWN
CONFLICTING
NEEDS REVIEW

Carbon states:

LOWER IMPACT
COMPARABLE
HIGHER IMPACT
ESTIMATED

Never use color alone to communicate meaning.

--------------------------------------------------
4. FINAL COLOR SYSTEM
--------------------------------------------------

Maintain the established EcoTrail palette.

Primary direction:

Soft Sage
#E6EFE6

Emerald
#0B6C57

Lime
#CCE96D

Use neutral surfaces and strong contrast for readability.

Do not increase saturation unnecessarily.

Sustainability should feel calm and trustworthy rather than overly "green themed".

Accessibility information must remain visually distinct from sustainability information.

--------------------------------------------------
5. TYPOGRAPHY REFINEMENT
--------------------------------------------------

Create a consistent type hierarchy for:

• Hero headings
• Page headings
• Section headings
• Card titles
• Body text
• Labels
• Metadata
• Data values
• Scores
• Buttons
• Helper text
• Error text

Prioritize readability.

Avoid excessive oversized typography.

Ensure long destination names, itinerary names and AI responses wrap correctly.

--------------------------------------------------
6. RESPONSIVE PRODUCTION PASS
--------------------------------------------------

Create final responsive behavior for:

1440px
1280px
1024px
768px
430px
390px

Do not simply scale desktop screens down.

Recompose layouts when necessary.

Desktop:

• Multi-column layouts
• Maps beside content
• Persistent navigation
• Expanded comparison panels

Tablet:

• Reduced columns
• Collapsible panels
• Optimized spacing

Mobile:

• Single-column layout
• Bottom navigation
• Bottom sheets
• Collapsible sections
• Sticky primary actions
• Compact score cards
• Timeline-first itinerary

Prioritize important actions on small screens.

--------------------------------------------------
7. MOBILE UX AUDIT
--------------------------------------------------

Pay special attention to:

• AI input
• Planner
• Recommendation cards
• Eco-Twin comparison
• Show Your Math
• Accessibility evidence
• Itinerary
• Map
• My Trips
• Eco Insights

Mobile users must not need horizontal scrolling.

Do not compress complex desktop comparison tables into unreadable layouts.

Convert them into:

• Stacked cards
• Expandable sections
• Bottom sheets
• Horizontal scroll only when genuinely necessary

--------------------------------------------------
8. NAVIGATION CONSISTENCY
--------------------------------------------------

Finalize authenticated navigation.

Desktop:

Home
Discover
Planner
My Trips
Eco Insights
Profile

Mobile:

Use the established bottom navigation pattern.

Ensure:

• Active state
• Hover state
• Focus state
• Disabled state
• Notification indicator where applicable

No navigation dead ends.

Every major screen should have an obvious next action.

--------------------------------------------------
9. AI EXPERIENCE POLISH
--------------------------------------------------

Refine all AI states established earlier.

States:

• Idle
• Focused
• Typing
• Understanding
• Searching
• Comparing
• Calculating
• Recommendation Ready
• No Results
• Error

Make transitions feel natural.

AI should feel intelligent without becoming visually distracting.

Use clear language such as:

"Understanding your trip..."

"Checking available options..."

"Comparing sustainability and accessibility..."

"Calculating estimated impact..."

"Your recommendation is ready."

Do not make AI appear to be the source of authoritative data.

--------------------------------------------------
10. AI BOUNDARY / TRUST
--------------------------------------------------

Maintain a visible conceptual distinction:

AI = LANGUAGE + UNDERSTANDING + EXPLANATION

DATA / RULES = DECISION + VERIFICATION + CALCULATION

AI can:

• Understand natural language
• Extract requirements
• Explain recommendations
• Suggest itinerary adjustments

AI must NOT be presented as inventing:

• Official schedules
• Official prices
• Accessibility verification
• Carbon emission factors
• Government information

Where relevant, display source/evidence information.

--------------------------------------------------
11. ECO-TWIN FINAL POLISH
--------------------------------------------------

Ensure Eco-Twin remains one of EcoTrail's strongest product differentiators.

The comparison should clearly communicate:

STANDARD OPTION

versus

ECO-TRAIL / ECO-TWIN OPTION

Show:

• Transport
• Cost
• Travel time
• Estimated CO2e
• Accessibility
• Green & Accessible Score

Use the established example only as a DESIGN DEMO, not as live factual data:

Standard:
Flight + Taxi
142 kg CO2e
₹8,400
3h 10m
Accessibility 2/5

Eco-Twin:
Train + Shared EV Shuttle
31 kg CO2e
₹7,650
3h 55m
Accessibility 5/5

Summary:

"45 minutes more.
₹750 cheaper.
78% less carbon.
Fully accessible."

Clearly label demo/mock values where appropriate.

--------------------------------------------------
12. SHOW YOUR MATH FINAL POLISH
--------------------------------------------------

Make the carbon explanation extremely understandable.

Core formula:

ACTIVITY DATA
×
EMISSION FACTOR
=
ESTIMATED CO2e

Show calculation breakdowns for multiple travel segments when applicable.

Example:

Train
Distance × Factor

Taxi
Distance × Factor

Total
Estimated CO2e

Include:

"How we calculated this"

"Methodology"

"Data source"

Avoid false precision.

Always use:

"Estimated CO2e"

rather than implying laboratory-level accuracy.

--------------------------------------------------
13. GREEN & ACCESSIBLE SCORE
--------------------------------------------------

Finalize the score experience.

Show:

Overall Score

with breakdown:

Sustainability
Accessibility
Cost
Time / Convenience

Ensure score components remain consistent across:

• Planner
• Recommendation
• Eco-Twin
• Itinerary
• My Trips
• Eco Insights

Avoid changing score meaning from one screen to another.

Include "Why this score?" where useful.

--------------------------------------------------
14. ACCESSIBILITY TRUST SYSTEM
--------------------------------------------------

Audit every accessibility-related component.

Ensure evidence status is always understandable.

Examples:

Verified
"Supported by submitted visual evidence."

Business Declared
"Provided by the property."

OSM Supported
"Supported by map accessibility data."

AI Supported
"AI-assisted interpretation; not independent verification."

Unknown
"Could not be confirmed."

Conflicting
"Sources disagree."

Never visually make:

AI Supported

look stronger than:

Verified

--------------------------------------------------
15. LOADING STATES
--------------------------------------------------

Finalize reusable loading states.

Create skeletons for:

• Home
• Discover
• Destination
• Planner
• Recommendations
• Itinerary
• My Trips
• Eco Insights
• Profile

AI processing:

Use meaningful progressive states instead of an indefinite spinner.

Accessibility verification:

Upload
→ Processing
→ Result

--------------------------------------------------
16. ERROR STATES
--------------------------------------------------

Create polished error states.

Examples:

• Network unavailable
• AI unavailable
• Weather unavailable
• Map unavailable
• Recommendation unavailable
• Accessibility verification failed
• Itinerary generation failed
• Trip save failed
• Sync failed

Each error must include:

WHAT HAPPENED
WHY IT MATTERS
WHAT TO DO NEXT

Example:

"We couldn't load the latest weather."

"Your saved itinerary is still available."

"Try again"

--------------------------------------------------
17. OFFLINE EXPERIENCE
--------------------------------------------------

Finalize offline UX.

Show:

• Offline banner
• Cached itinerary
• Cached trip details
• Offline map state
• Pending sync
• Reconnection
• Sync complete

Example:

"You're offline."

"Your saved itinerary is still available."

Do not pretend live data is current when offline.

--------------------------------------------------
18. EMPTY STATES
--------------------------------------------------

Create polished empty states for:

• No trips
• No upcoming trips
• No saved trips
• No accessibility profile
• No verification evidence
• No eco insights
• No search results
• No recommendations

Every empty state should have:

• Clear explanation
• Helpful visual hierarchy
• Primary action

Avoid decorative illustrations that do not communicate anything.

--------------------------------------------------
19. MOTION & MICRO-INTERACTIONS
--------------------------------------------------

Add restrained production-quality motion.

Use motion for:

• Page transitions
• Card hover
• Button press
• AI processing
• Score calculation
• Eco-Twin comparison
• Itinerary expansion
• Bottom sheets
• Toasts
• Save trip
• Verification processing
• Map interaction

Motion should be:

• Fast
• Subtle
• Purposeful

Avoid excessive animations.

Create reduced-motion behavior.

Users who prefer reduced motion should receive simplified transitions.

--------------------------------------------------
20. INTERACTION STATES
--------------------------------------------------

Ensure important components include:

Default
Hover
Focus
Pressed
Disabled
Loading
Success
Error

Inputs:

• Empty
• Focused
• Filled
• Invalid
• Disabled

Buttons:

• Primary
• Secondary
• Ghost
• Destructive
• Loading
• Disabled

Cards:

• Default
• Hover
• Selected
• Disabled

--------------------------------------------------
21. MAP UX POLISH
--------------------------------------------------

Ensure map interactions are consistent.

Map should support:

• Selected location
• Route
• Selected itinerary segment
• Accessibility-related information
• Destination preview

Avoid making the map visually dominate every screen.

On mobile:

Use map as a toggle or bottom sheet when appropriate.

--------------------------------------------------
22. TRIP SHARING PRIVACY
--------------------------------------------------

Audit all sharing interfaces.

Before sharing:

Show what information will be visible.

Never automatically expose:

• Raw accessibility disclosures
• Sensitive accessibility notes
• Private profile information

Public trip sharing should expose only intended trip information.

Provide:

"Privacy settings"

before sharing.

--------------------------------------------------
23. CONTENT / MICROCOPY AUDIT
--------------------------------------------------

Remove generic placeholder text.

Use realistic product copy.

Avoid:

"Lorem ipsum"
"Sample text"
"AI says..."
"Click here"

Use concise, confident language.

Examples:

"Plan a greener route."

"Compare your options."

"See why this recommendation fits."

"Show your math."

"Accessibility needs confirmation."

"Save this trip."

"Estimated CO2e"

--------------------------------------------------
24. VISUAL HIERARCHY AUDIT
--------------------------------------------------

Every screen should answer:

1. Where am I?
2. What is important?
3. What can I do next?
4. Why should I trust this information?

Do not make every card equally prominent.

Create clear hierarchy between:

PRIMARY ACTION
SECONDARY ACTION
SUPPORTING INFORMATION
EVIDENCE
METADATA

--------------------------------------------------
25. LANDING PAGE FINAL POLISH
--------------------------------------------------

Audit the landing page from Phase 2.

Ensure the first screen immediately communicates:

EcoTrail

"Travel Greener. Explore Smarter."

Supporting idea:

"Smart sustainable and accessible travel recommendations."

Make the following differentiators visible:

• AI travel planning
• Eco-Twin
• Accessibility
• Show Your Math
• Trustworthy data

Primary CTA:

"Plan Your Trip"

Secondary CTA:

"Explore EcoTrail"

--------------------------------------------------
26. HOME FINAL POLISH
--------------------------------------------------

Home should immediately prioritize the AI Travel Command Center.

Hierarchy:

1. Greeting
2. AI Travel Command Center
3. Continue Planning
4. Recommended for You
5. Explore Destinations
6. Eco Impact
7. Weather
8. Recent Activity

Do not make Home feel like an analytics dashboard.

It should feel like a travel assistant workspace.

--------------------------------------------------
27. DISCOVER FINAL POLISH
--------------------------------------------------

Ensure Discover supports:

• Search
• Filters
• Sorting
• Destination cards
• Map
• Destination preview
• Accessibility context
• Sustainability context
• Weather context

Keep exploration visual but structured.

--------------------------------------------------
28. PLANNER FINAL POLISH
--------------------------------------------------

Planner should remain the decision-making center.

The final planner flow:

Natural Language Request
→ Structured Requirements
→ Options
→ Green & Accessible Score
→ Eco-Twin
→ Show Your Math
→ Compare
→ Select
→ Build Itinerary

Make the primary CTA obvious:

"Build My Itinerary"

--------------------------------------------------
29. ITINERARY FINAL POLISH
--------------------------------------------------

Itinerary must feel usable during real travel.

Prioritize:

• Time
• Location
• Next action
• Transport
• Accessibility
• Important warnings
• Estimated carbon

The user should be able to quickly answer:

"Where do I go next?"

"What time?"

"How do I get there?"

"Is it accessible?"

--------------------------------------------------
30. ECO INSIGHTS FINAL POLISH
--------------------------------------------------

Eco Insights should educate rather than overwhelm.

Primary information:

• Estimated CO2e
• CO2e avoided
• Standard vs EcoTrail
• Travel trend
• Sustainable choices

Use a small number of meaningful charts.

Avoid dashboard overload.

--------------------------------------------------
31. PROFILE FINAL POLISH
--------------------------------------------------

Profile should feel simple and trustworthy.

Organize:

Personal Information
Travel Preferences
Accessibility
Trips
Eco Impact
Privacy
Notifications
Settings

Sensitive information must have clear privacy context.

--------------------------------------------------
32. COMPLETE PROTOTYPE
--------------------------------------------------

Connect the complete Figma prototype.

PRIMARY FLOW:

Landing
→ Login / Signup
→ Onboarding
→ Home
→ AI Command Center
→ Planner
→ Recommendations
→ Eco-Twin
→ Show Your Math
→ Select Option
→ Build Itinerary
→ Accessibility Details
→ Itinerary
→ Save Trip
→ My Trips
→ Trip Detail

SECONDARY FLOW:

Home
→ Discover
→ Destination
→ Planner

ACCESSIBILITY FLOW:

Profile
→ Accessibility Profile
→ Add Requirement
→ Upload Evidence
→ Verification
→ Result

ECO FLOW:

Trip Detail
→ Eco Insights
→ Carbon Breakdown
→ Methodology

PROFILE FLOW:

Profile
→ Preferences
→ Accessibility
→ Privacy
→ Notifications
→ Settings

--------------------------------------------------
33. PROTOTYPE INTERACTION QUALITY
--------------------------------------------------

Use appropriate Figma interactions:

• Navigate to
• Open overlay
• Close overlay
• Open bottom sheet
• Change component state
• Scroll to
• Smart animate where appropriate

Do not add interactions merely for decoration.

Every interaction should support the user's task.

--------------------------------------------------
34. ACCESSIBILITY AUDIT — WCAG 2.2 AA
--------------------------------------------------

Perform a final accessibility audit.

Check:

• Contrast
• Keyboard navigation
• Focus indicators
• Text readability
• Touch target size
• Form labels
• Error messages
• Status announcements where relevant
• No color-only information
• Reduced motion
• Clear language

Accessibility is both:

A PRODUCT FEATURE

and

A UI QUALITY STANDARD.

--------------------------------------------------
35. IMPLEMENTATION AWARENESS
--------------------------------------------------

Keep all designs realistic for the existing technology stack.

Frontend:

React 18
Vite
JavaScript
React Router
Axios
Vanilla CSS
Leaflet / React-Leaflet

Backend:

Django
Django REST Framework

Authentication:

Firebase Authentication

AI:

Google Gemini

Database:

PostgreSQL

External data:

OpenStreetMap / Overpass
OpenWeatherMap
Government / official data sources

Carbon:

Emission-factor-based calculation

Do not design interactions that require an unsupported platform.

--------------------------------------------------
36. DEVELOPER HANDOFF
--------------------------------------------------

Prepare the final Figma file for development.

Ensure:

• Components are named clearly
• Variants are organized
• Auto Layout is used
• Responsive constraints are defined
• Spacing follows tokens
• Colors use variables/tokens
• Typography uses styles
• Icons are consistent
• Prototype interactions are connected
• Important states are documented

Create a developer handoff section documenting:

• Design tokens
• Component states
• Responsive behavior
• Interaction behavior
• Accessibility behavior
• Trust/evidence states
• AI states
• Carbon calculation presentation
• Eco-Twin behavior

Do not create unnecessary documentation.

--------------------------------------------------
37. FINAL DESIGN QA CHECKLIST
--------------------------------------------------

Before completing Phase 6, verify:

[ ] All Phase 1 design-system components remain consistent

[ ] Landing/auth/onboarding are polished

[ ] Home is polished

[ ] Discover is polished

[ ] Destination intelligence is polished

[ ] Planner is polished

[ ] Recommendations are polished

[ ] Eco-Twin is polished

[ ] Green & Accessible Score is consistent

[ ] Show Your Math is clear

[ ] Accessibility Profile is complete

[ ] Accessibility Verification is complete

[ ] Itinerary is production-ready

[ ] My Trips is complete

[ ] Eco Insights is complete

[ ] Profile is complete

[ ] Privacy controls are understandable

[ ] Offline states exist

[ ] Loading states exist

[ ] Error states exist

[ ] Empty states exist

[ ] Mobile layouts exist

[ ] Tablet layouts exist

[ ] Desktop layouts exist

[ ] Keyboard/focus states exist

[ ] Reduced motion behavior exists

[ ] Prototype flow is connected

[ ] Developer handoff is clear

--------------------------------------------------
38. FINAL VISUAL QUALITY BAR
--------------------------------------------------

The final Figma product should look like:

A real premium travel technology product.

Not:

• A hackathon dashboard
• A collection of UI cards
• A generic AI chatbot
• An overly green sustainability website
• An experimental concept with unusable interactions

The visual language should communicate:

TRUST
INTELLIGENCE
ACCESSIBILITY
SUSTAINABILITY
CLARITY
CONTROL

Use whitespace, hierarchy, restrained color and meaningful data visualization.

--------------------------------------------------
39. DO NOT CHANGE
--------------------------------------------------

Do NOT:

• Replace the established Figma visual language
• Copy the Google Stitch design
• Add a new authentication system
• Add a payment system
• Add an admin dashboard
• Add a hotel-owner dashboard
• Add a marketplace
• Add unnecessary AI agents
• Add unsupported APIs
• Add unnecessary gamification
• Add major new features

This is refinement, not expansion.

--------------------------------------------------
FINAL OBJECTIVE
--------------------------------------------------

Complete EcoTrail 2.0 as a cohesive, launch-ready Figma product.

The final product should demonstrate:

DISCOVER
→ ASK
→ UNDERSTAND
→ PLAN
→ COMPARE
→ CALCULATE
→ VERIFY
→ CHOOSE
→ ORGANIZE
→ SAVE
→ TRAVEL
→ UNDERSTAND IMPACT

The final product statement is:

"EcoTrail doesn't just recommend a trip.
It helps travelers make greener, more accessible decisions — with transparent evidence and understandable calculations."

Finish with a complete, responsive, accessible, interactive and developer-ready Figma prototype.

