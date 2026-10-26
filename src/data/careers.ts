export interface CareerJob {
  id: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  summary: string;
}

export const careersSource = "https://www.philsaga.com/careers";

// Editorial summaries of the roles listed on the official careers page.
export const careerJobs: CareerJob[] = [
  {
    id: "cadet-mechanical-engineer",
    title: "Cadet Mechanical Engineer",
    department: "Engineering",
    location: "Bunawan, Agusan del Sur",
    experience: "No experience required",
    summary:
      "Mechanical engineering license required; an opportunity for new engineers.",
  },
  {
    id: "dentist",
    title: "Dentist",
    department: "Health Services",
    location: "Not specified",
    experience: "Experience preferred",
    summary: "Seeking a licensed dentist; previous experience is preferred.",
  },
  {
    id: "dewatering-crew",
    title: "Dewatering Crew",
    department: "Operations",
    location: "Bunawan, Agusan del Sur",
    experience: "No experience required",
    summary:
      "Underground work for high school graduates with relevant technical certification.",
  },
  {
    id: "driver",
    title: "Driver",
    department: "Operations",
    location: "Not specified",
    experience: "Not specified",
    summary:
      "Visit the official listing for role requirements and application details.",
  },
  {
    id: "geologist",
    title: "Geologist — Special Projects and Research",
    department: "Geology",
    location: "Not specified",
    experience: "Experience required",
    summary:
      "Geology qualification, safety training, and mining safety experience required.",
  },
  {
    id: "locomotive-maintenance",
    title: "Locomotive Maintenance",
    department: "Maintenance",
    location: "Bunawan, Agusan del Sur",
    experience: "No experience required",
    summary:
      "Relevant electrical certification and willingness to work underground required.",
  },
  {
    id: "mechanic",
    title: "Mechanic",
    department: "Maintenance",
    location: "Bunawan, Agusan del Sur",
    experience: "No experience required",
    summary:
      "Automotive or welding certification; underground assignment in Upper Coo.",
  },
  {
    id: "nurse",
    title: "Nurse",
    department: "Health Services",
    location: "Rosario, Agusan del Sur",
    experience: "Not specified",
    summary:
      "Registered nurse with a nursing degree for assignment in Rosario.",
  },
  {
    id: "project-management-engineer",
    title: "Project Management Engineer",
    department: "Engineering",
    location: "Rosario, Agusan del Sur",
    experience: "Experience required",
    summary:
      "Civil engineering background with construction or project management experience.",
  },
  {
    id: "qa-qc-technician",
    title: "QA/QC Technician",
    department: "Laboratory",
    location: "Rosario, Agusan del Sur",
    experience: "Experience required",
    summary:
      "Chemical technician license and relevant laboratory experience required.",
  },
  {
    id: "safety-engineer",
    title: "Safety Engineer",
    department: "Health & Safety",
    location: "Not specified",
    experience: "Not specified",
    summary:
      "Mining engineering qualification and occupational safety training required.",
  },
];

export interface CareerFilters {
  query: string;
  department: string;
  location: string;
  experience: string;
}

export const emptyCareerFilters: CareerFilters = {
  query: "",
  department: "",
  location: "",
  experience: "",
};

export function filterCareerJobs(filters: CareerFilters) {
  const query = filters.query.trim().toLocaleLowerCase();

  return careerJobs.filter((job) => {
    const searchableText =
      `${job.title} ${job.department} ${job.location} ${job.summary}`.toLocaleLowerCase();

    return (
      (!query || searchableText.includes(query)) &&
      (!filters.department || job.department === filters.department) &&
      (!filters.location || job.location === filters.location) &&
      (!filters.experience || job.experience === filters.experience)
    );
  });
}
