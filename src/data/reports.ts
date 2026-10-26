import { assetPath } from "../lib/assets";

export interface AnnualReport {
  year: number;
  title: string;
  available: boolean;
  pdf: string | null;
  source: string;
  image: string;
  imageAlt: string;
}

export const reportsSource = "https://www.philsaga.com/annual-reports";

// The official archive lists 2009–2025; 2022–2025 PDF URLs returned 404 on 26 October 2026.
export const annualReports: AnnualReport[] = Array.from(
  { length: 17 },
  (_, index) => {
    const year = 2025 - index;
    const images = [
      "approach-planting.png",
      "approach-lake.png",
      "approach-mountains.png",
    ];
    const image = images[index % images.length];
    const available = year <= 2021;

    return {
      year,
      title: "SDMP Annual Accomplishment Report",
      available,
      pdf: available ? assetPath(`reports/sdmp-${year}.pdf`) : null,
      source: `https://www.philsaga.com/files/annual-reports/${year}/${year}.pdf`,
      image: assetPath(`assets/${image}`),
      imageAlt:
        "Editorial imagery of environmental stewardship and the landscapes around our communities",
    };
  },
);

export const featuredReport = annualReports[0];

export function filterAnnualReports(
  year: string,
  query: string,
  availableOnly: boolean,
) {
  const search = query.trim().toLocaleLowerCase();

  return annualReports.filter((report) => {
    return (
      report.year !== featuredReport.year &&
      (!year || String(report.year) === year) &&
      (!search ||
        `${report.year} ${report.title}`
          .toLocaleLowerCase()
          .includes(search)) &&
      (!availableOnly || report.available)
    );
  });
}
