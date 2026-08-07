/**
 * Which mayor's own budget each fiscal year's Mayor's Budget represents.
 * Read directly off each year's own budget book - every FY2016-FY2026 PDF
 * opens with a cover page and a signed budget message naming the sitting
 * mayor, so this isn't inferred from election dates, it's transcribed from
 * the same documents the rest of the site already cites. Extend this map
 * (and nothing else) the first time a future fiscal year's budget carries a
 * new mayor's name.
 */
export const mayorByFiscalYear = {
  2016: "Lisa A. Wong",
  2017: "Stephen L. DiNatale",
  2018: "Stephen L. DiNatale",
  2019: "Stephen L. DiNatale",
  2020: "Stephen L. DiNatale",
  2021: "Stephen L. DiNatale",
  2022: "Stephen L. DiNatale",
  2023: "Stephen L. DiNatale",
  2024: "Stephen L. DiNatale",
  2025: "Samantha M. Squailia",
  2026: "Samantha M. Squailia",
};

export const mayoralSource = {
  label: "Each fiscal year's own Mayor's Budget cover page and budget message",
  url: "https://www.fitchburgma.gov/717/Mayors-Throughout-History",
};
