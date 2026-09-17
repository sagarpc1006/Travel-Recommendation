EcoTrail 2.0 — PHASE 9
PRODUCTION UI SPECIFICATION + DEVELOPER HANDOFF + DATA MAPPING

Continue the existing EcoTrail 2.0 Figma project from Phases 1–8.

IMPORTANT:

The product concept, UX, visual design, responsive layouts, prototype and edge-case handling are already established.

This phase is NOT a redesign.

This phase is NOT a feature expansion.

Do NOT change the established EcoTrail visual language.

Do NOT add new product modules.

The purpose of Phase 9 is to convert the approved Figma design into a highly implementation-ready specification that a React + Django development team can directly follow.

Think:

DESIGN
→ COMPONENT
→ STATE
→ DATA
→ API
→ USER ACTION
→ RESPONSE

--------------------------------------------------
1. PRODUCTION SCREEN INVENTORY
--------------------------------------------------

Create a final screen inventory.

Group all screens into:

A. ENTRY
• Landing
• Login
• Signup
• Forgot Password
• Email Verification
• Reset Confirmation

B. ONBOARDING
• Welcome
• Travel Preferences
• Sustainability Preferences
• Accessibility Preferences
• Budget
• Convenience
• Summary

C. CORE APP
• Home
• AI Travel Command Center
• Discover
• Destination Intelligence

D. PLANNING
• Planner
• Structured Requirements
• Recommendations
• Green & Accessible Score
• Eco-Twin
• Show Your Math
• Option Comparison

E. TRAVEL
• Build Itinerary
• Itinerary
• Accessibility Details
• Accessibility Verification
• Trip Detail

F. MANAGEMENT
• My Trips
• Saved Trips
• Upcoming Trips
• Completed Trips

G. IMPACT
• Eco Insights
• Carbon Breakdown
• Methodology

H. ACCOUNT
• Profile
• Preferences
• Accessibility Profile
• Privacy
• Notifications
• Settings

I. SYSTEM STATES
• Loading
• Empty
• Error
• Offline
• Sync
• Unknown
• Conflicting
• Needs Review

Ensure every important screen is represented once.

--------------------------------------------------
2. SCREEN SPECIFICATION
--------------------------------------------------

For each major screen, create a specification area containing:

SCREEN NAME

PURPOSE

PRIMARY USER ACTION

SECONDARY ACTIONS

KEY COMPONENTS

DATA DISPLAYED

USER INPUT

SUCCESS STATE

ERROR STATE

EMPTY STATE

LOADING STATE

MOBILE BEHAVIOR

DESKTOP BEHAVIOR

Do not write long paragraphs.

Use compact developer-friendly annotations.

--------------------------------------------------
3. COMPONENT ARCHITECTURE
--------------------------------------------------

Audit all components.

Organize into:

FOUNDATION

• Colors
• Typography
• Spacing
• Radius
• Elevation
• Icons

CORE

• Button
• Input
• Select
• Checkbox
• Radio
• Toggle
• Tabs
• Badge
• Tooltip

TRAVEL

• Destination Card
• Recommendation Card
• Transport Card
• Accommodation Card
• Activity Card
• Itinerary Item
• Map
• Route Segment

INTELLIGENCE

• AI Input
• AI Response
• AI Processing
• Recommendation Explanation
• Score
• Eco-Twin
• Show Your Math

ACCESSIBILITY

• Accessibility Badge
• Evidence Badge
• Evidence Detail
• Verification Status
• Verification Result

SYSTEM

• Toast
• Modal
• Bottom Sheet
• Skeleton
• Error State
• Empty State
• Offline Banner

--------------------------------------------------
4. COMPONENT VARIANTS
--------------------------------------------------

Ensure every important component has variants.

BUTTON

• Primary
• Secondary
• Ghost
• Destructive
• Loading
• Disabled

INPUT

• Default
• Focus
• Filled
• Error
• Disabled

CARD

• Default
• Hover
• Selected
• Disabled

BADGE

• Verified
• Business Declared
• OSM Supported
• AI Supported
• Unknown
• Conflicting
• Needs Review

AI

• Idle
• Understanding
• Searching
• Comparing
• Calculating
• Ready
• Error

Do not create visually unrelated variants.

