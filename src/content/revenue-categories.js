/**
 * Editorial descriptions for each General Fund revenue category. Written
 * in plain language for a general audience, not finance professionals -
 * short sentences, everyday words, concrete dollar examples. These are
 * hand-written and stable (state law and municipal-finance structure
 * changes rarely), unlike the dollar figures elsewhere on the site, which
 * are all pulled from the budget PDFs at build time. Keyed by the slug
 * produced by slugify() in ../budgets.js from the category's subtotal
 * label - keep these in sync if a subtotal label ever changes.
 */
export const revenueCategoryContent = {
  taxation: {
    label: "Taxation",
    whatItIs:
      "This is property tax - the money Fitchburg collects from everyone who owns a house, building, or land in the city. It's by far the single biggest source of money the city has to spend.",
    whereItComesFrom:
      "Your property tax bill. If you own a home, a store, a factory, or a piece of land in Fitchburg, you get a bill a few times a year based on what the city says your property is worth.",
    whoControlsIt:
      "There's a state law from 1980 called Proposition 2½ that limits how much more property tax the city is allowed to collect each year - normally just 2.5% more than last year, plus whatever new construction adds to the tax rolls. The city can't just decide to collect more; voters would have to approve it directly at the ballot box. Within that limit, the City Council votes each year on how the tax burden is divided up, and the state (the Department of Revenue) has to sign off on the actual tax rate before bills go out.",
    rates:
      "Fitchburg charges the same rate to homeowners and businesses alike - it doesn't split the rate like some cities do. For FY2026, that rate is **$13.29 for every $1,000 your property is worth**, according to the [City Assessors' office](https://www.fitchburgma.gov/195/Assessors). So if your house is valued at $300,000, you'd owe about $3,987 for the year. This number is set fresh every year, so check with the Assessors' office for the current one.",
    sourceLabel: "City Assessors' Office",
    sourceUrl: "https://www.fitchburgma.gov/195/Assessors",
  },

  "state-aid-education": {
    label: "State Aid — Education",
    whatItIs:
      "Money the state sends Fitchburg specifically to help pay for the public schools. Almost all of it is a program called \"Chapter 70,\" plus some smaller payments tied to kids who go to school somewhere other than a regular Fitchburg public school.",
    whereItComesFrom:
      "The state's yearly budget. The state looks at what it should cost to give Fitchburg's kids a decent education, compares that to what the city can afford to raise on its own through property tax, and sends enough aid to help cover the difference. That's why school aid is such a big chunk of what the city takes in - Fitchburg can't cover the full cost of its schools through property tax alone.",
    whoControlsIt:
      "State lawmakers decide how much money goes into this program every year when they pass the state budget. The state's education department then works out exactly how much Fitchburg gets, using a formula that's the same for every city and town. The smaller payments - for kids who go to charter schools or choose a different district - work the same way but come with their own, separate state programs, and they don't always fully make up for what the district loses when a student leaves.",
    rates:
      "This isn't something the city sets - it comes from a state formula that's recalculated every year. The state publishes the formula and every district's aid amount at [the state's Chapter 70 page](https://www.doe.mass.edu/finance/chapter70/) if you want to see exactly how Fitchburg's number was reached.",
    sourceLabel: "MA Dept. of Elementary & Secondary Education",
    sourceUrl: "https://www.doe.mass.edu/finance/chapter70/",
  },

  "state-aid-general": {
    label: "State Aid — General Government",
    whatItIs:
      "Money the state sends Fitchburg that isn't tied to schools. Most of it is general-purpose aid the city can spend on anything - police, fire, roads, whatever it needs. The rest pays the city back for tax breaks it's required by law to give veterans, blind residents, seniors, and surviving spouses, plus a little extra for city-owned land the state can't tax and for the public library.",
    whereItComesFrom:
      "The state's yearly budget. Every city and town in Massachusetts gets a breakdown each year - nicknamed the \"cherry sheet\" because of the color paper it used to be printed on - showing exactly what state aid it's getting and what it owes the state.",
    whoControlsIt:
      "State lawmakers decide the total amount every year. The state then calculates exactly what Fitchburg's share is - the city doesn't get to negotiate or ask for more, beyond making sure it's signed up for the tax-break reimbursement programs it qualifies for.",
    rates:
      "There's no rate to look up - it's a dollar amount the state calculates and sends. You can see every city and town's numbers on the [state's cherry sheet page](https://www.mass.gov/info-details/cherry-sheets).",
    sourceLabel: "MA Division of Local Services — Cherry Sheets",
    sourceUrl: "https://www.mass.gov/info-details/cherry-sheets",
  },

  "state-assessments": {
    label: "State Assessments",
    whatItIs:
      "Bills the state sends Fitchburg instead of aid - money the city owes for regional and state services, taken right off the top of the aid it would otherwise receive. Think of it as the opposite of the state aid categories above: money going out instead of in.",
    whereItComesFrom:
      "A mix of charges: Fitchburg's share of the cost of the regional bus system, mosquito spraying, an air-quality program, and tuition bills for Fitchburg students who go to a charter school or a different public school district instead of Fitchburg's own schools.",
    whoControlsIt:
      "These charges are set by the state agencies and regional boards that run each program - the City Council doesn't get a vote on the bill itself, though the city did choose to join some of these regional programs (like the bus system) at some point in the past.",
    rates:
      "Each charge is figured differently - some by population, some by how many Fitchburg kids actually use the service. You can see the full breakdown on the [state's cherry sheet page](https://www.mass.gov/info-details/cherry-sheets).",
    sourceLabel: "MA Division of Local Services — Cherry Sheets",
    sourceUrl: "https://www.mass.gov/info-details/cherry-sheets",
  },

  "local-receipts": {
    label: "Local Receipts",
    whatItIs:
      "Money the city collects locally that isn't property tax: the fee you pay to register your car, extra pennies on the dollar when you eat out or stay in a hotel, trash pickup fees, permits, parking tickets and other fines, interest the city earns on its bank accounts, and a few other odds and ends.",
    whereItComesFrom:
      "You, more or less directly - registering a car, eating at a restaurant, staying at a hotel, buying legal marijuana, getting a permit, or paying a ticket.",
    whoControlsIt:
      "It depends on the item. The car registration fee is set entirely by the state - the city has no say in that one. The extra tax on restaurant meals, hotel stays, and marijuana sales are all optional add-ons the City Council chose to adopt, up to a cap set by the state. Most other fees and fines are set by the city itself.",
    rates:
      "**Car registration fee (\"excise tax\")**: set by the state at **$25 for every $1,000** your vehicle is worth, based on a fixed depreciation schedule from the original sticker price - not what you could sell it for. **Meals tax**: up to an extra **0.75%** on top of the state's 6.25% meals tax, if the city has adopted it. **Hotel/motel tax**: up to an extra **6%** on top of the state's 5.7% tax, if adopted. **Marijuana sales tax**: up to an extra **3%**, if adopted. Fitchburg has adopted several of these - you can see exactly how much each one brought in this year in the table above.",
    sourceLabel: "Mass. Dept. of Revenue — Local Option Excise Taxes",
    sourceUrl: "https://www.mass.gov/local-option-excise-taxes",
  },

  "non-recurring-revenue": {
    label: "Non-Recurring Revenue",
    whatItIs:
      "Money the city expects to collect but keeps in a separate bucket from its everyday income: ambulance bills, a payment from the regional vocational school for sharing a police officer, and money back from grants to cover employee benefit costs.",
    whereItComesFrom:
      "Ambulance bills go to patients and their insurance companies when the Fire Department responds to a medical call. The vocational school payment comes from an agreement to split the cost of a shared School Resource Officer. The grant money comes from whatever federal or state grants the city has running that year.",
    whoControlsIt:
      "The city sets its own ambulance fees, usually benchmarked to what other communities or Medicare charges. The school officer arrangement is a handshake agreement between the two governments. The grant reimbursements are whatever each grant's paperwork allows.",
    rates:
      "No single rate to point to - ambulance fees follow the Fire Department's own fee schedule, and the other two are set by agreement or grant terms rather than a published rate.",
    sourceLabel: null,
    sourceUrl: null,
  },

  "other-revenue-sources": {
    label: "Other Revenue Sources",
    whatItIs:
      "Money that moves around inside city government rather than coming from taxpayers directly: the water and sewer departments chipping in for shared costs, leftover money from the property tax abatement account, and money saved up from prior years that the city decides to spend.",
    whereItComesFrom:
      "The water and sewer bills you pay fund part of this (those departments reimburse the general city budget for shared costs like billing and IT). The rest comes from the city's own reserves - money set aside in case people successfully appeal their tax bill that turned out not to be needed, plus \"free cash,\" which is basically what's left over in the checking account after the prior year closed its books.",
    whoControlsIt:
      "The water/sewer cost-sharing is worked out by the city's own finance staff. The leftover tax-appeal money is released by the Board of Assessors once they're sure it's not needed. Free cash has to be certified by the state first, based on the city's year-end financial statements, before the City Council can vote to spend any of it.",
    rates:
      "Not fee- or tax-based - these are one-time transfers of money the city already has, not new charges on anyone. See [the state's page on free cash](https://www.mass.gov/info-details/free-cash) for how that certification process works.",
    sourceLabel: "MA Division of Local Services — Free Cash",
    sourceUrl: "https://www.mass.gov/info-details/free-cash",
  },
};
