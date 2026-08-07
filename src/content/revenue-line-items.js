/**
 * Short, plain-language explanations for individual revenue line items -
 * one level more granular than ../content/revenue-categories.js. Written
 * for a general reader, not a finance professional: short sentences,
 * everyday words, no unexplained jargon or legal citations. Keyed by the
 * slug slugify() produces from the line item's exact label in the budget
 * PDF (see src/_data/budgets.js). Entries are optional: a line item with
 * no entry here still gets its own page (trend chart + table), just
 * without the "blurb"/"rate" prose sections.
 */
export const revenueLineItemContent = {
  // --- Taxation ---
  "prior-year-s-levy-limit": {
    blurb:
      "This is where the math starts: how much property tax the city was allowed to collect last year, before this year's increase gets added on.",
    citation: { label: "M.G.L. c. 59, § 21C (Proposition 2½)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter59/Section21C" },
  },
  "add-2-1-2": {
    blurb:
      "State law lets the city add 2.5% more property tax than last year, automatically, every single year - whether or not costs actually went up that much.",
    citation: { label: "M.G.L. c. 59, § 21C (Proposition 2½)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter59/Section21C" },
  },
  "add-new-growth": {
    blurb:
      "When new houses get built, old buildings get renovated, or a new business opens up, that adds new property to tax. This is the extra tax money that comes from those new additions to the city - separate from the automatic 2.5% bump.",
    citation: { label: "M.G.L. c. 59, § 21C (Proposition 2½)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter59/Section21C" },
  },
  "subtotal-levy-limit": {
    blurb:
      "Add up the three lines above (last year's limit, the automatic 2.5%, and new construction) and this is the running total - the most property tax the city is allowed to collect this year, before a couple of small adjustments.",
    citation: { label: "M.G.L. c. 59, § 21C (Proposition 2½)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter59/Section21C" },
  },
  "actual-levy-adjusted-for-rounding": {
    blurb: "The same number as above, just cleaned up for small rounding differences before the state signs off on it.",
    citation: { label: "M.G.L. c. 59, § 21C (Proposition 2½)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter59/Section21C" },
  },
  "less-reserve-for-abatements": {
    blurb:
      "The city sets aside some money every year expecting that a number of homeowners will successfully challenge their property tax bill and get a refund. This line is that set-aside, subtracted up front so the city doesn't over-collect.",
    citation: { label: "M.G.L. c. 59, § 21C (Proposition 2½)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter59/Section21C" },
  },

  // --- State Aid: Education ---
  "education-chapter-70": {
    blurb: "The state's main check to help pay for Fitchburg's public schools. See the State Aid — Education page above for how it's calculated.",
    citation: { label: "M.G.L. c. 70 (State Aid for Public Schools)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXII/Chapter70" },
  },
  "education-charter-tuition-reimbursements": {
    blurb:
      "When a Fitchburg kid goes to a charter school instead, the city has to pay that school tuition. This is the state paying some of that money back to Fitchburg - though usually not all of it.",
    citation: { label: "M.G.L. c. 71, § 89 (charter schools)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXII/Chapter71/Section89" },
  },
  "education-school-choice-receiving-tuition": {
    blurb:
      "Some kids from other towns choose to attend Fitchburg's public schools instead of their own. Their home town has to pay Fitchburg tuition for that, and this is that payment coming in.",
    citation: { label: "M.G.L. c. 76, § 12B (school choice)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXII/Chapter76/Section12B" },
  },
  "less-offset": {
    blurb:
      "A bookkeeping line that cancels out a matching charge somewhere else on this list, so the same money doesn't get counted twice.",
  },

  // --- State Aid: General Government ---
  "general-unrestricted-general-government-aid": {
    blurb: "General state aid the city can spend on anything it wants - police, fire, roads, whatever the City Council decides.",
  },
  "general-veterans-benefits": {
    blurb:
      "Fitchburg helps pay living expenses for veterans in financial need. The state pays back most of what the city spends on this (typically about three-quarters of it).",
    citation: { label: "M.G.L. c. 115, § 6 (veterans' benefits reimbursement)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXVII/Chapter115/Section6" },
  },
  "exemptions-vets-blind-surviving-spouse-elderly": {
    blurb:
      "State law requires the city to knock money off the property tax bills of certain veterans, blind residents, surviving spouses, and low-income seniors. This is the state chipping in to help cover that lost tax revenue.",
    citation: { label: "M.G.L. c. 59, § 5 (property tax exemptions)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter59/Section5" },
  },
  "general-state-owned-land": {
    blurb:
      "The state owns some land in Fitchburg, and normally that land would be tax-exempt. Instead, the state sends the city a small payment to make up for the property tax it isn't collecting on that land.",
  },
  "general-public-libraries": {
    blurb: "State money to help run the Fitchburg Public Library, as long as the city keeps funding the library at a minimum level the state requires.",
  },
  "less-offset-public-library": {
    blurb: "A bookkeeping line that cancels out part of the library aid line above, so it isn't double-counted.",
  },

  // --- State Assessments ---
  "assessment-mosquito-control-projects": {
    blurb:
      "Fitchburg is part of a regional program that sprays for mosquitoes and checks for diseases they can carry. This is the city's share of the bill, split among all the towns in the program.",
    citation: { label: "M.G.L. c. 252 (mosquito control)", url: "https://malegislature.gov/Laws/GeneralLaws/PartIII/TitleIV/Chapter252" },
  },
  "assessment-air-pollution-districts": {
    blurb:
      "Fitchburg belongs to a regional group that monitors and manages air quality. This is the city's share of what that group costs to run.",
    citation: { label: "M.G.L. c. 111 (air pollution control districts)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXVI/Chapter111" },
  },
  "assessment-rmv-non-renewal-surcharge": {
    blurb:
      "If you owe unpaid car excise tax, the city can ask the state's Registry of Motor Vehicles to block you from renewing your license or registration until you pay up. This is a fee the city pays the state each time it uses that tool.",
  },
  "assessment-regional-transit": {
    blurb: "Fitchburg's yearly payment to help fund MART, the regional bus system that serves the city and surrounding towns.",
    citation: { label: "M.G.L. c. 161B (regional transit authorities)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXII/Chapter161B" },
  },
  "assessment-special-education": {
    blurb: "Fitchburg's share of certain special education costs that the state manages and then bills back to the district.",
    citation: { label: "M.G.L. c. 71B (special education)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXII/Chapter71B" },
  },
  "assessment-school-choice-sending-tuition": {
    blurb:
      "When a Fitchburg kid chooses to attend public school in a different town instead, Fitchburg has to pay that other town tuition. This is that payment going out - the flip side of the tuition Fitchburg receives from other towns' kids.",
    citation: { label: "M.G.L. c. 76, § 12B (school choice)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXII/Chapter76/Section12B" },
  },
  "assessment-charter-school-sending-tuition": {
    blurb:
      "When a Fitchburg kid attends a charter school instead of a Fitchburg public school, the city has to pay that charter school tuition. This is the single biggest bill on the whole assessments list, and the state only pays back part of it (see the reimbursement line under State Aid — Education).",
    citation: { label: "M.G.L. c. 71, § 89 (charter schools)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXII/Chapter71/Section89" },
  },

  // --- Local Receipts ---
  "motor-vehicle-excise": {
    blurb: "The yearly tax on every car and truck registered in Fitchburg. See the Local Receipts page above for the exact rate.",
    citation: { label: "M.G.L. c. 60A (motor vehicle excise)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter60A" },
  },
  "other-excise-rooms": {
    blurb: "An extra charge added to your bill when you stay at a hotel or motel in Fitchburg, on top of what the state already charges.",
    citation: { label: "M.G.L. c. 64G (room occupancy excise)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter64G" },
    historicalNote: {
      note:
        "A big share of this line historically comes from a single property: the Great Wolf Lodge water park resort, which alone has generated roughly $1 million a year in hotel tax for the city in some years. That's worth keeping in mind looking at the chart above - swings in this line often track what's happening at one hotel more than the local hotel market as a whole. The resort laid off 700 workers during the COVID-19 pandemic, one of the largest single mass layoffs in Central Massachusetts at the time, which lines up with this line briefly dropping to zero.",
      sourceLabel: "Worcester Business Journal",
      sourceUrl: "https://www.wbjournal.com/article/great-wolf-lodges-700-layoffs-lead-the-more-than-1400-announced-in-central-mass",
    },
  },
  "other-excise-meals": {
    blurb: "An extra charge added to your bill when you eat at a restaurant in Fitchburg, on top of the state's own meals tax.",
    citation: { label: "M.G.L. c. 64L (local option meals excise)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter64L" },
    historicalNote: {
      note:
        "Fitchburg's City Council adopted this local option in a 7-4 vote in March 2025, which is why it shows up in the budget for the first time in FY2026 rather than having a longer history like most other local receipts.",
      sourceLabel: "Sentinel & Enterprise",
      sourceUrl: "https://edition.pagesuite.com/tribune/article_popover.aspx?guid=4829053d-8956-4aaa-bd20-e65dd68bc739",
    },
  },
  "other-excise-cannabis": {
    blurb: "An extra charge added when you buy legal marijuana from a shop in Fitchburg, on top of state taxes.",
    citation: { label: "M.G.L. c. 64N (marijuana excise)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter64N" },
  },
  "penalties-interest-on-taxes": {
    blurb: "Late fees and interest charged to people who pay their property tax or car excise bill after the due date.",
  },
  "payments-in-lieu-of-taxes": {
    blurb:
      "Some organizations in Fitchburg - like colleges, hospitals, or housing authorities - don't have to pay property tax. Some of them make a voluntary payment to the city anyway, and this is that money.",
  },
  "charges-for-services-trash": {
    blurb: "Fees the city charges for trash and recycling pickup.",
  },
  "other-charges-for-services": {
    blurb: "Smaller fees for city services that don't have their own line item.",
  },
  fees: {
    blurb: "General fees the city charges that don't fit neatly into any other category on this list.",
  },
  rentals: {
    blurb: "Rent the city collects from renting out city-owned buildings or property.",
  },
  "department-revenues-cemetery": {
    blurb: "Money collected for burial plots and related services at the city's cemeteries.",
  },
  "other-department-revenues": {
    blurb: "Smaller amounts of money individual city departments bring in through their day-to-day work.",
  },
  "licenses-and-permits": {
    blurb: "Fees for the various licenses and permits the city issues - things like business licenses and building permits.",
  },
  "fines-and-forfeitures": {
    blurb: "Money collected from parking tickets and other fines for breaking city rules.",
  },
  "investment-income": {
    blurb: "Interest the city earns by keeping its cash in interest-bearing accounts, similar to interest on a savings account. Goes up and down with interest rates.",
  },
  "reimbursement-for-related-exp-cdbg": {
    blurb:
      "Fitchburg gets a federal grant (called CDBG) for housing and neighborhood improvement projects. This is the city getting paid back for the staff time it spends running that grant program.",
  },
  "reimbursement-for-related-exp-airport": {
    blurb: "The city fronts some costs for running the Fitchburg Municipal Airport, and this is that money being paid back to the general city budget.",
  },
  "medicaid-reimbursement": {
    blurb: "Money back from Medicaid for certain health services the school district and other city departments provide to eligible students and residents.",
  },
  "other-state-revenue-recurring": {
    blurb: "Smaller amounts of regular state funding that don't have their own line item.",
  },

  // --- Non-Recurring Revenue ---
  "fire-ambulance-service-fees": {
    blurb: "Bills sent to patients and their insurance companies when the Fire Department responds to a medical emergency and provides ambulance transport.",
  },
  "reimbursement-from-monty-tech-sro": {
    blurb:
      "Fitchburg and Monty Tech (the regional vocational school) share the cost of a police officer stationed at the school. This is Monty Tech paying its share to Fitchburg.",
  },
  "reimbursement-for-fringes-grants": {
    blurb:
      "When city employees spend time working on a federal or state grant, part of their benefits cost (health insurance, retirement, etc.) can be charged to that grant. This is that money coming back to the city.",
  },

  // --- Other Revenue Sources ---
  "reimbursement-for-related-exp-water": {
    blurb: "The Water Department (funded by your water bill) pays the general city budget back for its share of shared costs like billing and IT support.",
  },
  "reimbursement-for-related-exp-sewer": {
    blurb: "The Sewer Department (funded by your sewer bill) pays the general city budget back for its share of shared costs like billing and IT support.",
  },
  "overlay-surplus": {
    blurb:
      "Remember the money the city sets aside every year in case people win property tax appeals? Once a given year's appeals are settled, whatever's left over in that account gets freed up, and this is that leftover money.",
  },
  "available-funds-transfers-one-time": {
    blurb:
      "Mostly \"free cash\" - money left over from last year that wasn't spent, plus revenue that came in higher than expected. The state has to double-check the city's books first, and then the City Council can vote to spend it.",
    citation: { label: "M.G.L. c. 59, § 23 (certification of available funds)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter59/Section23" },
  },
};