--------------------------------------------------
5. API / DATA BOUNDARY MAPPING
--------------------------------------------------

Create a developer reference showing:

USER INTERFACE
↓
REACT COMPONENT
↓
API REQUEST
↓
DJANGO REST FRAMEWORK
↓
SERVICE / LOGIC
↓
DATABASE / EXTERNAL SOURCE
↓
API RESPONSE
↓
REACT UI

Do not invent API endpoints.

If an exact endpoint is not known, label it:

"Backend endpoint — implementation reference"

rather than fabricating a URL.

--------------------------------------------------
6. AUTHENTICATION MAPPING
--------------------------------------------------

Document the authentication boundary.

Show:

USER
↓
React Authentication UI
↓
Firebase Authentication
↓
Authenticated Session
↓
Django Backend
↓
Application Data

Clarify visually:

Firebase handles authentication.

Django handles application-side data and business functionality.

Do NOT introduce Django JWT if it is not part of the existing implementation.

--------------------------------------------------
7. AI DATA FLOW
--------------------------------------------------

Create a simple AI interaction diagram.

USER NATURAL LANGUAGE REQUEST
↓
REACT AI INPUT
↓
DJANGO REST API
↓
REQUIREMENT EXTRACTION / ORCHESTRATION
↓
GEMINI
↓
STRUCTURED TRAVEL INTENT
↓
TRAVEL / ACCESSIBILITY / WEATHER / OTHER DATA
↓
RECOMMENDATION LOGIC
↓
EXPLAINABLE RESULT
↓
REACT UI

Important:

AI should not directly invent authoritative travel information.

Show the separation between:

LANGUAGE INTELLIGENCE

and

DATA / DECISION LOGIC

--------------------------------------------------
8. RECOMMENDATION DATA MAPPING
--------------------------------------------------

For the recommendation card, document the expected conceptual fields:

• Destination
• Transport
• Accommodation
• Travel time
• Cost
• Estimated CO2e
• Accessibility
• Green & Accessible Score
• Evidence status
• Recommendation explanation

Clearly distinguish:

USER INPUT

from

CALCULATED DATA

from

EXTERNAL DATA

from

AI EXPLANATION

--------------------------------------------------
9. ECO-TWIN DATA MAPPING
--------------------------------------------------

Create a specification for Eco-Twin.

Inputs:

• Origin
• Destination
• Dates
• Travelers
• Budget
• Sustainability preference
• Accessibility preference
• Convenience preference

Compare:

STANDARD OPTION

versus

ECO-TWIN OPTION

Display:

• Transport combination
• Cost
• Travel time
• Estimated CO2e
• Accessibility
• Overall score

Show:

"Why this option?"

The interface must make it clear that Eco-Twin is a recommendation generated from available options and scoring logic.

--------------------------------------------------
10. SCORE SPECIFICATION
--------------------------------------------------

Document the Green & Accessible Score.

Show conceptual factors:

Sustainability
Accessibility
Cost
Time / Convenience

If the established implementation uses:

40% Sustainability
30% Accessibility
15% Cost
15% Time / Convenience

show those weights consistently.

Do not silently change the weighting model.

If weights are user-adjustable, show:

DEFAULT WEIGHTS
→ USER ADJUSTMENT
→ RECALCULATION
→ UPDATED SCORE

--------------------------------------------------
11. SHOW YOUR MATH SPECIFICATION
--------------------------------------------------

Create a developer reference for carbon calculation presentation.

Core model:

ACTIVITY DATA
×
EMISSION FACTOR
=
ESTIMATED CO2e

Show:

Input
→ Calculation
→ Result

For multiple segments:

Segment 1
+
Segment 2
+
Segment 3
=
Total Estimated CO2e

Include:

• Activity
• Distance/activity amount
• Emission factor
• Estimated result
• Source/methodology

Do not hardcode demo values into the product specification unless explicitly identified as demo data.

--------------------------------------------------
12. ACCESSIBILITY DATA MAPPING
--------------------------------------------------

Create a visual reference showing:

ACCESSIBILITY REQUIREMENT
↓
AVAILABLE EVIDENCE
↓
EVIDENCE STATUS
↓
USER-FACING RESULT

Evidence sources:

