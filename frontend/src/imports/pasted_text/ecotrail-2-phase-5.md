

EcoTrail 2.0 — Phase 5
ACCESSIBILITY + ITINERARY + MY TRIPS + ECO INSIGHTS + PROFILE

Continue the existing EcoTrail 2.0 Figma project from Phases 1–4.

IMPORTANT:
Do NOT redesign or replace previous phases.
Reuse the existing EcoTrail design system, components, typography, spacing, color tokens, cards, buttons, badges, navigation patterns, maps, score components, Eco-Twin components, accessibility states, and interaction patterns established earlier.

This is a continuation of the same product.

PHASE 5 GOAL

Complete the post-planning travel experience.

The main journey for this phase is:

SELECT OPTION
→ VERIFY ACCESSIBILITY
→ BUILD ITINERARY
→ FOLLOW TRIP
→ SAVE TRIP
→ VIEW TRIPS
→ UNDERSTAND ECO IMPACT
→ MANAGE PROFILE & PREFERENCES

The experience must feel production-ready, trustworthy, accessible, intelligent, calm and practical.

Do not introduce unnecessary new features.

--------------------------------------------------
1. ACCESSIBILITY PROFILE
--------------------------------------------------

Create a dedicated Accessibility Profile experience.

Purpose:
Allow travelers to define accessibility requirements that can influence recommendations and itinerary planning.

Create:

• Accessibility Profile Overview
• Mobility Preferences
• Step-Free Access
• Wheelchair Requirements
• Elevator / Lift Preference
• Accessible Bathroom Requirement
• Accessible Transport Preference
• Visual Accessibility Preferences
• Hearing Accessibility Preferences
• Cognitive / Sensory Preferences
• Assistance Requirements
• Additional Notes
• Privacy / Sharing Controls
• Save Changes
• Profile Updated Confirmation

Use respectful and inclusive language.

Include:

"Prefer not to specify"

Never force a user to disclose accessibility information.

Clearly communicate:

"Your accessibility preferences are used to personalize recommendations."

Privacy copy:

"Accessibility information is sensitive. You control what is stored and shared."

Do not expose raw accessibility information publicly.

--------------------------------------------------
2. ACCESSIBILITY EVIDENCE & VERIFICATION
--------------------------------------------------

Create a clear evidence system.

Accessibility evidence states:

• Verified
• Business Declared
• OSM Supported
• AI Supported
• Unknown
• Conflicting
• Needs Review

Each evidence state must have:

• Status badge
• Short explanation
• Evidence source
• Confidence/context
• User-friendly interpretation

Example:

VERIFIED
"Supported by submitted visual evidence."

BUSINESS DECLARED
"Accessibility information provided by the property."

OSM SUPPORTED
"Accessibility-related map data is available."

UNKNOWN
"Accessibility information could not be confirmed."

CONFLICTING
"Different sources provide inconsistent information."

Avoid presenting uncertain accessibility information as fact.

--------------------------------------------------
3. PHOTO VERIFICATION WORKFLOW
--------------------------------------------------

Create a complete accessibility photo verification flow.

Screens:

1. Upload Accessibility Photo
2. Photo Preview
3. Evidence Details
4. Verification Processing
5. Verification Result

Upload screen:

• Drag/drop or upload area
• Camera/upload option
• Supported image formats
• Privacy explanation
• Consent checkbox
• Continue button

Evidence Details:

Ask what the photo demonstrates:

• Entrance
• Ramp
• Elevator
• Accessible Bathroom
• Parking
• Room Access
• Other

Verification Processing:

Show:

"Analyzing accessibility evidence..."

Use a lightweight AI processing state.

Result states:

• Verified
• Needs Review
• Insufficient Evidence
• Conflicting
• Unable to Verify

For each result explain:

What was detected
What remains uncertain
What the user should do next

Do not imply that AI verification is absolute.

--------------------------------------------------
4. BUILD ITINERARY
--------------------------------------------------

Continue directly from Phase 4:

Recommendation
→ Select Option
→ Build My Itinerary

Create a complete itinerary experience.

Desktop layout:

• Top trip header
• Date/day navigation
• Main timeline
• Map panel
• Trip summary
• Accessibility indicators
• Carbon information
• Edit controls

Trip header should contain:

• Destination
• Dates
• Travelers
• Green & Accessible Score
• Estimated CO2e
• Eco-Twin indicator
• Save Trip

--------------------------------------------------
5. DAY-BY-DAY ITINERARY
--------------------------------------------------

