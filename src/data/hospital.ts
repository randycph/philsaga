import groups from "./hospital-rates.json";

export type HospitalDepartment = "xray" | "laboratory";

export const hospitalInfo = {
  name: "Philsaga Mining Hospital",
  location: "Barangay Consuelo, Bunawan, Agusan del Sur",
  source: "https://www.philsaga.com/hospital",
  checkedOn: "October 26, 2026",
};

export const hospitalRateGroups = groups;

export function hospitalCategories(department: HospitalDepartment) {
  return groups.filter((group) => group.type === department);
}

export function filterHospitalRates(
  department: HospitalDepartment,
  category: string,
  search: string,
) {
  const query = search.trim().toLocaleLowerCase();

  return hospitalCategories(department)
    .filter((group) => !category || group.id === category)
    .flatMap((group) =>
      group.procedures.map((procedure) => ({
        ...procedure,
        category: group.category,
      })),
    )
    .filter(
      (procedure) =>
        !query ||
        `${procedure.name} ${procedure.category}`
          .toLocaleLowerCase()
          .includes(query),
    );
}

export function formatHospitalRate(price: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(price);
}