• Verified
• Business Declared
• OSM Supported
• AI Supported
• Unknown
• Conflicting
• Needs Review

Make clear:

AI interpretation does not equal independent verification.

--------------------------------------------------
13. PHOTO VERIFICATION MAPPING
--------------------------------------------------

Document:

UPLOAD
↓
PHOTO PREVIEW
↓
EVIDENCE TYPE
↓
VERIFICATION PROCESSING
↓
RESULT

Possible result:

• Verified
• Needs Review
• Insufficient Evidence
• Conflicting
• Unable to Verify

Show which states allow:

Continue

versus

Request More Evidence

--------------------------------------------------
14. ITINERARY DATA STRUCTURE
--------------------------------------------------

Create a visual conceptual data structure.

TRIP

→ Trip Information

→ Days

→ Timeline Items

Each itinerary item may contain:

• Time
• Location
• Category
• Duration
• Cost
• Transport
• Accessibility status
• Evidence status
• Estimated CO2e
• Map location

Do not create backend code.

This is a UI/data contract reference.

--------------------------------------------------
15. MY TRIPS DATA MAPPING
--------------------------------------------------

Trip card should conceptually receive:

• Trip name
• Destination
• Dates
• Status
• Green & Accessible Score
• Estimated CO2e
• Eco-Twin indicator
• Accessibility readiness

States:

Draft
Planned
Upcoming
Ongoing
Completed
Saved

Make the state visually consistent everywhere.

--------------------------------------------------
16. ECO INSIGHTS DATA MAPPING
--------------------------------------------------

Show conceptual data:

• Current trip CO2e
• Previous trip CO2e
• Standard comparison
• Estimated CO2e avoided
• Carbon trend
• Transport contribution
• Sustainability insights

Always label:

Estimated CO2e

Avoid implying exact measurement.

--------------------------------------------------
17. WEATHER DATA UX
--------------------------------------------------

Document how weather information appears.

Show:

• Current/forecast condition
• Temperature
• Relevant travel context
• Timestamp when available

If unavailable:

"We couldn't load current weather."

Do not replace unavailable weather with fabricated information.

--------------------------------------------------
18. LOADING / ERROR / EMPTY STATE MATRIX
--------------------------------------------------

Create a matrix:

FEATURE | LOADING | EMPTY | ERROR | OFFLINE

Rows:

AI
Discover
Destination
Planner
Recommendations
Map
Weather
Accessibility
Verification
Itinerary
My Trips
Eco Insights
Profile

Ensure every major feature has a defined UX state.

--------------------------------------------------
19. OFFLINE DATA MATRIX
--------------------------------------------------

Clearly distinguish:

AVAILABLE OFFLINE

• Saved itinerary
• Saved trip details
• Previously cached information

REQUIRES CONNECTION

• New AI requests
• Fresh weather
• New recommendations
• Live external information
• New verification processing

Show this distinction visually.

--------------------------------------------------
20. RESPONSIVE SPECIFICATION
--------------------------------------------------

Create a responsive reference.

BREAKPOINTS:

1440
1280
1024
768
430
390

For major layouts document:

DESKTOP
→ Multi-column

TABLET
→ Reduced columns

MOBILE
→ Single column / stacked / bottom sheet

Focus especially on:

• Planner
• Recommendation comparison
• Eco-Twin
• Itinerary
• Accessibility
• Profile

--------------------------------------------------
21. ACCESSIBILITY IMPLEMENTATION NOTES
--------------------------------------------------

For every interactive component document:

• Keyboard focus
• Visible focus
• Label
• Error message
• Touch target
• Screen reader meaning
• Disabled behavior

Maintain WCAG 2.2 AA.

Do not rely only on color.

--------------------------------------------------
22. MOTION SPECIFICATION
--------------------------------------------------

Document only meaningful motion.

Examples:

AI processing
Score recalculation
Eco-Twin transition
Modal
Bottom sheet
Toast
Save action
Verification processing

For each specify:

Trigger
Motion purpose
Approximate behavior
Reduced-motion behavior

Do not over-animate the product.

--------------------------------------------------
23. SECURITY / PRIVACY UX
--------------------------------------------------

Document privacy-sensitive interfaces.

Especially:

Accessibility preferences
Accessibility evidence
Trip sharing
Profile information

