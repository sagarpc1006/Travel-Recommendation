EcoTrail 2.0 — PHASE 12
HIGH-FIDELITY INTERACTIVE PROTOTYPE + REAL USER SIMULATION + END-TO-END STATE FLOWS

Continue the existing EcoTrail 2.0 Figma project from Phases 1–11.

IMPORTANT:

The EcoTrail product design is already FROZEN.

The design system is established.
The visual language is established.
The product workflow is established.
The components are established.
The responsive behavior is established.
The developer handoff is established.

DO NOT redesign the product.

DO NOT introduce a new visual language.

DO NOT add major new functionality.

DO NOT modify the core product concept.

This phase is about making the existing product behave like a real application through a high-fidelity interactive prototype.

The prototype should simulate realistic:

• User input
• Navigation
• Loading
• AI processing
• Recommendations
• Selection
• Score changes
• Eco-Twin comparison
• Accessibility verification
• Itinerary generation
• Saving
• Editing
• Offline behavior
• Errors
• Recovery

The goal is:

STATIC DESIGN
→
INTERACTIVE PRODUCT SIMULATION

--------------------------------------------------
1. PROTOTYPE PRINCIPLE
--------------------------------------------------

The prototype should demonstrate:

USER ACTION
↓
SYSTEM RESPONSE
↓
NEW STATE
↓
NEXT ACTION

Do not create interactions only for visual effects.

Every interaction must represent a realistic product behavior.

--------------------------------------------------
2. PRIMARY END-TO-END FLOW
--------------------------------------------------

Build the complete primary prototype:

LANDING
↓
LOGIN / SIGNUP
↓
ONBOARDING
↓
HOME
↓
AI TRAVEL COMMAND CENTER
↓
TRAVEL REQUEST
↓
UNDERSTANDING
↓
PLANNER
↓
RECOMMENDATIONS
↓
GREEN & ACCESSIBLE SCORE
↓
ECO-TWIN
↓
SHOW YOUR MATH
↓
SELECT OPTION
↓
BUILD MY ITINERARY
↓
ITINERARY
↓
SAVE TRIP
↓
MY TRIPS
↓
TRIP DETAIL
↓
ECO INSIGHTS

The flow must be easy to demonstrate in a presentation.

--------------------------------------------------
3. LANDING INTERACTION
--------------------------------------------------

Landing page actions:

"Plan Your Trip"
→ Authentication

"Explore EcoTrail"
→ Product explanation / relevant section

Navigation links:

• Home
• How It Works
• Eco-Twin
• Accessibility
• Show Your Math

Ensure anchors and transitions work.

--------------------------------------------------
4. AUTHENTICATION SIMULATION
--------------------------------------------------

Create interactive states:

LOGIN

Default
→ Filled
→ Loading
→ Success
→ Error

SIGNUP

Default
→ Filled
→ Loading
→ Success
→ Verification

FORGOT PASSWORD

Email
→ Sending
→ Confirmation
→ Error

Do not implement real authentication in Figma.

Simulate the user experience only.

--------------------------------------------------
5. ONBOARDING INTERACTION
--------------------------------------------------

Create the complete onboarding interaction.

Flow:

Welcome
→ Travel Style
→ Sustainability
→ Accessibility
→ Budget
→ Convenience
→ Summary
→ Complete

Support:

• Back
• Next
• Skip where appropriate
• Selection
• Edit
• Confirmation

Do not force accessibility disclosure.

Include:

"Prefer not to specify"

--------------------------------------------------
6. HOME INTERACTION
--------------------------------------------------

Home should feel immediately usable.

Primary:

AI Travel Command Center

Secondary:

Continue Planning
Recommended Trips
Discover Destinations
Eco Impact
Weather
Recent Activity

Interactions:

AI input
→ Processing
→ Planner

Destination card
→ Destination Intelligence

Continue Planning
→ Existing Trip / Planner

Eco Impact
→ Eco Insights

--------------------------------------------------
7. AI COMMAND CENTER SIMULATION
--------------------------------------------------

Use a realistic demo request:

"Plan a 3-day accessible trip from Pune to Goa under ₹15,000."

Interaction:

IDLE
↓
USER TYPES
↓
SUBMIT
↓
UNDERSTANDING
↓
SEARCHING
↓
COMPARING
↓
CALCULATING
↓
RESULT READY

Display progressive states.

Use concise processing messages:

"Understanding your trip..."

"Checking available options..."

"Comparing sustainability and accessibility..."

"Calculating estimated impact..."

"Your recommendation is ready."

--------------------------------------------------
8. AI RESULT
--------------------------------------------------

After processing, display structured requirements:

Origin:
Pune

Destination:
Goa

Duration:
3 days

Travelers:
2

