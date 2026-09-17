EcoTrail 2.0 — PHASE 11
FRONTEND IMPLEMENTATION BLUEPRINT + COMPONENT CONTRACTS + RESPONSIVE RULES

Continue the existing EcoTrail 2.0 Figma project from Phases 1–10.

IMPORTANT:

The product design is now FROZEN.

Do NOT redesign the application.

Do NOT introduce new features.

Do NOT create a new visual language.

Do NOT modify the established navigation, colors, typography, layouts, product workflow, Eco-Twin, scoring, accessibility model or overall UX.

Phase 11 is an IMPLEMENTATION BLUEPRINT.

The objective is to make the Figma file directly useful to the React development team.

Think:

APP SCREEN
→ PAGE STRUCTURE
→ COMPONENT TREE
→ COMPONENT PROPS
→ STATE
→ USER ACTION
→ DATA
→ RESPONSIVE BEHAVIOR

--------------------------------------------------
1. IMPLEMENTATION PRINCIPLE
--------------------------------------------------

Every approved screen should answer:

WHAT IS THIS SCREEN?

WHAT COMPONENTS MAKE IT?

WHAT DATA DOES IT DISPLAY?

WHAT ACTIONS CAN THE USER TAKE?

WHAT STATES CAN IT ENTER?

HOW DOES IT BEHAVE ON MOBILE?

Do not add visual decoration.

--------------------------------------------------
2. FINAL APPLICATION SHELL
--------------------------------------------------

Document the application shell.

Structure:

App
│
├── Public Routes
│   ├── Landing
│   ├── Login
│   ├── Signup
│   └── Onboarding
│
└── Authenticated App
    ├── Navigation
    ├── Page Content
    ├── Global Notifications
    └── Global Modals / Sheets

Show:

Desktop shell

Sidebar / navigation
+
Main content

Mobile shell

Header
+
Main content
+
Bottom navigation

Use the navigation already approved in previous phases.

--------------------------------------------------
3. ROUTE / PAGE INVENTORY
--------------------------------------------------

Create a developer-facing route map.

Conceptually organize:

PUBLIC

Landing
Login
Signup
Forgot Password
Email Verification
Onboarding

AUTHENTICATED

Home
Discover
Destination
Planner
Recommendations
Eco-Twin
Itinerary
My Trips
Trip Detail
Eco Insights
Profile
Accessibility
Privacy
Settings

Do not invent exact URL paths if they are not already established.

If showing route examples, label them as:

"Suggested implementation route"

--------------------------------------------------
4. HOME COMPONENT BLUEPRINT
--------------------------------------------------

Break Home into:

HomePage
│
├── Header
├── Greeting
├── AICommandCenter
├── QuickPrompts
├── ContinuePlanning
├── RecommendedTrips
├── ExploreDestinations
├── EcoImpactSummary
├── WeatherCard
└── RecentActivity

For each component document:

Purpose
Inputs
Primary action
States

Do not redesign these components.

--------------------------------------------------
5. AI COMMAND CENTER CONTRACT
--------------------------------------------------

Document:

AICommandCenter

States:

Idle
Focused
Typing
Understanding
Searching
Comparing
Calculating
Ready
No Results
Error

Conceptual inputs:

• User text
• Existing preferences
• Trip context

Conceptual outputs:

• Structured travel requirements
• Recommendation request
• Explanation

User actions:

• Submit
• Edit request
• Retry
• Continue manually

Important boundary:

AI understands language.

AI does NOT independently establish:

• Official prices
• Official schedules
• Carbon factors
• Accessibility verification

--------------------------------------------------
6. PLANNER COMPONENT TREE
--------------------------------------------------

Document:

PlannerPage
│
├── RequirementSummary
├── RequirementEditor
├── MapPanel
├── RecommendationList
│   └── RecommendationCard
├── ScorePanel
├── EcoTwin
├── ShowYourMath
└── PrimaryAction

Primary flow:

Requirements
→ Options
→ Score
→ Eco-Twin
→ Carbon explanation
→ Selection

--------------------------------------------------
7. REQUIREMENT MODEL
--------------------------------------------------

Visually document the conceptual travel requirement object.

Include:

Origin
Destination
Dates
Duration
Travelers
Budget
Sustainability preference
Accessibility preference
Convenience preference

Distinguish:

USER-PROVIDED
CALCULATED
EXTERNAL
AI-INTERPRETED

Do not imply that AI-created values are authoritative.

--------------------------------------------------
8. RECOMMENDATION CARD CONTRACT
--------------------------------------------------

Document RecommendationCard.

Display:

Destination
Transport
Accommodation
Duration
Cost
Estimated CO2e
Accessibility
Green & Accessible Score
Evidence
Why this option?

States:

