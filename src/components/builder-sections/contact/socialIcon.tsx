import { SocialPlatform } from "@/types/contact.types";
import { Briefcase } from "lucide-react";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaDribbble,
  FaBehance,
} from "react-icons/fa";

export function socialIcon(platform: SocialPlatform) {
  // Common props for all icons
  const iconProps = {
    className: "h-4 w-4",
  };

  switch (platform) {
    case "github":
      return <FaGithub {...iconProps} />;
    case "twitter":
      return <FaTwitter {...iconProps} />;
    case "linkedin":
      return <FaLinkedin {...iconProps} />;
    case "instagram":
      return <FaInstagram {...iconProps} />;
    case "youtube":
      return <FaYoutube {...iconProps} />;
    case "dribbble":
      return <FaDribbble {...iconProps} />;
    case "behance":
      return <FaBehance {...iconProps} />;
    default:
      // Fallback using Lucide React (which doesn't have brand icons removed)
      return <Briefcase className="h-4 w-4" strokeWidth={1.5} />;
  }
}
