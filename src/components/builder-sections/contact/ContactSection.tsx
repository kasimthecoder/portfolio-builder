import { ContactProps } from "@/types/contact.types";
import ContactSection from "./varients/editorial";
import BoldContact from "./varients/bold";
import MinimalContact from "./varients/minimal";
import WarmContact from "./varients/warm";

const ContactSectionRender = (props: ContactProps) => {
  return (
    <div className="overflow-hidden max-w-screen">
      {props.theme === "editorial" ? <ContactSection {...props} /> : ""}
      {props.theme === "bold" ? <BoldContact {...props} /> : ""}
      {props.theme === "minimal" ? <MinimalContact {...props} /> : ""}
      {props.theme === "warm" ? <WarmContact {...props} /> : ""}
    </div>
  );
};

export default ContactSectionRender;