Create day-by-day itinerary views.

Example structure:

DAY 1
Arrival

08:00 — Departure
10:45 — Train Arrival
11:15 — Accessible Shuttle
12:00 — Hotel Check-in
14:00 — Lunch
15:30 — Activity
18:30 — Free Time

Each timeline item should show:

• Time
• Category
• Location
• Duration
• Cost when relevant
• Accessibility status
• Carbon contribution when relevant
• Verification/source status

Categories:

• Transport
• Accommodation
• Activity
• Meal
• Free Time

Make the itinerary scannable.

--------------------------------------------------
6. ITINERARY ACCESSIBILITY
--------------------------------------------------

Accessibility must be integrated directly into itinerary items.

Examples:

"Step-free entrance — Verified"

"Accessible room — Business Declared"

"Walking segment — Accessibility Unknown"

"Elevator access — OSM Supported"

Allow the user to open an accessibility detail panel.

Accessibility detail panel should explain:

• Requirement
• Status
• Evidence
• Confidence
• Source
• Last checked when available

Do not use accessibility as decorative badges only.

--------------------------------------------------
7. ITINERARY MAP
--------------------------------------------------

Create a synchronized map experience.

The map must reflect the selected itinerary segment.

Show:

• Transport route
• Walking connections
• Accommodation
• Activities
• Accessibility-related locations where available

Interaction:

Selecting a timeline item highlights its map segment.

Selecting a map location highlights the corresponding itinerary item.

Use Leaflet/OpenStreetMap-compatible visual structure.

Do not imply unsupported routing or accessibility verification.

--------------------------------------------------
8. ITINERARY EDITING
--------------------------------------------------

Create editing states.

Users can:

• Change activity
• Remove activity
• Add activity
• Change timing
• Reorder itinerary items
• Regenerate a section with AI assistance

AI-assisted regeneration should be clearly separated from deterministic data.

Example:

"Make Day 2 less tiring"

AI understands the request and proposes changes.

The interface must clearly show:

"AI suggestion"

and allow:

• Apply
• Edit
• Dismiss

AI must not invent official schedules, prices, accessibility verification or carbon values.

--------------------------------------------------
9. MOBILE ITINERARY
--------------------------------------------------

Create mobile-first itinerary layouts.

Mobile structure:

• Trip header
• Date selector
• Timeline
• Map toggle
• Accessibility status
• Carbon summary
• Edit controls

Use bottom sheets for:

• Map details
• Accessibility evidence
• Activity details
• Edit options

Ensure the timeline remains easy to scan.

--------------------------------------------------
10. MY TRIPS
--------------------------------------------------

Create:

• My Trips Overview
• Upcoming
• Ongoing
• Completed
• Saved

Trip cards should show:

• Destination
• Dates
• Travelers
• Green & Accessible Score
• Estimated CO2e
• Eco-Twin indicator
• Accessibility readiness
• Trip status

Trip statuses:

• Draft
• Planned
• Upcoming
• Ongoing
• Completed
• Saved

Create meaningful empty states.

Examples:

"No upcoming trips"

"Your next journey will appear here."

Include CTA:

"Plan a Trip"

--------------------------------------------------
11. TRIP DETAIL
--------------------------------------------------

Create a detailed Trip Detail screen.

Include:

• Trip summary
• Dates
• Destination
• Travelers
• Green & Accessible Score
• Carbon estimate
• Standard vs Eco-Twin summary
• Itinerary preview
• Accessibility readiness
• Saved recommendations
• Map
• Edit Trip
• Share Trip
• Delete Trip

Sharing must respect privacy.

Public sharing must NOT automatically expose raw accessibility disclosures.

--------------------------------------------------
12. ECO INSIGHTS
--------------------------------------------------

Create a dedicated Eco Insights experience.

Purpose:

Help users understand the environmental impact of their travel choices.

Create:

• Total estimated CO2e
• Carbon trend
• Standard vs EcoTrail comparison
• Estimated CO2e avoided
• Sustainable travel choices
• Accessibility + sustainability insights
• Recent trip impact
• Lifetime travel impact

Use clear visualizations.

Do not exaggerate precision.

Always label values as:

"Estimated CO2e"

Where appropriate explain:

"Based on activity data and emission factors."

Create a methodology panel:

Activity Data × Emission Factor = Estimated CO2e

Show an example calculation.

--------------------------------------------------
13. ECO IMPACT VISUALIZATION
--------------------------------------------------

Create:

