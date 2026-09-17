
EcoTrail 2.0 — PHASE 8
REAL-WORLD UX VALIDATION + EDGE CASES + FAILURE RECOVERY + FINAL USABILITY

Continue the existing EcoTrail 2.0 Figma project from Phases 1–7.

IMPORTANT:

The core EcoTrail product, visual system, prototype and presentation system are already complete.

This phase is NOT a visual redesign.

This phase is NOT a new feature phase.

Do NOT replace the established design language.

Do NOT introduce unnecessary functionality.

The purpose of Phase 8 is to simulate real users using EcoTrail under realistic conditions and eliminate UX gaps, confusing states, dead ends and failure scenarios.

Think like a real traveler, not like a designer looking at a perfect demo.

The final result should feel reliable even when:

• Information is missing
• APIs fail
• AI fails
• Accessibility data conflicts
• Weather changes
• A destination has limited data
• The user changes requirements
• The user goes offline
• The user makes mistakes
• The itinerary changes
• The user returns later

--------------------------------------------------
1. REAL-WORLD USER TEST SCENARIOS
--------------------------------------------------

Create UX validation flows for the following realistic travelers.

SCENARIO A — GENERAL TRAVELER

User wants:

• Destination
• Budget
• Dates
• Comfortable travel
• Sustainable option

Flow:

Home
→ AI Request
→ Planner
→ Recommendations
→ Eco-Twin
→ Select
→ Itinerary

Verify that the user always understands:

"What is happening?"

"What are my options?"

"What should I do next?"

--------------------------------------------------
SCENARIO B — ACCESSIBILITY-FOCUSED TRAVELER
--------------------------------------------------

User requires:

• Step-free access
• Accessible transport
• Accessible accommodation

Flow:

Onboarding
→ Accessibility Profile
→ Home
→ AI Request
→ Planner
→ Recommendations
→ Accessibility Evidence
→ Eco-Twin
→ Itinerary

Ensure accessibility requirements remain visible throughout the journey.

Do not force the user to repeatedly enter the same information.

--------------------------------------------------
SCENARIO C — BUDGET-CONSTRAINED TRAVELER
--------------------------------------------------

User provides a strict budget.

The interface must communicate:

• Options within budget
• Options slightly above budget
• Why a recommendation was selected
• Trade-offs

If no option satisfies the budget:

DO NOT show a fake recommendation.

Show:

"No option currently meets all your requirements."

Then provide useful alternatives:

• Increase budget
• Reduce convenience requirement
• Change travel date
• Consider another transport mode

--------------------------------------------------
SCENARIO D — SUSTAINABILITY-FIRST TRAVELER
--------------------------------------------------

User prioritizes sustainability.

Show:

• Lower-impact options
• Estimated CO2e
• Carbon comparison
• Eco-Twin
• Green & Accessible Score

Do not claim that an option is "zero carbon" unless the underlying data actually supports it.

--------------------------------------------------
SCENARIO E — CONVENIENCE-FIRST TRAVELER
--------------------------------------------------

User prioritizes:

• Shorter travel time
• Fewer transfers
• Convenience

The system should not force the greenest option.

Show the trade-off:

"Faster option"

versus

"Lower-impact option"

Respect user choice.

--------------------------------------------------
2. NO-RESULT EXPERIENCE
--------------------------------------------------

Create complete no-result states.

Cases:

• No destinations
• No transport option
• No accommodation
• No accessible option
• No option within budget
• No Eco-Twin alternative
• No weather data
• No accessibility evidence

Each screen must explain:

WHAT COULD NOT BE FOUND

and

WHAT THE USER CAN DO NEXT

Example:

"We couldn't find an accessible option matching all your requirements."

Actions:

"Relax accessibility requirement"

"Change dates"

"Explore nearby options"

--------------------------------------------------
3. CONFLICTING DATA EXPERIENCE
--------------------------------------------------

Create a realistic conflicting accessibility data state.

Example:

Business says:
"Step-free entrance"

OSM data:
"No accessibility information"

Photo evidence:
"Needs Review"

The UI must NOT select one silently.

Show:

"Accessibility information conflicts."

Then show:

• Source 1
• Source 2
• Evidence state
• What remains uncertain

