/**
 * Short, hand-written explanations for individual revenue line items -
 * one level more granular than ../content/revenue-categories.js. Keyed by
 * the slug slugify() produces from the line item's exact label in the
 * budget PDF (see src/_data/budgets.js). Entries are optional: a line
 * item with no entry here still gets its own page (trend chart + table),
 * just without the "blurb"/"rate" prose sections.
 */
export const revenueLineItemContent = {
  // --- Taxation ---
  "prior-year-s-levy-limit": {
    blurb:
      "The prior fiscal year's levy limit - the base Proposition 2½ starts from each year before applying the automatic 2.5% increase and new growth.",
  },
  "add-2-1-2": {
    blurb:
      "The automatic 2.5% increase Proposition 2½ allows every community to add to its levy limit each year, regardless of inflation or actual spending needs.",
  },
  "add-new-growth": {
    blurb:
      "The added tax capacity from new construction, subdivisions, renovations, and other additions to the tax base since last year - the one part of the levy limit increase that reflects real growth in the city rather than an automatic statutory allowance.",
  },
  "subtotal-levy-limit": {
    blurb:
      "The running subtotal of the levy limit calculation (prior year's limit, plus the automatic 2.5%, plus new growth) before abatement reserves are subtracted.",
  },
  "actual-levy-adjusted-for-rounding": {
    blurb:
      "The levy limit figure actually certified by the Department of Revenue, adjusted for the small rounding differences that accumulate in the levy-limit math over time.",
  },
  "less-reserve-for-abatements": {
    blurb:
      "An amount set aside (the \"overlay\") to cover tax abatements the Board of Assessors is expected to grant during the year - for successful appeals, exemptions, and correction of errors - so the city doesn't over-collect against its levy limit.",
  },

  // --- State Aid: Education ---
  "education-chapter-70": {
    blurb:
      "The city's Chapter 70 education aid - see the State Aid — Education category page for how the formula works.",
  },
  "education-charter-tuition-reimbursements": {
    blurb:
      "Partial, phased state reimbursement for tuition Fitchburg pays when a resident student attends a Massachusetts charter school instead of the Fitchburg Public Schools.",
  },
  "education-school-choice-receiving-tuition": {
    blurb:
      "Tuition Fitchburg Public Schools receives from other municipalities for non-resident students who choose to enroll here under the state's School Choice program.",
  },
  "less-offset": {
    blurb:
      "An accounting offset that nets a corresponding charge elsewhere on the cherry sheet against this aid line, so the same dollars aren't counted as revenue twice.",
  },

  // --- State Aid: General Government ---
  "general-unrestricted-general-government-aid": {
    blurb:
      "Unrestricted General Government Aid (UGGA) - the state's main no-strings-attached local aid program, usable for any municipal purpose.",
  },
  "general-veterans-benefits": {
    blurb:
      "State reimbursement (typically 75%) of benefits Fitchburg pays to eligible needy veterans and their dependents under the state's Chapter 115 veterans' benefits program.",
  },
  "exemptions-vets-blind-surviving-spouse-elderly": {
    blurb:
      "State reimbursement for a share of the statutory property-tax exemptions Fitchburg is required to grant to qualifying veterans, blind residents, surviving spouses, and low-income elderly homeowners.",
  },
  "general-state-owned-land": {
    blurb:
      "A small per-acre payment the state makes to municipalities in place of property tax on state-owned land within their borders, since that land is otherwise tax-exempt.",
  },
  "general-public-libraries": {
    blurb:
      "State aid to the Fitchburg Public Library, conditioned on the library meeting minimum local funding and service standards set by the Massachusetts Board of Library Commissioners.",
  },
  "less-offset-public-library": {
    blurb:
      "An accounting offset netting a corresponding charge against the public libraries aid line above.",
  },

  // --- State Assessments ---
  "assessment-mosquito-control-projects": {
    blurb:
      "Fitchburg's assessed share of the cost of its regional mosquito control district's operations (surveillance, larviciding, and spraying), billed to every member municipality on the cherry sheet.",
  },
  "assessment-air-pollution-districts": {
    blurb:
      "Fitchburg's assessed share of the cost of the regional air pollution control district it belongs to, one of several such districts statewide that share environmental monitoring and enforcement costs among member communities.",
  },
  "assessment-rmv-non-renewal-surcharge": {
    blurb:
      "A per-use charge for the Registry of Motor Vehicles' service that blocks license and registration renewals for residents with unpaid excise tax bills - a collection tool cities and towns opt into, billed back on a per-use basis.",
  },
  "assessment-regional-transit": {
    blurb:
      "Fitchburg's required contribution to the Montachusett Regional Transit Authority (MART), the regional public bus system serving the city and surrounding communities.",
  },
  "assessment-special-education": {
    blurb:
      "Fitchburg's assessed share of certain state-administered special education program costs, billed back to sending districts on the cherry sheet.",
  },
  "assessment-school-choice-sending-tuition": {
    blurb:
      "Tuition Fitchburg pays to other districts for resident students who choose to attend school elsewhere under the state's School Choice program - the mirror image of the School Choice tuition Fitchburg receives.",
  },
  "assessment-charter-school-sending-tuition": {
    blurb:
      "Tuition Fitchburg pays for each resident student who attends a Massachusetts charter school instead of the Fitchburg Public Schools - the city's largest single cherry sheet assessment, only partially offset by charter tuition reimbursement.",
  },

  // --- Local Receipts ---
  "motor-vehicle-excise": {
    blurb: "See the Local Receipts category page for the statewide excise rate and how it's calculated.",
  },
  "other-excise-rooms": {
    blurb:
      "The local-option room occupancy excise on hotel, motel, and short-term-rental stays in Fitchburg, on top of the state's own room occupancy excise.",
  },
  "other-excise-meals": {
    blurb:
      "The local-option 0.75% excise on restaurant meals sold in Fitchburg, collected alongside the state's 6.25% meals sales tax.",
  },
  "other-excise-cannabis": {
    blurb:
      "The local-option excise on retail sales of recreational marijuana by cannabis businesses located in Fitchburg.",
  },
  "penalties-interest-on-taxes": {
    blurb: "Interest and penalty charges on property tax and excise bills paid after their due date.",
  },
  "payments-in-lieu-of-taxes": {
    blurb:
      "\"PILOT\" payments - voluntary or negotiated payments from tax-exempt property owners (universities, hospitals, housing authorities, and similar institutions) that don't otherwise pay property tax.",
  },
  "charges-for-services-trash": {
    blurb:
      "Fees charged for residential trash and recycling collection and disposal, set by the Department of Public Works' fee schedule.",
  },
  "other-charges-for-services": {
    blurb: "Miscellaneous fees for city services not broken out into their own line item.",
  },
  fees: {
    blurb: "General municipal fees not captured elsewhere on the recap, set by local ordinance or department fee schedules.",
  },
  rentals: {
    blurb: "Rental income from city-owned property and facilities.",
  },
  "department-revenues-cemetery": {
    blurb: "Fees for burial lots, interments, and related services at the city's municipal cemeteries.",
  },
  "other-department-revenues": {
    blurb: "Miscellaneous revenue generated by individual city departments in the course of their operations.",
  },
  "licenses-and-permits": {
    blurb:
      "Fees for the many local licenses and permits the city issues - business licenses, building and trade permits, and similar - set by ordinance and the relevant department's fee schedule.",
  },
  "fines-and-forfeitures": {
    blurb: "Revenue from fines, including parking tickets and other municipal code violations.",
  },
  "investment-income": {
    blurb: "Interest earned on the city's cash balances and short-term investments, which rises and falls with prevailing interest rates.",
  },
  "reimbursement-for-related-exp-cdbg": {
    blurb:
      "Reimbursement of eligible administrative costs from the city's federal Community Development Block Grant (CDBG) allocation, a HUD program for housing and community development activities.",
  },
  "reimbursement-for-related-exp-airport": {
    blurb: "Reimbursement to the General Fund for costs it fronts on behalf of the Fitchburg Municipal Airport enterprise operation.",
  },
  "medicaid-reimbursement": {
    blurb:
      "Federal/state Medicaid reimbursement for eligible health-related services the school district and other city departments provide, primarily through the School-Based Medicaid program.",
  },
  "other-state-revenue-recurring": {
    blurb: "Smaller, recurring state revenue sources that don't warrant their own line item.",
  },

  // --- Non-Recurring Revenue ---
  "fire-ambulance-service-fees": {
    blurb: "Fees billed to patients and their insurers for Fire Department ambulance transports, per the department's fee schedule.",
  },
  "reimbursement-from-monty-tech-sro": {
    blurb:
      "Reimbursement from Montachusett Regional Vocational Technical School (Monty Tech) for its share of the cost of a shared School Resource Officer, under an interlocal agreement between the two governments.",
  },
  "reimbursement-for-fringes-grants": {
    blurb:
      "Reimbursement of employee fringe-benefit costs (health insurance, retirement contributions, etc.) for staff time charged to federal and state grants, per each grant's own terms.",
  },

  // --- Other Revenue Sources ---
  "reimbursement-for-related-exp-water": {
    blurb: "Reimbursement from the Water enterprise fund for its share of costs (billing, IT, administration) the General Fund pays on its behalf.",
  },
  "reimbursement-for-related-exp-sewer": {
    blurb: "Reimbursement from the Wastewater/Sewer enterprise fund for its share of costs the General Fund pays on its behalf.",
  },
  "overlay-surplus": {
    blurb:
      "Money released from the property-tax abatement reserve (the \"overlay\") once a given year's abatements are settled and a surplus remains, voted by the Board of Assessors.",
  },
  "available-funds-transfers-one-time": {
    blurb:
      "One-time transfers into the operating budget, predominantly \"free cash\" - the portion of the prior year's actual revenue and unspent appropriations left over once the books close, which must be certified by the Department of Revenue before the City Council can appropriate it.",
  },
};