• Carbon trend chart
• Trip comparison
• Standard vs EcoTrail comparison
• Transport mode contribution
• Monthly/yearly impact summary

Use simple readable data visualization.

Avoid excessive charts.

Prioritize understanding over decoration.

Include educational microcopy.

Example:

"Choosing rail instead of air travel can significantly reduce estimated trip emissions."

Do not claim a reduction unless calculated from actual itinerary data.

--------------------------------------------------
14. PROFILE
--------------------------------------------------

Create a complete Profile experience.

Sections:

PERSONAL INFORMATION

• Name
• Email
• Profile image
• Account status

TRAVEL PREFERENCES

• Travel style
• Budget
• Convenience
• Sustainability preferences

ACCESSIBILITY

• Accessibility profile
• Verification status
• Privacy controls

TRAVEL HISTORY

• Trips
• Saved destinations
• Eco impact

ACCOUNT

• Notifications
• Privacy
• Security
• Connected services
• Logout

--------------------------------------------------
15. SETTINGS
--------------------------------------------------

Create settings screens for:

• Account
• Notifications
• Privacy
• Accessibility data
• AI personalization
• Data sharing
• Appearance
• Language
• Logout

Make privacy controls understandable.

Avoid technical jargon.

--------------------------------------------------
16. PRIVACY & DATA CONTROL
--------------------------------------------------

Create a dedicated privacy/data-control experience.

Clearly distinguish:

Stored
Shared
Used for personalization
Used for verification

Accessibility information should be treated as sensitive.

Create controls such as:

"Use accessibility preferences for recommendations"

"Allow accessibility evidence to be used for verification"

"Share trip publicly"

Explain consequences before enabling sharing.

Never automatically expose sensitive accessibility details in public trip links.

--------------------------------------------------
17. OFFLINE EXPERIENCE
--------------------------------------------------

Create offline states for important travel information.

Include:

• Offline banner
• Cached itinerary
• Cached trip details
• Offline map state
• Reconnection state
• Syncing state
• Sync complete

Example:

"You're offline. Your saved itinerary is still available."

Clearly distinguish:

Available offline
Requires connection

--------------------------------------------------
18. LOADING / ERROR / EMPTY STATES
--------------------------------------------------

Create reusable states for Phase 5.

Loading:

• Skeleton itinerary
• Skeleton trip cards
• Skeleton insights
• Verification processing

Error:

• Itinerary unavailable
• Verification failed
• Map unavailable
• Sync failed
• Trip loading failed

Empty:

• No trips
• No saved trips
• No eco insights
• No accessibility profile
• No verification evidence

Every error must provide a useful next action.

--------------------------------------------------
19. COMPLETE PHASE 5 USER FLOW
--------------------------------------------------

Connect the prototype flow:

Phase 4:

Recommendation
→ Select Option
→ Build My Itinerary

Phase 5:

Build My Itinerary
→ Itinerary
→ Accessibility Details
→ Edit Itinerary
→ Save Trip

Then:

Save Trip
→ My Trips
→ Trip Detail
→ Start/Continue Trip

Profile:

Home
→ Profile
→ Accessibility Profile
→ Privacy Controls
→ Preferences

Accessibility verification:

Accessibility Profile
→ Upload Evidence
→ Preview
→ Evidence Details
→ Verification Processing
→ Result

Eco:

Trip Detail
→ Eco Insights
→ Carbon Breakdown
→ Methodology

--------------------------------------------------
20. NAVIGATION
--------------------------------------------------

Authenticated navigation should consistently include:

• Home
• Discover
• Planner
• My Trips
• Eco Insights
• Profile

Desktop:

Persistent sidebar or existing Phase 3 navigation pattern.

Mobile:

Bottom navigation or existing mobile navigation pattern.

Do not redesign the navigation system.

--------------------------------------------------
21. RESPONSIVE DESIGN
--------------------------------------------------

Design and connect:

Desktop:
1440px
1280px
1024px

Tablet:
768px

Mobile:
430px
390px

Itinerary, profile and accessibility workflows must be especially strong on mobile.

Do not simply shrink desktop layouts.

Recompose layouts for mobile.

--------------------------------------------------
22. ACCESSIBILITY / WCAG
--------------------------------------------------

Maintain WCAG 2.2 AA.

Ensure:

• Sufficient contrast
• Keyboard navigation
• Visible focus states
• Screen-reader-friendly structure
• Clear labels
• Error messages
• Large touch targets
• No color-only meaning
• Reduced motion support

