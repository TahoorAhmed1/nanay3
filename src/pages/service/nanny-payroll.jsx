import React from "react";
// Images
import LegallyImg1 from "@/assets/services/legally/legally-img-1.png";
import LegallyImg2 from "@/assets/services/legally/legally-img-2.png";
import LegallyImg3 from "@/assets/services/legally/legally-img-3.png";
import ctaImgBG from "@/assets/services/cta-image/cta-bg.png";
import ctaImg from "@/assets/services/cta-image/cta-img.png";
import HeroImg from "@/assets/services/nanny-payroll/hero-img.png";
import findImg1 from "@/assets/for-nannies/find-img-1.png";
import findImg2 from "@/assets/for-nannies/find-img-2.png";
import findImg3 from "@/assets/for-nannies/find-img-3.png";
import questionImg1 from "@/assets/services/question/question-1-white.png";
import questionImg2 from "@/assets/services/question/question-1-black.png";

import Hero from "@/component/services/hero";
import Cta from "@/component/pages/cta";
import Legally from "@/component/services/legally";
import Question from "@/component/services/question";
import Payroll from "@/component/services/payroll";
import Find from "@/component/pages/find";
import Comparison from "@/component/services/comparison";

const HeroData = {
  Img: HeroImg,
  title: <>Nanny Payroll Service</>,
  content: (
    <>We make payroll processing, withholdings and nanny tax filing easy</>
  ),
  content2: (
    <>
      Payroll services are not yet available in your area. We’re working hard to
      bring these features to you soon. Check back for updates!
    </>
  ),
};

const CtaData = {
  bgImg: ctaImgBG,
  Img: ctaImg,
  title: (
    <>
      Nanny payroll services <br className="hidden md:block" /> for multiple
      families
    </>
  ),
  content: (
    <>
      Payroll is complicated, especially when two families{" "}
      <br className="hidden lg:block" /> are involved. We handle payroll for
      nanny share
      <br className="hidden lg:block" /> families.
    </>
  ),
  linkContent: <>Learn more about nanny share payroll</>,
};

const LegallyContent = {
  title: "Why pay legally",
};

const LegallyList = [
  {
    ImgLeft: LegallyImg1,
    title: "Equal opportunities",
    desc: "Help your nanny establish an employment history, so they can receive Social Security income, Medicare, and unemployment benefits. It also enables them to qualify for loans for a car, a mortgage, or school. Empower them to create a life they love.",
  },
  {
    ImgRight: LegallyImg2,
    title: "Protect your family & nanny",
    desc: "Avoid risking the penalties of IRS audits, and labor law violations. Take care of the person caring for your children, and do the right thing.",
  },
  {
    ImgLeft: LegallyImg3,
    title: "Tax breaks",
    desc: "Nanny taxes won’t cost you nearly as much as you think. Child care tax breaks can save you around $2,000 per year, offsetting most of your tax liability.",
  },
];

const QuestionData = {
  title: <>Questions from parents</>,
};

const QuestionList = [
  {
    icon1: questionImg1,
    icon2: questionImg2,
    title: (
      <>
        What is the cost of Top <br className="hidden md:block" /> Nanny Sitter
        Payroll?
      </>
    ),
    para: "$60/month for your first household employee! Additional employees can be added to your nanny payroll for $25 per month.",
  },
  {
    icon1: questionImg1,
    icon2: questionImg2,
    title: (
      <>
        What is the cost of Top <br className="hidden md:block" /> Nanny Sitter
        Payroll?
      </>
    ),
    para: "About 1-2 weeks. As a part of your registration, we require you and your nanny to complete a few tax forms before running the first payroll.",
  },
  {
    icon1: questionImg1,
    icon2: questionImg2,
    title: (
      <>
        Is Top Nanny Sitter Payroll <br className="hidden md:block" /> offered
        in all states?
      </>
    ),
    para: "Yes, we offer services in all states! If you have state-specific questions,please don’t hesitate to contact us.",
  },
  {
    icon1: questionImg1,
    icon2: questionImg2,
    title: (
      <>
        What is the cost of Top <br className="hidden md:block" /> Nanny Sitter
        Payroll?
      </>
    ),
    para: "$60/month for your first household employee! Additional employees can be added to your nanny payroll for $25 per month.",
  },
  {
    icon1: questionImg1,
    icon2: questionImg2,
    title: (
      <>
        What is the cost of Top <br className="hidden md:block" /> Nanny Sitter
        Payroll?
      </>
    ),
    para: "About 1-2 weeks. As a part of your registration, we require you and your nanny to complete a few tax forms before running the first payroll.",
  },
  {
    icon1: questionImg1,
    icon2: questionImg2,
    title: (
      <>
        Is Top Nanny Sitter Payroll <br className="hidden md:block" /> offered
        in all states?
      </>
    ),
    para: "Yes, we offer services in all states! If you have state-specific questions,please don’t hesitate to contact us.",
  },
];

const FindData = {
  title: (
    <>
      Tips on how to find a <span className="text-[#FF6F61] md:font-extrabold font-bold">nanny</span>
    </>
  ),
  icon1: findImg1,
  text1: "Starting your search",
  content1: "Finding A Summer Nanny",
  icon2: findImg2,
  text2: "Identifying your needs",
  content2: (
    <>
      What is Top Nanny Sitter and
      <br /> How Does it Work?
    </>
  ),
  icon3: findImg3,
  text3: "Identifying your needs",
  content3: (
    <>
      How does the number of kids
      <br /> influence nanny costs?
    </>
  ),
};

export default function NannyPayroll() {
  return (
    <div className="md:py-[60px] py-[40px] w-full flex flex-col md:gap-y-[100px] gap-y-[80px]  ">
    <div className="md:px-6 px-3 flex flex-col md:gap-y-[100px] gap-y-[80px] ">
      <Hero data={HeroData} />
      <Payroll />
    </div>
      <Cta data={CtaData} />
    <div className="md:px-6 px-3 flex flex-col md:gap-y-[100px] gap-y-[80px] ">

      <Legally data={LegallyContent} list={LegallyList} />

      </div>
      <Question data={QuestionData} list={QuestionList} />
      <div className="md:px-6 px-3 flex flex-col md:gap-y-[100px] gap-y-[80px] ">


      <Comparison />
      <Find data={FindData} />
      </div>

    </div>
      
  );
}