Default
Hover
Selected
Loading
Unavailable
Partial Data

Actions:

View Details
Compare
Select

--------------------------------------------------
9. ECO-TWIN COMPONENT CONTRACT
--------------------------------------------------

Document EcoTwinComparison.

Inputs:

Standard Option
Alternative Option
Score information
Carbon information
Accessibility information
Cost
Time

Display:

STANDARD

versus

ECO-TWIN

Required comparison:

Cost
Travel Time
Estimated CO2e
Accessibility
Score

Actions:

Select Standard
Select Eco-Twin
View Details

Do not present Eco-Twin as guaranteed to exist.

State:

"No meaningful Eco-Twin found"

must also exist.

--------------------------------------------------
10. SCORE COMPONENT CONTRACT
--------------------------------------------------

Document:

GreenAccessibleScore

Display:

Overall Score

Breakdown:

Sustainability
Accessibility
Cost
Time / Convenience

If the established system uses:

40% Sustainability
30% Accessibility
15% Cost
15% Time / Convenience

show the same weighting consistently.

If the user changes priorities:

User Preference
→ Recalculation
→ Updated Ranking
→ Updated Score

Do not change the meaning of the score.

--------------------------------------------------
11. SHOW YOUR MATH COMPONENT
--------------------------------------------------

Document:

ShowYourMath

Structure:

Activity Data
×
Emission Factor
=
Estimated CO2e

For multiple segments:

Segment
→ Calculation
→ Contribution
→ Total

Show:

Methodology
Source
Estimated result

Always communicate:

"Estimated CO2e"

Never imply laboratory-level precision.

--------------------------------------------------
12. ACCESSIBILITY COMPONENT SYSTEM
--------------------------------------------------

Document:

AccessibilityBadge
EvidenceBadge
AccessibilityDetail
VerificationStatus
VerificationResult

Evidence types:

Verified
Business Declared
OSM Supported
AI Supported
Unknown
Conflicting
Needs Review

Each badge should communicate:

Status
Meaning
Evidence source where available

AI Supported must never visually imply independent verification.

--------------------------------------------------
13. ACCESSIBILITY PROFILE COMPONENT TREE
--------------------------------------------------

Document:

AccessibilityProfilePage
│
├── ProfileSummary
├── MobilityPreferences
├── SensoryPreferences
├── AssistancePreferences
├── AdditionalNotes
├── PrivacyControls
└── SaveChanges

Support:

No disclosure
Partial disclosure
Multiple requirements
Prefer not to specify

Do not force disclosure.

--------------------------------------------------
14. PHOTO VERIFICATION COMPONENT TREE
--------------------------------------------------

Document:

AccessibilityVerification
│
├── Upload
├── Preview
├── EvidenceType
├── Processing
└── Result

Result variants:

Verified
Needs Review
Insufficient Evidence
Conflicting
Unable to Verify

Actions:

Upload Another
Continue
Review
Cancel

--------------------------------------------------
15. ITINERARY COMPONENT TREE
--------------------------------------------------

Document:

ItineraryPage
│
├── TripHeader
├── DateSelector
├── DaySection
│   └── ItineraryItem
├── MapPanel
├── AccessibilitySummary
├── CarbonSummary
└── EditControls

ItineraryItem should support:

Transport
Accommodation
Activity
Meal
Free Time

Each item may show:

Time
Location
Duration
Cost
Accessibility
Evidence
Estimated CO2e

--------------------------------------------------
16. ITINERARY EDITING CONTRACT
--------------------------------------------------

Actions:

Add
Edit
Remove
Reorder
Regenerate

AI-assisted regeneration:

User request
→ AI suggestion
→ Preview
→ Apply / Dismiss

Never silently change the itinerary.

--------------------------------------------------
17. MY TRIPS COMPONENT TREE
--------------------------------------------------

Document:

MyTripsPage
│
├── TripTabs
├── TripFilters
├── TripCardList
└── EmptyState

TripCard:

Destination
Dates
Status
Score
Estimated CO2e
Eco-Twin
Accessibility readiness

Statuses:

Draft
Planned
Upcoming
Ongoing
Completed
Saved

--------------------------------------------------
18. ECO INSIGHTS COMPONENT TREE
--------------------------------------------------

Document:

EcoInsightsPage
│
├── ImpactSummary
├── CarbonTrend
├── StandardComparison
├── TransportContribution
└── Methodology

Primary metric:

Estimated CO2e

Supporting:

Estimated CO2e avoided
Trip comparison
Trend

Avoid excessive charts.

--------------------------------------------------
19. PROFILE COMPONENT TREE
--------------------------------------------------

Document:

ProfilePage
│
├── PersonalInfo
├── TravelPreferences
├── AccessibilityProfile
├── TravelHistory
├── EcoImpact
├── Privacy
├── Notifications
└── Settings

