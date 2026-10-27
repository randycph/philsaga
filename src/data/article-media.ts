import { assetPath } from "../lib/assets";

export interface GalleryImage {
  image: string;
  alt: string;
  title: string;
  description: string;
  source: string;
}

export type ArticleMedia =
  | {
      type: "gallery";
      images: GalleryImage[];
    }
  | {
      type: "video";
      video: string;
      source: string;
    };

const veinArticle = (slug: string) => {
  return `https://www.philsaga.com/the-vein/trending-news?slug=${slug}`;
};

export const communityGallery: ArticleMedia = {
  type: "gallery",
  images: [
    {
      image: assetPath("assets/gallery-sdmp-poblacion.jpg"),
      alt: "Community members gather outside a newly completed building in Barangay Poblacion",
      title: "Community development in Poblacion",
      description:
        "A community facility featured in The Vein’s coverage of five SDMP projects turned over to Barangay Poblacion, Bunawan. The projects support local facilities and access to basic services.",
      source: veinArticle(
        "fostering-community-development-pmc-turns-over-five-sdmp-projects-to-barangay-poblacion",
      ),
    },
    {
      image: assetPath("assets/gallery-tesda-assessment.jpg"),
      alt: "Representatives hold assessment center accreditation certificates at Philsaga High School Foundation",
      title: "Recognition for skills and learning",
      description:
        "Representatives mark the turnover of TESDA assessment center accreditation certificates, as documented in The Vein’s education coverage.",
      source: veinArticle(
        "turn-over-of-assessment-center-tesda-accreditation-certificate",
      ),
    },
    {
      image: assetPath("assets/gallery-women-safety.jpg"),
      alt: "A presenter discusses risk assessment with women attending a community safety session",
      title: "Safety knowledge shared with women",
      description:
        "A safety session in Bayugan 3 brings practical risk assessment into a community setting. The photograph accompanies The Vein’s story on empowering women towards safety.",
      source: veinArticle("empowering-bayugan-3-women-towards-safety"),
    },
    {
      image: assetPath("assets/gallery-physical-fitness.jpg"),
      alt: "Participants practise sit-ups with partners during a physical fitness session in a covered court",
      title: "Preparedness through physical fitness",
      description:
        "Participants work together during a physical fitness session, featured in The Vein’s coverage of the continuous physical fitness program.",
      source: veinArticle(
        "continuous-physical-fitness-program-foundation-for-preparedness",
      ),
    },
  ],
};

export const solidarityFilm: ArticleMedia = {
  type: "video",
  video: "https://www.philsaga.com/videos/SOLIDARITY_MOVEMENT.mp4",
  source: "https://www.philsaga.com/video/solidarity-movement",
};

export const communityPhotoJournal: ArticleMedia = {
  type: "gallery",
  images: [
    {
      image: assetPath("assets/article-manobo.jpg"),
      alt: "Community representatives and Philsaga personnel at the Manobo Heritage Learning Center groundbreaking",
      title: "Celebrating Manobo heritage",
      description:
        "A groundbreaking ceremony marks the beginning of the Manobo Heritage Learning Center in Bunawan.",
      source:
        "https://www.philsaga.com/news/groundbreaking-ceremony-marks-the-new-era-for-manobo-heritage-preservation",
    },
    {
      image: assetPath("assets/article-health.jpg"),
      alt: "Barangay representatives receive medicines and medical equipment from MMPRC",
      title: "Supporting barangay health services",
      description:
        "Medicine and medical equipment support communities in Wasian and Libuac.",
      source:
        "https://www.philsaga.com/news/mmprc-strengthens-barangay-health-services-with-turnover-of-medicines-and-medical-apparatus",
    },
    {
      image: assetPath("assets/article-cooperative.jpg"),
      alt: "Members attend the PGECC Multipurpose Cooperative’s annual general assembly",
      title: "Growing together through cooperation",
      description:
        "The employee cooperative holds its fifth annual general assembly.",
      source:
        "https://www.philsaga.com/news/5th-annual-regular-general-assembly-of-pgecc-mpc",
    },
    {
      image: assetPath("assets/article-fire-drill.jpg"),
      alt: "Emergency responders practise a rescue during MMPRC’s fire drill",
      title: "Preparedness in action",
      description:
        "MMPRC employees practise emergency response through a fire drill and safety orientation.",
      source:
        "https://www.philsaga.com/news/mmprc-conducts-fire-drill-in-support-of-fire-safety-compliance",
    },
  ],
};