Create clear states for:

Private
Shared
Public

Do not expose raw sensitive accessibility information through public trip sharing.

--------------------------------------------------
24. FRONTEND IMPLEMENTATION GUIDANCE
--------------------------------------------------

Create a concise mapping:

FIGMA AREA
→ REACT IMPLEMENTATION CONCEPT

Examples:

Navigation
→ Shared Layout

AI Command Center
→ Reusable AI component

Recommendation Card
→ Data-driven component

Eco-Twin
→ Reusable comparison component

Itinerary Item
→ Reusable timeline component

Accessibility Badge
→ Status component

Map
→ Leaflet / React-Leaflet component

Use component reuse wherever possible.

--------------------------------------------------
25. BACKEND IMPLEMENTATION AWARENESS
--------------------------------------------------

Create a simple reference:

React
↓
Axios
↓
Django REST Framework
↓
Application Services
↓
PostgreSQL / External APIs

External context may include:

• Gemini
• OpenStreetMap / Overpass
• Weather
• Official travel information
• Carbon factors

Do not claim a service is implemented unless it exists in the actual project.

--------------------------------------------------
26. DESIGN QA
--------------------------------------------------

Perform a final design QA pass.

Check:

[ ] No inconsistent buttons

[ ] No inconsistent cards

[ ] No inconsistent badges

[ ] No inconsistent spacing

[ ] No duplicate component definitions

[ ] No missing states

[ ] No broken prototype links

[ ] No inaccessible interactions

[ ] No clipped mobile content

[ ] No unnecessary horizontal scrolling

[ ] No fake data presented as live

[ ] No unsupported claims

[ ] No missing empty states

[ ] No missing error states

--------------------------------------------------
27. DEVELOPER HANDOFF ANNOTATIONS
--------------------------------------------------

Add concise annotations only where developers need clarification.

Use tags:

COMPONENT
STATE
DATA
INTERACTION
API
RESPONSIVE
ACCESSIBILITY
PRIVACY
VALIDATION

Avoid covering the UI with excessive notes.

Keep annotations outside the main visual design.

--------------------------------------------------
28. FINAL HANDOFF PACKAGE
--------------------------------------------------

Create final Figma sections:

01 — Final Product
02 — Design System
03 — Components
04 — Screen Specifications
05 — Responsive Specifications
06 — State Matrix
07 — Data Mapping
08 — AI Boundary
09 — Carbon / Show Your Math
10 — Accessibility Evidence
11 — Prototype
12 — Developer Handoff

--------------------------------------------------
29. IMPORTANT PRODUCT RULE
--------------------------------------------------

Never allow the design specification to imply capabilities that the actual system does not provide.

Examples:

Do not imply booking if booking is not implemented.

Do not imply verified accessibility when evidence is unknown.

Do not imply exact carbon measurement.

Do not imply AI is authoritative.

Do not imply live data when the UI is showing cached/demo information.

The Figma file must describe a trustworthy product.

--------------------------------------------------
30. FINAL DESIGN PRINCIPLE
--------------------------------------------------

The final implementation should preserve the original product philosophy:

AI understands the traveler.

Data grounds the information.

Deterministic logic evaluates the options.

Evidence communicates trust.

The traveler makes the final decision.

--------------------------------------------------
FINAL OBJECTIVE
--------------------------------------------------

At the end of Phase 9, a developer should be able to open the Figma file and understand:

WHAT TO BUILD
↓
WHAT EACH COMPONENT DOES
↓
WHAT DATA IT NEEDS
↓
WHAT HAPPENS WHEN THE USER INTERACTS
↓
WHAT HAPPENS WHEN SOMETHING FAILS
↓
HOW IT BEHAVES ON MOBILE
↓
HOW TRUST / ACCESSIBILITY / CARBON INFORMATION IS COMMUNICATED

The product should now be:

DESIGNED
✓

VALIDATED
✓

RESPONSIVE
✓

ACCESSIBLE
✓

PROTOTYPED
✓

DOCUMENTED
✓

IMPLEMENTATION-READY
✓

FINAL PRODUCT MESSAGE:

"EcoTrail turns complex travel decisions into a clear,
evidence-aware and explainable journey —
while keeping the traveler in control."

END PHASE 9.