Maintain clear separation between profile information and sensitive accessibility information.

--------------------------------------------------
20. GLOBAL STATE SYSTEM
--------------------------------------------------

Create a visual state reference.

GLOBAL:

Loading
Success
Error
Empty
Offline
Syncing
Synced

DATA:

Available
Partial
Estimated
Unknown
Conflicting
Unavailable

AI:

Idle
Processing
Ready
Error

ACCESSIBILITY:

Verified
Business Declared
OSM Supported
AI Supported
Unknown
Conflicting
Needs Review

--------------------------------------------------
21. COMPONENT STATE MATRIX
--------------------------------------------------

Create a matrix:

COMPONENT
→ DEFAULT
→ LOADING
→ SUCCESS
→ ERROR
→ EMPTY
→ DISABLED
→ MOBILE

Apply to:

Button
Input
Card
Recommendation
AI
Score
Eco-Twin
Map
Itinerary
Accessibility
Trip
Notification

--------------------------------------------------
22. RESPONSIVE COMPONENT RULES
--------------------------------------------------

Document responsive behavior.

Example:

DESKTOP

Recommendation:

2–3 column layout

MOBILE:

Stacked cards

Planner:

Desktop:
Requirements + Map + Results

Mobile:
Requirements
→ Results
→ Map toggle

Itinerary:

Desktop:
Timeline + Map

Mobile:
Timeline + Map sheet

Eco-Twin:

Desktop:
Side-by-side

Mobile:
Stacked comparison

Do not create new layouts unrelated to the approved design.

--------------------------------------------------
23. DESIGN TOKEN IMPLEMENTATION
--------------------------------------------------

Map existing Figma variables/tokens to implementation concepts.

Colors:

Primary
Surface
Background
Text
Muted
Success
Warning
Error
Info

Spacing:

4
8
12
16
24
32
48
64

Typography:

Display
Heading
Subheading
Body
Label
Caption
Data

Do not introduce new token values.

--------------------------------------------------
24. ICON SYSTEM
--------------------------------------------------

Document the approved icon usage.

Rules:

• Consistent icon family
• Consistent stroke/weight
• Consistent sizing
• No decorative icon overload
• Icons must not replace accessible labels

Important actions should have text labels where necessary.

--------------------------------------------------
25. FORM CONTRACTS
--------------------------------------------------

Document form behavior.

Forms:

Login
Signup
Onboarding
Planner
Accessibility
Profile
Settings

For every form:

Default
Focus
Filled
Error
Disabled
Loading
Success

Validation errors must be:

Specific
Readable
Near the relevant field

--------------------------------------------------
26. NOTIFICATION CONTRACT
--------------------------------------------------

Document notification types:

Success
Info
Warning
Error
Offline
Sync

Structure:

Icon
Message
Optional action
Dismiss

Examples:

"Trip saved."

"Accessibility verification requires review."

"You're offline. Your saved itinerary is still available."

--------------------------------------------------
27. MODAL / BOTTOM SHEET CONTRACT
--------------------------------------------------

Document when to use:

MODAL

For:

• Confirmation
• Destructive action
• Important decision

BOTTOM SHEET

For:

• Mobile details
• Map information
• Accessibility details
• Filters
• Secondary actions

Ensure:

• Close action
• Focus management
• Keyboard behavior
• Mobile behavior

--------------------------------------------------
28. API LOADING BEHAVIOR
--------------------------------------------------

Create a conceptual pattern:

REQUEST
→ LOADING
→ SUCCESS

or

REQUEST
→ LOADING
→ ERROR
→ RETRY

For partial services:

Some data available
+
Some data unavailable

The page should continue where possible.

--------------------------------------------------
29. OFFLINE BEHAVIOR
--------------------------------------------------

Document:

ONLINE
→ OFFLINE
→ CACHED DATA
→ CONNECTION RESTORED
→ SYNCING
→ COMPLETE

Cached itinerary should remain accessible.

Live data should not be falsely presented as current.

--------------------------------------------------
30. PERFORMANCE-AWARE UI
--------------------------------------------------

Keep the design implementation-friendly.

Avoid:

• Excessive animation
• Huge visual assets
• Constantly moving components
• Deeply nested overlays
• Unnecessary real-time updates

Use skeleton loading where useful.

--------------------------------------------------
31. ACCESSIBILITY IMPLEMENTATION
--------------------------------------------------

Document:

• Keyboard navigation
• Focus order
• Focus visibility
• Labels
• ARIA meaning where relevant
• Screen-reader structure
• Error announcement
• Reduced motion
• Touch target sizes

Do not rely on visual color alone.

--------------------------------------------------
32. DATA TRUST IMPLEMENTATION
--------------------------------------------------

