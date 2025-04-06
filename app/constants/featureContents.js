import FeatureImage1 from "@/assets/images/features-1.svg";
import FeatureImage2 from "@/assets/images/features-2.svg";
import FeatureImage3 from "@/assets/images/features-3.svg";

const featureContents = [
  {
    id: 1,
    SvgComponent: FeatureImage1,
    description:
      "Easily track your job applications in one place. Stay updated on your progress.",
    isChosen: true,
  },
  {
    id: 2,
    SvgComponent: FeatureImage2,
    description:
      "Receive timely updates and reminders about your job applications.",
    isChosen: false,
  },
  {
    id: 3,
    SvgComponent: FeatureImage3,
    description:
      "See analytics and insights to better visualize your job search progress. ",
    isChosen: false,
  },
];

export default featureContents;