Primary action:

"Review evidence"

Secondary:

"Continue with caution"

--------------------------------------------------
4. UNKNOWN DATA EXPERIENCE
--------------------------------------------------

Create a clear Unknown state.

Example:

"Wheelchair-accessible bathroom"

Status:

UNKNOWN

Explanation:

"We couldn't confirm this requirement from available sources."

Do not turn Unknown into:

"Probably accessible"

Do not use green styling for Unknown.

--------------------------------------------------
5. API FAILURE EXPERIENCE
--------------------------------------------------

Create graceful failure states for:

• Weather API
• Map
• Travel data
• Accessibility data
• AI
• Carbon calculation service/data

The rest of the product should remain usable where possible.

Example:

"We couldn't load current weather."

The itinerary should still remain available.

Provide:

"Try again"

and, when possible:

"Continue with saved information"

--------------------------------------------------
6. AI FAILURE EXPERIENCE
--------------------------------------------------

Create:

AI unavailable
AI timeout
AI malformed response
AI cannot understand request
AI request too vague

Example:

"I couldn't understand that trip request."

Instead of a generic error, suggest examples:

"Try: Plan a 3-day accessible trip from Pune to Goa under ₹15,000."

Provide:

"Try again"

and manual planner access.

AI must never become a single point of failure for the product.

--------------------------------------------------
7. AI AMBIGUITY EXPERIENCE
--------------------------------------------------

Create an ambiguous travel request.

Example:

"Plan me a cheap trip to Goa."

The system should identify missing information.

Ask for only the most important missing requirements.

Possible questions:

• When are you traveling?
• How many travelers?
• Approximate budget?

Do not ask 10 questions at once.

Use progressive clarification.

--------------------------------------------------
8. REQUIREMENT CHANGE EXPERIENCE
--------------------------------------------------

Create the experience when the user changes an important requirement after recommendations have already been generated.

Example:

Initial:

Budget ₹10,000

User changes to:

Budget ₹7,000

The UI should communicate:

"Your requirements changed."

"Updating recommendations..."

Then recalculate the relevant result.

Similarly test:

• Accessibility change
• Date change
• Traveler count
• Sustainability priority
• Convenience priority

Do not silently retain stale recommendations.

--------------------------------------------------
9. SCORE RECALCULATION EXPERIENCE
--------------------------------------------------

When the user changes:

Sustainability
Accessibility
Cost
Time / Convenience

show:

"Updating score..."

Then update:

• Green & Accessible Score
• Ranking
• Recommendation explanation
• Eco-Twin comparison

Make it obvious that the result changed because the user's priorities changed.

--------------------------------------------------
10. ECO-TWIN UNAVAILABLE
--------------------------------------------------

Create the case where no meaningful Eco-Twin exists.

Show:

"No lower-impact alternative was found that meets your current requirements."

Explain:

"We checked available combinations but couldn't identify an alternative that improves the overall trade-off."

Do NOT fabricate an Eco-Twin.

Offer:

"Keep current option"

"Change requirements"

--------------------------------------------------
11. CARBON DATA UNAVAILABLE
--------------------------------------------------

Create:

"Carbon estimate unavailable"

Explain:

"We don't have a reliable emission factor for this segment."

Do not display:

0 kg CO2e

Do not substitute a made-up number.

Clearly distinguish:

Unavailable

from

0

--------------------------------------------------
12. ACCESSIBILITY VERIFICATION FAILURE
--------------------------------------------------

Create:

Upload
→ Processing
→ Unable to Verify

Show:

"Evidence could not be verified."

Explain what happened.

Actions:

"Upload another photo"

"Continue without verification"

"Review accessibility requirements"

Never automatically mark the location as accessible.

--------------------------------------------------
13. PHOTO EVIDENCE QUALITY
--------------------------------------------------

Create cases:

• Blurry image
• Dark image
• Wrong subject
• Partial evidence
• Multiple conflicting photos
• Insufficient context

For each:

Explain why the evidence is insufficient.

Example:

"The entrance is visible, but the full path to the entrance cannot be confirmed."

Provide:

"Upload another photo"

--------------------------------------------------
14. WEATHER CHANGE EXPERIENCE
--------------------------------------------------