Accessibility must apply to the product UI itself.

--------------------------------------------------
23. TRUST & EVIDENCE SYSTEM
--------------------------------------------------

Maintain the same trust language established in previous phases.

Important rule:

AI explanation ≠ verification.

AI may:

• Understand natural language
• Extract requirements
• Explain recommendations
• Suggest itinerary adjustments

AI must NOT be presented as the authoritative source for:

• Official schedules
• Official prices
• Accessibility verification
• Carbon factors
• Government information

Always show evidence/source context where appropriate.

--------------------------------------------------
24. MICROCOPY
--------------------------------------------------

Use concise, human language.

Examples:

"Your trip is ready."

"Accessibility verified."

"Some details still need confirmation."

"Estimated CO2e"

"See how we calculated this"

"AI suggestion"

"Business declared"

"Supported by map data"

"Information unavailable"

"Needs review"

Avoid exaggerated claims such as:

"100% sustainable"

"Guaranteed accessible"

"Perfect trip"

--------------------------------------------------
25. VISUAL DIRECTION
--------------------------------------------------

Continue the established Figma EcoTrail visual language from Phases 1–4.

The experience should feel:

• Premium
• Structured
• Intelligent
• Calm
• Human
• Trustworthy
• Sustainable
• Accessible
• Data-driven
• Production-ready

Do NOT copy the Google Stitch version.

Figma must remain visually independent from the Stitch implementation.

Use hierarchy and whitespace rather than excessive decoration.

Avoid:

• Excessive gradients
• Excessive glassmorphism
• Overloaded dashboards
• Too many floating cards
• Decorative visuals without function
• Dense data walls

--------------------------------------------------
26. COMPONENT REUSE
--------------------------------------------------

Reuse Phase 1–4 components wherever possible.

Extend existing components rather than creating visually inconsistent alternatives.

Important reusable components:

• Navigation
• Buttons
• Cards
• Status badges
• Accessibility badges
• Verification badges
• Score cards
• Eco-Twin comparison
• Show Your Math
• Map
• Timeline
• Modal
• Bottom sheet
• AI state
• Toast
• Tooltip
• Empty state
• Error state
• Loading skeleton

Create variants where necessary.

--------------------------------------------------
27. DEVELOPER HANDOFF
--------------------------------------------------

Make the Phase 5 designs implementation-aware.

The final UI should map naturally to:

Frontend:
React 18
Vite
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

Data:
PostgreSQL

Accessibility:
OSM / Overpass
Business-declared evidence
Photo verification

Weather:
OpenWeatherMap

Carbon:
Emission-factor-based calculation

Do not design interactions that require unsupported technology.

--------------------------------------------------
28. FINAL PHASE 5 PROTOTYPE
--------------------------------------------------

The final connected experience should demonstrate:

Landing
→ Authentication
→ Onboarding
→ Home
→ AI Travel Command Center
→ Discover
→ Destination Intelligence
→ Planner
→ Recommendations
→ Green & Accessible Score
→ Eco-Twin
→ Show Your Math
→ Select Option
→ Build Itinerary
→ Accessibility Verification
→ Itinerary
→ Save Trip
→ My Trips
→ Eco Insights
→ Profile
→ Accessibility Profile
→ Privacy Controls

The most important demonstrated journey is:

ASK
→ PLAN
→ COMPARE
→ VERIFY
→ CHOOSE
→ ORGANIZE
→ SAVE
→ UNDERSTAND IMPACT

--------------------------------------------------
29. DO NOT ADD IN THIS PHASE
--------------------------------------------------

Do NOT introduce:

• New booking marketplace
• Payment system
• Admin dashboard
• Hotel owner dashboard
• Complex social network
• Loyalty marketplace
• New AI agents
• New recommendation algorithms
• New authentication system
• New visual design language
• Features unrelated to the current EcoTrail workflow

Keep the product focused.

--------------------------------------------------
FINAL OBJECTIVE
--------------------------------------------------

Phase 5 should transform EcoTrail from a recommendation/planning interface into a complete travel-management experience.

The user should be able to:

1. Define accessibility needs
2. Verify accessibility evidence
3. Build an itinerary
4. Understand every itinerary segment
5. Edit the trip
6. Save the trip
7. Manage trips
8. Understand environmental impact
9. Manage preferences and privacy
10. Continue the journey confidently

The final experience should communicate:

"EcoTrail doesn't just recommend a trip.
It helps you understand, verify, organize and travel it."
