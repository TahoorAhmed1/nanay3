import React from "react";
import HeroImg from "@/assets/services/nanny-plus-membership/hero-img.png";
import LegallyImg1 from "@/assets/services/nanny-plus-membership/legally-img-1.png";
import LegallyImg2 from "@/assets/services/nanny-plus-membership/legally-img-2.png";
import LegallyImg3 from "@/assets/services/nanny-plus-membership/legally-img-3.png";

import Hero from "@/component/services/hero";
import Legally from "@/component/services/legally";

const HeroData = {
  Img: HeroImg,
  title: <>PLUS Membership</>,
  content: (
    <>
      PLUS membership gives you access to premium features like hiring
      assistance, a featured profile, candidate tracking, background checks, and
      a nanny payroll service!
    </>
  ),
  content2: (
    <>
      PLUS is not yet available in your area. We’re working hard to bring these
      features to you soon. Check back for updates!
    </>
  ),
};

const LegallyList = [
  {
    ImgLeft2: LegallyImg1,
    title: "Hiring assistance",
    desc: "Tell an assistant your nanny needs so they can find candidates for you, while guiding you through the hiring process.",
  },
  {
    ImgRight2: LegallyImg2,
    title: "Background checks",
    desc: "With PLUS, background checks are free. When you’re ready to hire, run a background check on the candidate to make sure your kids are in good hands.",
    linkContent: "Learn more about background checks",
  },
  {
    ImgLeft2: LegallyImg3,
    title: "Full service nanny payroll",
    desc: "Our nanny payroll service is included in our PLUS membership. We make payroll processing, withholdings and nanny tax filing easy.",
    linkContent: "Learn more about payroll",
  },
];

export default function NannyPlusmember() {
  return (
    <div className="md:px-6 px-3 flex flex-col md:gap-y-[100px] gap-y-[80px] md:py-[60px] py-[40px]">

      <Hero data={HeroData} />
      <Legally list={LegallyList} />
    </div>
  );
}
