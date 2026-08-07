/**
 * Editorial descriptions for each General Fund revenue category. These are
 * hand-written and stable (state statute and municipal-finance structure
 * changes rarely), unlike the dollar figures elsewhere on the site, which
 * are all pulled from the budget PDFs at build time. Keyed by the slug
 * produced by slugify() in ../budgets.js from the category's subtotal
 * label - keep these in sync if a subtotal label ever changes.
 */
export const revenueCategoryContent = {
  taxation: {
    label: "Taxation",
    whatItIs:
      "The property tax levy - the total amount Fitchburg raises by taxing real estate and personal property within the city. It is, by a wide margin, the largest single source of General Fund revenue.",
    whereItComesFrom:
      "Annual tax bills sent to every owner of taxable real estate (land and buildings) and certain business personal property in Fitchburg, based on the assessed value the Board of Assessors sets for each parcel.",
    whoControlsIt:
      "The amount the city is *allowed* to raise is capped by state law - Proposition 2½ (M.G.L. c. 59, § 21C), enacted in 1980. Each year's levy limit grows automatically by up to 2.5% plus the value of \"new growth\" (new construction and other additions to the tax base); raising it further requires voters to approve an override or exclusion at the ballot. Within that limit, the City Council votes annually on tax classification (how the burden is split between property classes), and the actual dollar tax rate is certified each year by the Massachusetts Department of Revenue's Division of Local Services (DLS) through the Tax Rate Recapitulation process.",
    rates:
      "Fitchburg taxes all property classes at a single, unified rate rather than a split residential/commercial rate. For FY2026 that rate is **$13.29 per $1,000 of assessed value**, per the [City Assessors' office](https://www.fitchburgma.gov/195/Assessors) - so a home assessed at $300,000 owes about $3,987 for the year. This rate changes annually and is set independently of anything on this page; check the Assessors' office for the current figure.",
    sourceLabel: "City Assessors' Office",
    sourceUrl: "https://www.fitchburgma.gov/195/Assessors",
  },

  "state-aid-education": {
    label: "State Aid — Education",
    whatItIs:
      "State aid earmarked specifically for the Fitchburg Public Schools - overwhelmingly the Chapter 70 education aid formula, plus reimbursements tied to students who attend school outside the district.",
    whereItComesFrom:
      "The Commonwealth's annual state budget. Chapter 70 is calculated through a \"foundation budget\" formula that estimates what it costs to adequately educate Fitchburg's students, compares that to what the city can reasonably raise locally, and fills most of the gap with state aid - which is why school aid makes up such a large share of a district like Fitchburg's revenue.",
    whoControlsIt:
      "The Massachusetts Legislature sets the statewide Chapter 70 appropriation each year as part of the state budget; the Department of Elementary and Secondary Education (DESE) calculates each district's individual entitlement under the formula (M.G.L. c. 70). Charter school and school choice tuition reimbursements are separate, smaller state programs that offset (imperfectly and often with a lag) what the district loses when a resident student attends a charter school or another district instead.",
    rates:
      "Not a rate the city sets - it's a formula-driven state appropriation. The Chapter 70 foundation budget formula and each district's minimum aid increase are published annually by DESE; see [DESE's Chapter 70 program page](https://www.doe.mass.edu/finance/chapter70/) for the current formula and Fitchburg's certified aid figure.",
    sourceLabel: "MA Dept. of Elementary & Secondary Education",
    sourceUrl: "https://www.doe.mass.edu/finance/chapter70/",
  },

  "state-aid-general": {
    label: "State Aid — General Government",
    whatItIs:
      "Non-school state aid: Unrestricted General Government Aid (UGGA), the state's reimbursement for statutory property-tax exemptions the city grants to veterans, blind residents, surviving spouses, and elderly homeowners, and small per-capita aid tied to state-owned land and public libraries.",
    whereItComesFrom:
      "The state budget's \"cherry sheet\" - the itemized statement of state aid and assessments DLS sends every city and town each year (named for the cherry-colored paper it was historically printed on).",
    whoControlsIt:
      "The Legislature sets the statewide UGGA appropriation annually; DLS calculates and certifies each municipality's specific cherry sheet entries. The city has no discretion over these amounts beyond applying for the exemption-reimbursement programs it's eligible for.",
    rates:
      "Formula- and appropriation-driven, not a local rate. Current cherry sheet estimates for every municipality are published by DLS; see the [Division of Local Services cherry sheet page](https://www.mass.gov/info-details/cherry-sheets).",
    sourceLabel: "MA Division of Local Services — Cherry Sheets",
    sourceUrl: "https://www.mass.gov/info-details/cherry-sheets",
  },

  "state-assessments": {
    label: "State Assessments",
    whatItIs:
      "Charges the state deducts directly from Fitchburg's cherry sheet rather than billing separately - the flip side of state aid. These fund regional and statewide services the city participates in, whether or not it would have chosen to opt in on its own.",
    whereItComesFrom:
      "A mix of regional-authority assessments (the Montachusett Regional Transit Authority) and statewide program charges (mosquito control, air pollution control districts, an RMV non-renewal surcharge for unpaid excise, and special education and school-choice/charter tuition assessments tied to where Fitchburg students actually attend school).",
    whoControlsIt:
      "Set by the regional authorities and state agencies that administer each program, then netted against the city's cherry sheet aid by DLS. The City Council does not vote on these charges directly, though membership in some regional entities (like the transit authority) is a longer-standing municipal decision.",
    rates:
      "Each assessment has its own basis (per-capita for mosquito/air pollution control, ridership/service-area formulas for regional transit, actual tuition costs for school choice and charter assessments). Current cherry sheet assessment worksheets are published alongside the aid estimates at [mass.gov's cherry sheet page](https://www.mass.gov/info-details/cherry-sheets).",
    sourceLabel: "MA Division of Local Services — Cherry Sheets",
    sourceUrl: "https://www.mass.gov/info-details/cherry-sheets",
  },

  "local-receipts": {
    label: "Local Receipts",
    whatItIs:
      "Locally-generated revenue that isn't property tax: motor vehicle excise, local-option excises on meals, hotel/motel rooms, and cannabis sales, fees for trash collection and other city services, licenses and permits, fines, interest income, and a few reimbursements.",
    whereItComesFrom:
      "Directly from residents and businesses transacting with the city or the local economy: registering a vehicle, eating at a restaurant, booking a hotel room, buying cannabis, taking out a license, or paying a fine.",
    whoControlsIt:
      "A mix. Motor vehicle excise is entirely set by state law - the city has no discretion over the rate, only over collection. The meals, rooms, and cannabis excises are \"local option\": state law sets the maximum rate, and the City Council decides whether to adopt them and at what rate up to that cap. Most fees, fines, and license charges are set locally by ordinance or department fee schedule, subject to any state-law ceilings.",
    rates:
      "**Motor vehicle excise** is fixed statewide by M.G.L. c. 60A at **$25 per $1,000** of the vehicle's value (set by a statutory depreciation schedule from MSRP, not resale value). **Local meals tax**, where adopted, is up to **0.75%** on top of the state's 6.25% meals sales tax. **Local room occupancy excise**, where adopted, is up to **6%** on top of the state's 5.7% excise. **Local cannabis excise**, where adopted, is up to **3%** on retail sales. Fitchburg has adopted several of these local options - the dollar amounts actually collected for each are in the table above; the city's Municipal Code and fee schedules set the rest.",
    sourceLabel: "Mass. Dept. of Revenue — Local Option Excise Taxes",
    sourceUrl: "https://www.mass.gov/local-option-excise-taxes",
  },

  "non-recurring-revenue": {
    label: "Non-Recurring Revenue",
    whatItIs:
      "Revenue the city expects but treats separately from its core recurring receipts - ambulance service fees, a reimbursement from Montachusett Regional Vocational Technical School for a shared School Resource Officer, and reimbursement of employee-benefit costs charged against grant funding.",
    whereItComesFrom:
      "Ambulance billing to patients and their insurers for Fire Department EMS transports; an interlocal agreement with Monty Tech; and federal/state grants that include an allowance for the fringe-benefit costs of the staff time charged to them.",
    whoControlsIt:
      "Ambulance fee schedules are set locally, typically by the Fire Department/City Council and often benchmarked to regional or Medicare rates. The Monty Tech reimbursement follows an interlocal agreement between the two governments. Grant fringe reimbursement is set by each grant's own terms.",
    rates:
      "No single published rate - ambulance fees follow a locally-set fee schedule (contact the Fire Department for the current schedule); the other two lines are contractual/grant-driven rather than rate-based.",
    sourceLabel: null,
    sourceUrl: null,
  },

  "other-revenue-sources": {
    label: "Other Revenue Sources",
    whatItIs:
      "A catch-all for General Fund revenue that comes from the city's own enterprise funds and reserves rather than taxpayers or the state: reimbursement from the Water and Sewer enterprise funds for shared administrative costs, the annual overlay surplus, and appropriated free cash and other available funds.",
    whereItComesFrom:
      "The Water and Sewer enterprise funds (which are themselves funded by ratepayer bills) reimburse the General Fund for a share of shared costs like billing, IT, and administration. \"Overlay surplus\" is money left over in the account the Assessors maintain to cover property-tax abatements once that year's abatements are settled. \"Available funds/transfers\" is mostly free cash - the portion of the prior year's actual revenue and unspent appropriations left over after the books close.",
    whoControlsIt:
      "The Water/Sewer cost-allocation methodology is set locally, typically by the Auditor's office. Overlay surplus is released by vote of the Board of Assessors once prior-year abatements are resolved. Free cash must first be certified by the Department of Revenue based on the city's year-end balance sheet before the City Council can appropriate any of it.",
    rates:
      "Not rate-based - these are one-time or formula-allocated transfers rather than taxes or fees. Free cash certification methodology is published by DLS; see [Free Cash | Mass.gov](https://www.mass.gov/info-details/free-cash).",
    sourceLabel: "MA Division of Local Services — Free Cash",
    sourceUrl: "https://www.mass.gov/info-details/free-cash",
  },
};