Budget:
₹15,000

Accessibility:
Required

Sustainability:
Preferred

Convenience:
Balanced

Allow:

Edit requirements
→ Planner

Continue
→ Recommendations

--------------------------------------------------
9. PLANNER INTERACTION
--------------------------------------------------

Create interactive requirement editing.

Fields:

Origin
Destination
Dates
Travelers
Budget
Accessibility
Sustainability
Convenience

Actions:

Edit
Save
Reset

When requirements change:

USER CHANGES VALUE
↓
"Updating recommendations..."
↓
UPDATED RESULTS

Do not silently update results.

--------------------------------------------------
10. RECOMMENDATION INTERACTION
--------------------------------------------------

Create multiple recommendation cards.

Example categories:

Option A:
Best Overall

Option B:
Lowest Carbon

Option C:
Best Accessibility

Option D:
Lowest Cost

Option E:
Fastest

Each card supports:

View Details
Compare
Select

Selected state must be visually clear.

--------------------------------------------------
11. SCORE INTERACTION
--------------------------------------------------

Allow the user to change priorities.

Example controls:

Sustainability
Accessibility
Cost
Time / Convenience

When changed:

USER ADJUSTS PRIORITY
↓
UPDATING SCORE
↓
UPDATED SCORE
↓
UPDATED RANKING

Show subtle recalculation feedback.

Do not over-animate.

--------------------------------------------------
12. ECO-TWIN INTERACTION
--------------------------------------------------

When an option is selected:

Open Eco-Twin comparison.

Show:

STANDARD OPTION

Flight + Taxi

versus

ECO-TWIN

Train + Shared EV Shuttle

Use clearly labeled illustrative/demo values.

Show:

Cost
Travel Time
Estimated CO2e
Accessibility
Score

Interaction:

"Why this option?"
→ Explanation

"Show Your Math"
→ Carbon breakdown

"Select Eco-Twin"
→ Selected state

"Keep Standard"
→ Standard selected state

--------------------------------------------------
13. SHOW YOUR MATH INTERACTION
--------------------------------------------------

Create an expandable calculation panel.

Default:

Estimated CO2e
"See how we calculated this"

Click:

→ Expanded calculation

Show:

Activity Data
×
Emission Factor
=
Estimated CO2e

For multiple segments:

Segment 1
Segment 2
Segment 3
Total

Include:

Methodology
Source

Allow:

Collapse

Do not use excessive animation.

--------------------------------------------------
14. ACCESSIBILITY EVIDENCE INTERACTION
--------------------------------------------------

Recommendation:

Accessibility
→ Details

Show:

Entrance
Verified

Elevator
Business Declared

Bathroom
Unknown

Transport
OSM Supported

Create an expandable evidence detail.

User can see:

Status
Meaning
Evidence
Source

Do not make Unknown look verified.

--------------------------------------------------
15. PHOTO VERIFICATION PROTOTYPE
--------------------------------------------------

Create the complete simulation:

Upload
→ Preview
→ Evidence Type
→ Processing
→ Result

Result variants:

VERIFIED

NEEDS REVIEW

INSUFFICIENT EVIDENCE

CONFLICTING

UNABLE TO VERIFY

Create at least one complete successful path and one failure path.

--------------------------------------------------
16. BUILD ITINERARY INTERACTION
--------------------------------------------------

After selecting the option:

"Build My Itinerary"

→ Processing

Show:

"Organizing your journey..."

Then:

Itinerary Ready

Transition into:

Day 1
Day 2
Day 3

Use realistic itinerary content.

--------------------------------------------------
17. ITINERARY INTERACTION
--------------------------------------------------

Interactions:

Date selection
→ Selected day

Timeline item
→ Detail panel

Map location
→ Highlight itinerary item

Accessibility badge
→ Accessibility details

Carbon information
→ Carbon details

Edit
→ Editing state

Save
→ Saved state

--------------------------------------------------
18. ITINERARY EDITING
--------------------------------------------------

Create:

Edit Activity
Edit Time
Remove Activity
Add Activity
Reorder

When editing:

Save Changes
→ Updating itinerary
→ Updated itinerary

Cancel
→ Original itinerary

No changes should be lost silently.

--------------------------------------------------
19. AI ITINERARY ADJUSTMENT
--------------------------------------------------

Create an AI-assisted editing interaction.

Example:

User:

"Make Day 2 less tiring."

Interaction:

Request
→ AI Processing
→ Suggested Changes

Show:

AI Suggestion

Changes:

• Reduced walking
• Longer rest period
• Reordered activity

Actions:

Apply
Dismiss

Clearly label it:

"AI suggestion"

Do not make AI appear to have independently verified new accessibility facts.