Create a travel scenario where weather conditions change.

Show:

Previous forecast
→ Updated forecast

If the itinerary is affected:

"Weather may affect this activity."

Provide:

"View alternative"

"Keep itinerary"

Do not automatically change the user's trip without permission.

--------------------------------------------------
15. OFFLINE / RECONNECT EXPERIENCE
--------------------------------------------------

Create complete transition:

ONLINE
→ OFFLINE
→ USER CONTINUES USING CACHED TRIP
→ CONNECTION RESTORED
→ SYNCING
→ SYNC COMPLETE

Show clear status.

Example:

"You're offline."

"Your saved itinerary is still available."

Then:

"Connection restored."

"Syncing your latest changes..."

Then:

"Everything is up to date."

--------------------------------------------------
16. UNSAVED CHANGES
--------------------------------------------------

Create protection for:

• Editing profile
• Editing accessibility preferences
• Editing itinerary
• Changing trip requirements

When leaving with unsaved changes:

"Discard changes?"

Actions:

"Keep editing"

"Discard changes"

Do not silently lose user input.

--------------------------------------------------
17. DELETE / DESTRUCTIVE ACTIONS
--------------------------------------------------

Create confirmation states for:

• Delete trip
• Remove accessibility evidence
• Remove saved destination
• Logout if relevant to unsaved state

Use clear language.

Example:

"Delete this trip?"

"This cannot be undone."

Primary destructive action:

"Delete Trip"

Secondary:

"Cancel"

Do not use vague wording like:

"Are you sure?"

--------------------------------------------------
18. FORM VALIDATION
--------------------------------------------------

Audit all forms.

Create validation for:

• Empty fields
• Invalid email
• Invalid dates
• Past dates
• Invalid budget
• Missing destination
• Invalid traveler count
• Missing required planner information

Errors must appear close to the relevant field.

Use:

"What needs attention"

instead of technical error messages.

--------------------------------------------------
19. DATE / TRAVELER EDGE CASES
--------------------------------------------------

Design states for:

• Same-day trip
• Multi-day trip
• Past date
• Very far future date
• One traveler
• Large traveler group
• Missing return date
• Invalid date range

Do not assume every trip is a standard 3-day journey.

--------------------------------------------------
20. LONG CONTENT / INTERNATIONALIZATION
--------------------------------------------------

Ensure components work with:

• Long destination names
• Long hotel names
• Long accessibility descriptions
• Long AI explanations
• Large numbers
• Different currencies
• Different date formats

Text must wrap gracefully.

Do not allow important buttons or badges to break layouts.

--------------------------------------------------
21. NOTIFICATION SYSTEM
--------------------------------------------------

Audit notification behavior.

Possible notifications:

• Trip saved
• Itinerary updated
• Verification completed
• Verification requires review
• Weather changed
• Offline
• Back online
• Sync completed
• AI recommendation ready

Use the established toast/notification component.

Notifications should be:

• Brief
• Actionable
• Non-intrusive

--------------------------------------------------
22. USER CONTROL
--------------------------------------------------

Audit the entire product for unexpected automatic actions.

The system should NOT automatically:

• Change the itinerary
• Change accessibility requirements
• Change user preferences
• Book anything
• Share a trip
• Publish accessibility information

Important changes require user confirmation.

--------------------------------------------------
23. TRUST CHECK
--------------------------------------------------

Perform a final trust audit.

For every important piece of information ask:

"Does the UI make it clear where this came from?"

Relevant labels:

• Verified
• Business Declared
• OSM Supported
• AI Supported
• Estimated
• Unknown
• Conflicting
• Needs Review

Do not make uncertain data look authoritative.

--------------------------------------------------
24. CARBON TRUST CHECK
--------------------------------------------------

Audit every carbon value.

All carbon numbers must communicate:

"Estimated CO2e"

Where appropriate show:

• Activity data
• Emission factor
• Methodology
• Source

Never display a false level of precision.

Do not use carbon as a decorative score without explanation.

--------------------------------------------------
25. ACCESSIBILITY TRUST CHECK
--------------------------------------------------

Audit every accessibility claim.

Avoid:

"Fully Accessible"

