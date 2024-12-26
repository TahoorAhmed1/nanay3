import React from "react";
import Hero from "@/component/services/hero";
import ProcessStep from "@/component/services/process-step";
import PointContent from "@/component/services/point-content";
import TwoWay from "@/component/services/two-way";
import MemberShip from "@/component/services/member-ship";
import Faq from "@/component/services/faq";
import findImg1 from "@/assets/for-nannies/find-img-1.png";
import findImg2 from "@/assets/for-nannies/find-img-2.png";
import findImg3 from "@/assets/for-nannies/find-img-3.png";

import HeroImg from "@/assets/services/nanny-background-check/hero-img.png";
import processStepBG from "@/assets/services/nanny-payroll/processStepBG.png";
import pointImg1 from "@/assets/services/nanny-background-check/point-content-left.png";
import pointImg2 from "@/assets/services/nanny-background-check/point-content-right.png";
import TwoWayImg1 from "@/assets/services/nanny-payroll/two-way-1.png";
import TwoWayImg2 from "@/assets/services/nanny-payroll/two-way-2.png";
import MemberShipIcon1 from "@/assets/services/member-ship/member-ship-1.png";
import MemberShipIcon2 from "@/assets/services/member-ship/member-ship-2.png";
import MemberShipIcon3 from "@/assets/services/member-ship/member-ship-3.png";
import Find from "@/component/pages/find";

const HeroData = {
  Img: HeroImg,
  title: <>Nanny Background Check Service</>,
  content: (
    <>
      Childcare is a serious business. Ensure your kids are in good hands with
      our nanny background check service.
    </>
  ),
  content2: (
    <>
      Background checks are not yet available in your area. We’re working hard
      to bring these features to you soon. Check back for updates!
    </>
  ),
};

const ProcessStepData = {
  img: processStepBG,
  title: <>How background checks work on Top Nanny Sitter</>,
};

const ProcessStepList = [
  {
    // icon: processImg1,
    title: "Request a background check",
    para: "Once you’ve made an offer, you can request a background check on your nanny. They’ll get notified via email.",
  },
  {
    // icon: processImg2,
    title: "Nanny provides their detailse",
    para: "Your nanny will provide us their details, so that we can process the background check.",
  },
  {
    // icon: processImg3,
    title: "Get results",
    para: "Most of our background checks are completed within a day of the nanny providing their information.",
  },
];

const PointData = {
  ImgLeft: pointImg1,
  title: <>Keep your family safe with many different screenings</>,
  desc: [
    "Sex offender database",
    "Global watchlist",
    "National criminal database",
    "Statewide criminal database",
    "County criminal database",
  ],
};

const TwoWayData = {
  title: (
    <>
      The two ways to run a nanny
      <br /> background check
    </>
  ),
};
const TwoWayList = [
  {
    img: TwoWayImg1,
    title: "Run a background check",
    description:
      "Your nanny provides their information and you’ll get the results once the background check is complete.",
  },
  {
    img: TwoWayImg2,
    title: "Finalize hiring your nanny with PLUS",
    description:
      "From background checks to handling payments and taxes, we’re here at every step of the way",
  },
];

const MemberShipData = {
  title: <>PLUS Membership</>,
  content: (
    <>
      From background checks to handling payments, we’ve got services you can
      access whenever you need them.
    </>
  ),
};

const MemberShipList = [
  {
    icon: MemberShipIcon1,
    title: "Background Checks",
    para: "Know your child is in good hands. Run a background check and get quick results.",
  },
  {
    icon: MemberShipIcon2,
    title: "Nanny Contracts",
    para: "Customize our nanny contracts to your needs. Ensure everyone is on the same page.",
  },
  {
    icon: MemberShipIcon3,
    title: "Nanny Payroll Service",
    para: "We make it easy to pay your nanny. Use our payroll service to process payments, witholdings, and taxes.",
  },
  {
    icon: MemberShipIcon1,
    title: "Background Checks",
    para: "Know your child is in good hands. Run a background check and get quick results.",
  },
  {
    icon: MemberShipIcon2,
    title: "Nanny Contracts",
    para: "Customize our nanny contracts to your needs. Ensure everyone is on the same page.",
  },
  {
    icon: MemberShipIcon3,
    title: "Nanny Payroll Service",
    para: "We make it easy to pay your nanny. Use our payroll service to process payments, witholdings, and taxes.",
  },
];

const PointData2 = {
  ImgRight: pointImg2,
  title: <>What thousands of parents love about our nanny background checks</>,
  desc: [
    {
      title: "Focus on your family’s safety",
      desc: (
        <>
          Be sure your family receives the care they need by someone you can
          trust.
        </>
      ),
    },
    {
      title: "Quick turn-around time",
      desc: <>Most background checks are completed within 15 minutes.</>,
    },
    {
      title: "Peace of mind",
      desc: (
        <>
          Enjoy the peace of mind in your decision to hire a nanny for a small
          cost.
        </>
      ),
    },
  ],
};

const FaqContent = {
  title: <>Frequently asked questions about <br/> background checks</>,
};

const FaqList = [
  {
    id: 1,
    question: "Are background checks offered in all states?",
    answer: "Yes, we offer background checks for all states!",
  },
  {
    id: 2,
    question: "How long does it take to get results?",
    answer: "Yes, we offer background checks for all states!",
  },
  {
    id: 3,
    question: "What is included in our background check?",
    answer: "Yes, we offer background checks for all states!",
  },
  {
    id: 4,
    question: "How will I be updated on the status of the background check?",
    answer: "Yes, we offer background checks for all states!",
  },
  {
    id: 5,
    question: "What if the nanny doesn’t fill in their info?",
    answer: "Yes, we offer background checks for all states!",
  },
  {
    id: 6,
    question: "How do I get access to the report?",
    answer: "Yes, we offer background checks for all states!",
  },
];

const FindData = {
  title: (
    <>
      Tips on how to find a <span className="text-[#FF6F61] md:font-extrabold font-bold">nanny</span>
    </>
  ),
  icon1: findImg1,
  text1: "Nanny Background Checks: What You Need to Know",
  icon2: findImg2,
  text2: "What Are Typical Nanny Benefits And Why Should You Offer Them",
  icon3: findImg3,
  text3: "Why You Need A Nanny Contract",
};

export default function NannyBackgroundCheck() {
  return (
    <div className="md:px-6 px-3 flex flex-col md:gap-y-[100px] gap-y-[80px] md:py-[60px] py-[40px]">
      <Hero data={HeroData} />
      <ProcessStep data={ProcessStepData} list={ProcessStepList} />
      <PointContent data={PointData} />
      <TwoWay data={TwoWayData} list={TwoWayList} />
      <MemberShip data={MemberShipData} list={MemberShipList} />
      <PointContent data={PointData2} />
      <Faq data={FaqContent} list={FaqList} />
      <Find data={FindData} />
    </div>
  );
}