Create a final trust legend.

LIVE
Data currently retrieved where supported.

ESTIMATED
Calculated or inferred value.

VERIFIED
Evidence-backed status.

DECLARED
Provided by a business.

SUPPORTED
Supported by external/map data.

AI SUPPORTED
AI-assisted interpretation.

UNKNOWN
Could not be confirmed.

CONFLICTING
Sources disagree.

UNAVAILABLE
Data could not be retrieved.

Use these labels consistently.

--------------------------------------------------
33. FRONTEND / BACKEND BOUNDARY
--------------------------------------------------

Create one final technical flow:

REACT
↓
AXIOS
↓
DJANGO REST FRAMEWORK
↓
APPLICATION LOGIC
↓
DATABASE / EXTERNAL SERVICES
↓
RESPONSE
↓
REACT STATE
↓
UI

Authentication:

FIREBASE AUTHENTICATION

Application data:

DJANGO + POSTGRESQL

AI:

GEMINI

Maps/accessibility:

OPENSTREETMAP / OVERPASS

Weather:

WEATHER SERVICE

Carbon:

DETERMINISTIC EMISSION FACTORS

Do not invent unavailable services or endpoints.

--------------------------------------------------
34. COMPONENT NAMING STANDARD
--------------------------------------------------

Use consistent implementation-oriented names.

Examples:

Button
Input
Modal
Toast

AICommandCenter
RecommendationCard
EcoTwinComparison
GreenAccessibleScore
ShowYourMath

AccessibilityBadge
EvidenceStatus
VerificationFlow

ItineraryTimeline
ItineraryItem

TripCard
EcoImpactCard

Use PascalCase.

--------------------------------------------------
35. FIGMA → CODE MAPPING
--------------------------------------------------

Create a reference table:

FIGMA COMPONENT
→
IMPLEMENTATION COMPONENT

Examples:

AI Command Center
→ AICommandCenter

Recommendation Card
→ RecommendationCard

Eco-Twin
→ EcoTwinComparison

Score
→ GreenAccessibleScore

Show Your Math
→ ShowYourMath

Accessibility Evidence
→ EvidenceStatus

Itinerary Item
→ ItineraryItem

Trip Card
→ TripCard

Do not create mappings for imaginary components.

--------------------------------------------------
36. FINAL PROTOTYPE VALIDATION
--------------------------------------------------

Run through:

FLOW 1

Landing
→ Auth
→ Onboarding
→ Home

FLOW 2

Home
→ AI
→ Planner
→ Recommendations
→ Eco-Twin
→ Show Your Math
→ Select
→ Itinerary

FLOW 3

Itinerary
→ Save
→ My Trips
→ Trip Detail
→ Eco Insights

FLOW 4

Profile
→ Accessibility
→ Upload Evidence
→ Verification
→ Result

FLOW 5

Failure

AI Error
→ Manual Planning

API Error
→ Retry

Offline
→ Cached Trip

--------------------------------------------------
37. FINAL IMPLEMENTATION CHECKLIST
--------------------------------------------------

Create a final checklist:

DESIGN
✓ Frozen

COMPONENTS
✓ Reusable

STATES
✓ Defined

DATA
✓ Mapped

RESPONSIVE
✓ Defined

ACCESSIBILITY
✓ Defined

AI
✓ Boundary defined

CARBON
✓ Methodology represented

TRUST
✓ Evidence states defined

PROTOTYPE
✓ Connected

DEVELOPER HANDOFF
✓ Ready

--------------------------------------------------
38. IMPORTANT RESTRICTIONS
--------------------------------------------------

DO NOT:

• Redesign screens
• Change colors
• Change typography
• Change navigation
• Add major features
• Add booking/payment systems
• Add new AI agents
• Add new recommendation logic
• Add unsupported APIs
• Copy Google Stitch's visual language
• Replace existing components unnecessarily

This phase is SPECIFICATION, not redesign.

--------------------------------------------------
FINAL OBJECTIVE
--------------------------------------------------

At the end of Phase 11, the Figma file should function as a direct bridge between:

PRODUCT DESIGN
↓
FRONTEND IMPLEMENTATION
↓
BACKEND INTEGRATION
↓
REAL USER EXPERIENCE

A developer should be able to understand:

WHAT TO BUILD

HOW TO BUILD THE UI

WHAT STATE IT CAN BE IN

WHAT DATA IT EXPECTS

WHAT HAPPENS WHEN THE USER ACTS

WHAT HAPPENS WHEN DATA FAILS

HOW IT RESPONDS ON MOBILE

HOW TRUST AND UNCERTAINTY ARE COMMUNICATED

FINAL PRINCIPLE:

"Design once.
Reuse everywhere.
Make every state intentional."

END PHASE 11.