--------------------------------------------------
20. SAVE TRIP INTERACTION
--------------------------------------------------

When user selects:

"Save Trip"

Show:

Saving
→ Saved

Use a subtle confirmation:

"Trip saved."

The saved trip should then appear in:

My Trips

--------------------------------------------------
21. MY TRIPS INTERACTION
--------------------------------------------------

Tabs:

Upcoming
Ongoing
Completed
Saved

Trip card:

→ Trip Detail

Create:

No Trips
→ Empty State
→ Plan a Trip

--------------------------------------------------
22. TRIP DETAIL INTERACTION
--------------------------------------------------

Trip Detail should expose:

• Trip summary
• Dates
• Score
• Estimated CO2e
• Accessibility readiness
• Eco-Twin
• Itinerary
• Map

Actions:

Edit
Save
Share
Delete

--------------------------------------------------
23. SHARE INTERACTION
--------------------------------------------------

Before sharing:

Show:

"What will be shared?"

Public trip information

Then privacy reminder:

"Private accessibility details are not automatically included."

Actions:

Share
Cancel

Do not create an experience that exposes sensitive information by default.

--------------------------------------------------
24. DELETE INTERACTION
--------------------------------------------------

Delete:

→ Confirmation modal

"Delete this trip?"

"This cannot be undone."

Actions:

Cancel
Delete Trip

After deletion:

→ My Trips empty/updated state

--------------------------------------------------
25. ECO INSIGHTS INTERACTION
--------------------------------------------------

From Trip Detail:

Eco Insights
→ Impact Overview
→ Carbon Breakdown
→ Standard Comparison
→ Methodology

Interactions:

Chart point
→ Detail

Transport segment
→ Contribution

Methodology
→ Explanation

Keep interactions simple.

--------------------------------------------------
26. PROFILE INTERACTION
--------------------------------------------------

Profile:

Personal Information
Travel Preferences
Accessibility
Privacy
Notifications
Settings

Each opens its corresponding section.

--------------------------------------------------
27. ACCESSIBILITY PROFILE INTERACTION
--------------------------------------------------

Allow:

Add requirement
Edit requirement
Remove requirement
Save

Changes should affect future planning context.

Do not imply that changing the profile retroactively changes an existing trip unless explicitly requested.

--------------------------------------------------
28. NOTIFICATION INTERACTION
--------------------------------------------------

Create realistic notifications:

Trip saved
Verification complete
Verification needs review
Weather update
Sync complete

Clicking a notification:

→ Relevant screen

--------------------------------------------------
29. OFFLINE INTERACTION
--------------------------------------------------

Create a simulation:

ONLINE
↓
OFFLINE

Show banner:

"You're offline."

Allow:

Saved itinerary
Trip details
Cached information

Then:

CONNECTION RESTORED
↓
SYNCING
↓
SYNC COMPLETE

Use:

"Your changes are up to date."

--------------------------------------------------
30. AI FAILURE FLOW
--------------------------------------------------

Create:

AI Request
→ Error

Message:

"We couldn't process your request."

Actions:

Try Again
Plan Manually

Try Again:

→ Processing
→ Success

Plan Manually:

→ Planner

This demonstrates that AI is not a single point of failure.

--------------------------------------------------
31. DATA FAILURE FLOW
--------------------------------------------------

Create a partial data failure.

Example:

Weather unavailable.

Show:

"We couldn't load current weather."

The rest of the trip remains usable.

Action:

Try Again

Do not block the complete itinerary.

--------------------------------------------------
32. ACCESSIBILITY UNKNOWN FLOW
--------------------------------------------------

Create:

User opens accessibility information.

Result:

Unknown

Message:

"We couldn't confirm this requirement."

Actions:

Review Evidence
Continue with Caution

Do not automatically reject or approve the option.

--------------------------------------------------
33. CONFLICTING DATA FLOW
--------------------------------------------------

Create:

Business Declared
+
OSM information
+
Photo evidence

with conflicting results.

Show:

"Accessibility information conflicts."

Actions:

Review Evidence
Continue with Caution

This should be one of the strongest trust demonstrations in the prototype.

--------------------------------------------------
34. NO ECO-TWIN FLOW
--------------------------------------------------

Create:

Selected option
→ Eco-Twin search
→ No meaningful alternative

Message:

"No lower-impact alternative was found that meets your current requirements."

Actions:

Keep Current Option
Change Requirements

Do not fabricate an alternative.

--------------------------------------------------
35. CARBON UNAVAILABLE FLOW
--------------------------------------------------

Create:

Carbon calculation
→ Missing emission factor

Display:

"Carbon estimate unavailable."

Never display:

0 kg CO2e

Actions:

View Methodology
Continue