unless the product actually has sufficient evidence for the specific requirement.

Prefer:

"Step-free entrance — Verified"

"Accessible bathroom — Unknown"

"Elevator — Business Declared"

Make the scope of verification clear.

--------------------------------------------------
26. COMPLETE FAILURE-RECOVERY MAP
--------------------------------------------------

Create a visual map:

NORMAL FLOW

→ DATA AVAILABLE
→ RECOMMENDATION
→ ITINERARY

FAILURE BRANCHES:

DATA UNAVAILABLE
→ EXPLAIN
→ RETRY / CONTINUE

AI UNAVAILABLE
→ MANUAL PATH

ACCESSIBILITY UNKNOWN
→ SHOW UNCERTAINTY
→ USER DECIDES

CONFLICTING DATA
→ SHOW SOURCES
→ REVIEW

OFFLINE
→ CACHED EXPERIENCE
→ SYNC LATER

This should demonstrate that EcoTrail is resilient.

--------------------------------------------------
27. FINAL USABILITY AUDIT
--------------------------------------------------

For every major screen, verify four questions:

1. Where am I?

2. What information matters?

3. What can I do next?

4. Can I trust what I am seeing?

If any answer is unclear, refine the screen.

--------------------------------------------------
28. FINAL NAVIGATION AUDIT
--------------------------------------------------

Check for:

• Dead ends
• Missing back actions
• Missing home access
• Missing save behavior
• Broken prototype links
• Confusing modal states
• Missing close actions
• Missing mobile navigation
• Incorrect active navigation

Every flow must have a logical exit.

--------------------------------------------------
29. FINAL MOBILE EDGE CASES
--------------------------------------------------

Test mobile layouts with:

• Long text
• Multiple badges
• Large numbers
• Multiple itinerary items
• Long accessibility descriptions
• AI responses
• Error messages
• Bottom sheets
• Keyboard open state

Ensure:

• No horizontal overflow
• No clipped text
• No hidden primary actions
• No inaccessible controls

--------------------------------------------------
30. FINAL DEMO SAFETY
--------------------------------------------------

Ensure the main hackathon demo never depends entirely on:

• AI availability
• Weather availability
• Map availability
• Live travel API availability

Where appropriate, design graceful fallback states and demo-safe data states.

The demo should still communicate the product if one external service fails.

Do not fake live data.

Clearly distinguish:

LIVE
ESTIMATED
DEMO
CACHED
UNAVAILABLE

--------------------------------------------------
31. FINAL PRODUCT QUALITY BAR
--------------------------------------------------

After this phase, EcoTrail should feel like a real product that has been tested against imperfect conditions.

The goal is:

NOT ONLY

"Does the happy path look beautiful?"

BUT ALSO

"What happens when something goes wrong?"

The product should remain:

• Understandable
• Trustworthy
• Accessible
• Recoverable
• Responsive
• User-controlled

--------------------------------------------------
32. DO NOT ADD
--------------------------------------------------

Do NOT add:

• New marketplaces
• Payment systems
• Admin dashboards
• Hotel-owner dashboards
• Social features
• Loyalty systems
• New AI agents
• New recommendation algorithms
• New authentication systems
• New major product modules

Only improve resilience and usability of existing functionality.

--------------------------------------------------
33. FINAL PHASE 8 DELIVERABLE
--------------------------------------------------

Create the following final sections:

01 — Real-World Scenarios
02 — No Results
03 — Data Conflicts
04 — AI Failures
05 — API Failures
06 — Accessibility Verification Failures
07 — Offline / Sync
08 — Requirement Changes
09 — Form Validation
10 — Destructive Actions
11 — Trust & Evidence
12 — Failure Recovery Map
13 — Mobile Edge Cases
14 — Final UX Audit

Keep these sections organized and connected to the existing product.

--------------------------------------------------
FINAL PRODUCT PRINCIPLE
--------------------------------------------------

EcoTrail should not only work when everything goes perfectly.

It should remain trustworthy when information is incomplete,
services fail,
requirements change,
or evidence is uncertain.

FINAL MESSAGE:

"Good travel technology doesn't hide uncertainty.

It helps travelers understand it,
make informed choices,
and stay in control."

END PHASE 8.
