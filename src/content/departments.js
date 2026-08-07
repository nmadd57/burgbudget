/**
 * Plain-language explanations for each department/spending line in the
 * General Fund budget - written for a general reader, not a finance
 * professional. Pairs with ../content/revenue-categories.js and
 * revenue-line-items.js on the spending side. Each entry can include a
 * "citation" (the state law that creates or governs the office/service,
 * verified against malegislature.gov rather than assumed from memory) -
 * some line items are budgetary/administrative groupings with no single
 * governing statute, and those are left uncited rather than guessed at.
 * Keyed by the slug slugify() produces from the department name in
 * src/_data/budgets.js.
 */
export const departmentContent = {
  legislative: {
    blurb:
      "This pays for the City Council - the elected group that passes local laws (ordinances), approves the budget, and represents each part of the city.",
    whoRunsIt: "The City Council itself, elected by Fitchburg voters.",
    citation: { label: "M.G.L. c. 43 (City Charters)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleVII/Chapter43" },
  },
  executive: {
    blurb:
      "This pays for the Mayor's office - the elected head of city government who proposes the budget, runs day-to-day operations, and appoints department heads.",
    whoRunsIt: "The Mayor, elected citywide by Fitchburg voters.",
    citation: { label: "M.G.L. c. 43 (City Charters)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleVII/Chapter43" },  },
  "finance-administration": {
    blurb:
      "The behind-the-scenes offices that keep city government running: the people who track spending, cut checks, collect taxes, assess property values, run IT, handle hiring, and provide legal advice to the city.",
    whoRunsIt: "The City Auditor, Treasurer/Collector, Board of Assessors, and other department heads here are all Mayor-appointed positions under Fitchburg's charter.",
    citation: { label: "M.G.L. c. 41 (Municipal Officers) & c. 44 (Municipal Finance)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleVII/Chapter41" },  },
  "debt-service": {
    blurb:
      "The city's loan payments - principal and interest on money Fitchburg has borrowed over the years to pay for big-ticket projects like school buildings, road work, and equipment, the same way a mortgage payment works for a house.",
    whoRunsIt:
      "The City Council authorizes new borrowing (with state debt limits capping how much the city can take on); the Treasurer manages the actual loan payments.",
    citation: { label: "M.G.L. c. 44 (Municipal Finance)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleVII/Chapter44" },
  },
  "community-development": {
    blurb:
      "The office that handles planning, zoning, and housing and neighborhood improvement projects, largely using federal grant money (Community Development Block Grants) rather than local tax dollars.",
    whoRunsIt: "A city department under the Mayor, working within rules set by the federal Department of Housing and Urban Development for how grant money can be spent.",
    citation: { label: "Federal Housing & Community Development Act", url: "https://www.hud.gov/program_offices/comm_planning/cdbg" },  },
  "facilities-maintenance": {
    blurb: "The upkeep of city-owned buildings - repairs, cleaning, heating and cooling, and general maintenance so city facilities stay usable.",
    whoRunsIt: "A city department under the Mayor.",
    citation: null,  },
  police: {
    blurb: "The Fitchburg Police Department - patrol officers, detectives, dispatch, and everything else involved in public safety and law enforcement in the city.",
    whoRunsIt: "The Police Chief, appointed by the Mayor, running a department whose officers are city employees.",
    citation: { label: "M.G.L. c. 41 (Municipal Officers)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleVII/Chapter41" },  },
  fire: {
    blurb: "The Fitchburg Fire Department - firefighting, emergency medical response, fire inspections, and fire prevention.",
    whoRunsIt: "The Fire Chief, appointed by the Mayor.",
    citation: { label: "M.G.L. c. 48 (Fires, Fire Departments and Fire Districts)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleVII/Chapter48" },  },
  "building-inspectional-services": {
    blurb: "The office that inspects construction and issues building permits, making sure new construction and renovations in Fitchburg meet the state building code.",
    whoRunsIt: "The city's Building Commissioner/Inspector, enforcing the statewide building code the same way in every Massachusetts city and town.",
    citation: { label: "M.G.L. c. 143 (Inspection & Regulation of Buildings)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXX/Chapter143" },  },
  dpw: {
    blurb:
      "The Department of Public Works - the crews who fix potholes, plow snow, maintain parks and cemeteries, run stormwater drainage, and take care of most of the physical infrastructure you see around the city day to day.",
    whoRunsIt: "A DPW Commissioner or Director, appointed by the Mayor.",
    citation: { label: "M.G.L. c. 40 (Powers & Duties of Cities and Towns)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleVII/Chapter40" },  },
  "board-of-health": {
    blurb: "Public health protection for the city - restaurant inspections, communicable disease response, housing and sanitation code enforcement, and similar health-safety work.",
    whoRunsIt: "A Board of Health appointed by the Mayor (subject to City Council confirmation), along with public health staff.",
    citation: { label: "M.G.L. c. 111 (Public Health)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXVI/Chapter111" },  },
  "rubbish-removal-collect": {
    blurb: "Trash and recycling collection and disposal for Fitchburg households.",
    whoRunsIt: "The Department of Public Works, as a public-health and sanitation function of city government.",
    citation: { label: "M.G.L. c. 111 (Public Health)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXVI/Chapter111" },  },
  "human-services": {
    blurb:
      "A grouping of services aimed at residents who need extra support: help for veterans, programs for seniors through the Council on Aging, recreation programs, and the public library.",
    whoRunsIt: "Several smaller city offices and boards, including the Veterans' Services Officer, the Council on Aging, and the Library Board of Trustees, all Mayor-appointed.",
    citation: { label: "M.G.L. c. 40, § 8B (Council on Aging)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleVII/Chapter40/Section8B" },  },
  "employee-benefits": {
    blurb:
      "What the city pays toward its employees' health insurance, retirement pensions, and other benefits, on top of their salaries. This has been one of the fastest-growing costs in the whole budget.",
    whoRunsIt: "The city administers health insurance under its own rules; pensions go through the Fitchburg Retirement System, which follows state pension law.",
    citation: { label: "M.G.L. c. 32 (Pensions) & c. 32B (Group Health Insurance)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIV/Chapter32" },
  },
  "miscellaneous-expenses": {
    blurb: "A catch-all budget line for city-wide costs that don't belong to any single department - things like insurance premiums and other shared expenses.",
    whoRunsIt: "Managed centrally by the Finance & Administration offices.",
    citation: null,
  },
  "transfers-out": {
    blurb: "Money moved from the General Fund into another city fund - for example, to help cover costs in an enterprise fund like Water or Sewer. Not new spending on its own, just money being shifted between accounts.",
    whoRunsIt: "Approved by the City Council as part of the annual budget process.",
    citation: { label: "M.G.L. c. 44 (Municipal Finance)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleVII/Chapter44" },
  },
  "montachusett-regional": {
    blurb:
      "Fitchburg's payment to Montachusett Regional Vocational Technical School (Monty Tech) for educating Fitchburg students who attend the regional vocational school instead of Fitchburg High School.",
    whoRunsIt: "Monty Tech's own regional school committee runs the school; Fitchburg and the other member towns are billed based on how many of their students attend.",
    citation: { label: "M.G.L. c. 74 (Vocational Education)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXII/Chapter74" },
  },
  "fitchburg-public-schools": {
    blurb:
      "The single largest item in the whole city budget: everything it costs to run the Fitchburg Public Schools - teachers, staff, buildings, transportation, and supplies for every student in the district.",
    whoRunsIt:
      "The elected Fitchburg School Committee sets school policy and hires the Superintendent; the city is legally required to fund the schools at a level the state calculates as adequate (see State Aid — Education for how that number is set).",
    citation: { label: "M.G.L. c. 71 (Public Schools)", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXII/Chapter71" },
  },
};