--------------------------------------------------
36. PROTOTYPE MICRO-INTERACTIONS
--------------------------------------------------

Use:

Smart Animate
Overlay
Component State
Scroll To
Navigate To

Only where appropriate.

Use motion for:

• AI processing
• Score recalculation
• Save
• Verification
• Bottom sheets
• Modals
• Selected states

Do not animate everything.

--------------------------------------------------
37. MOBILE PROTOTYPE
--------------------------------------------------

Create a fully interactive mobile version at:

390px
430px

Ensure:

• AI input works
• Planner works
• Recommendation selection works
• Eco-Twin works
• Show Your Math works
• Accessibility details work
• Itinerary works
• Bottom sheets work
• Navigation works

Do not simply rely on desktop interactions.

--------------------------------------------------
38. TABLET PROTOTYPE
--------------------------------------------------

Validate at:

768px
1024px

Ensure:

• Navigation remains usable
• Panels collapse correctly
• Map remains usable
• Planner remains understandable

--------------------------------------------------
39. PROTOTYPE START SCREEN
--------------------------------------------------

Create one clearly labeled:

"START HERE — FULL PRODUCT DEMO"

This should launch the strongest end-to-end flow.

Secondary prototype starting points:

"AI FLOW"

"ACCESSIBILITY FLOW"

"ECO-TWIN FLOW"

"FAILURE / RECOVERY FLOW"

"ITINERARY FLOW"

--------------------------------------------------
40. DEMO MODE
--------------------------------------------------

Create a dedicated:

"JUDGE DEMO"

flow.

Recommended sequence:

1. Landing
2. Home
3. AI Request
4. Planner
5. Recommendations
6. Green & Accessible Score
7. Eco-Twin
8. Show Your Math
9. Accessibility Evidence
10. Itinerary
11. Eco Insights

Target:

2–3 minutes.

Avoid unnecessary navigation during the demo.

--------------------------------------------------
41. PROTOTYPE PERFORMANCE
--------------------------------------------------

Keep the prototype manageable.

Avoid:

• Excessive overlays
• Excessive animation
• Huge duplicated screen sets
• Unnecessary interactive decorations

Reuse components and variants.

--------------------------------------------------
42. FINAL PROTOTYPE QA
--------------------------------------------------

Check:

[ ] All primary buttons work

[ ] Back actions work

[ ] Close actions work

[ ] Modals close

[ ] Bottom sheets close

[ ] Forms transition correctly

[ ] Loading states appear

[ ] Success states appear

[ ] Error states appear

[ ] Empty states appear

[ ] AI flow works

[ ] Planner flow works

[ ] Recommendation flow works

[ ] Eco-Twin works

[ ] Show Your Math works

[ ] Accessibility flow works

[ ] Itinerary works

[ ] My Trips works

[ ] Eco Insights works

[ ] Profile works

[ ] Offline flow works

[ ] No dead ends

[ ] Mobile flow works

--------------------------------------------------
43. FINAL TRUST QA
--------------------------------------------------

Verify the prototype never visually implies:

AI = verified information

Estimated carbon = exact measurement

Unknown accessibility = accessible

Business declaration = independent verification

Demo data = live data

Unavailable data = zero

Keep trust labels consistent.

--------------------------------------------------
44. FINAL PRODUCT FEEL
--------------------------------------------------

The prototype should feel:

• Fast
• Calm
• Intelligent
• Predictable
• Trustworthy
• Accessible
• Human
• Production-ready

The user should always understand:

WHAT IS HAPPENING

WHY IT IS HAPPENING

WHAT THE SYSTEM KNOWS

WHAT THE SYSTEM DOES NOT KNOW

WHAT THEY CAN DO NEXT

--------------------------------------------------
45. DO NOT CHANGE
--------------------------------------------------

DO NOT change:

• Brand
• Colors
• Typography
• Navigation
• Core layouts
• Product workflow
• Eco-Twin concept
• Score model
• Accessibility evidence model
• Carbon methodology presentation

DO NOT add:

• Payments
• Booking marketplace
• Admin portal
• Hotel-owner portal
• Social network
• Loyalty program
• New AI agents
• New APIs
• New major features

--------------------------------------------------
FINAL OBJECTIVE
--------------------------------------------------

At the end of Phase 12, EcoTrail should no longer feel like a set of designed screens.

It should feel like a REAL INTERACTIVE PRODUCT.

The complete prototype should demonstrate:

ASK
→
UNDERSTAND
→
PLAN
→
COMPARE
→
CALCULATE
→
VERIFY
→
CHOOSE
→
ORGANIZE
→
SAVE
→
TRAVEL
→
UNDERSTAND IMPACT

FINAL PRINCIPLE:

"Every user action should produce an understandable system response."

END PHASE 12.