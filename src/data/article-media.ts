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
