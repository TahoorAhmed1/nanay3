import React from "react";

import Hero from "@/component/services/hero";
import ProcessStep from "@/component/services/process-step";
import PointContent from "@/component/services/point-content";
import Contract from "@/component/services/contract";
import MemberShip from "@/component/services/member-ship";

import HeroImg from "@/assets/services/nanny-contract/hero-img.png";
import processStepBG from "@/assets/services/nanny-contract/processStepBG.png";
import pointImg1 from "@/assets/services/nanny-contract/point-content-left.png";
import pointImg2 from "@/assets/services/nanny-contract/point-content-right.png";
import ContractIcon1 from "@/assets/services/contract/contractImg1.png";
import ContractIcon2 from "@/assets/services/contract/contractImg2.png";
import MemberShipIcon1 from "@/assets/services/member-ship/member-ship-1.png";
import MemberShipIcon2 from "@/assets/services/member-ship/member-ship-2.png";
import MemberShipIcon3 from "@/assets/services/member-ship/member-ship-3.png";

const HeroData = {
  Img: HeroImg,
  title: <>Nanny contracts, made simple</>,
  content: <>Create your free nanny contract in less than 10 minutes</>,
  content2: (
    <>
      Nanny contracts are not yet available in your area. We’re working hard to
      bring these features to you soon. Check back for updates!
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
    title: "Get a nanny contract template",
    para: "Use the nanny contract template to add your contact info and a bit about your children.",
  },
  {
    // icon: processImg2,
    title: "Add nanny agreement details",
    para: "Add the details from the start date to time-off to your nanny contract template.",
  },
  {
    // icon: processImg3,
    title: "Save your nanny contract",
    para: "ave your free nanny contract template and hit print.",
  },
];

const PointData = {
  ImgLeft: pointImg1,
  title: <>Make your nanny contract with a template</>,
  desc: [
    "Start date & location",
    "Payment information",
    "Time-off & holidays (optional)",
    "Schedule & responsibilities (optional)",
    "Meals & accommodations (for live-in nannies)",
  ],
};

const contractData = {
  bg: true,
  title: "Why parents love our nanny contracts",
};

const contractList = [
  {
    img1: ContractIcon1,
    img2: ContractIcon2,
    title: "Use the nanny contract template",
    description: "Answer easy questions to help build your nanny contract.",
  },
  {
    img1: ContractIcon1,
    img2: ContractIcon2,
    title: "Preview your nanny contract",
    description:
      "Whenever you’re ready, you can always preview your nanny contract.",
  },
  {
    img1: ContractIcon1,
    img2: ContractIcon2,
    title: "Add to your nanny contract",
    description: (
      <>
        Whether you have a full-time, part-time, or live-in, use your <br />
        nanny contract template as a guide.
      </>
    ),
  },
  {
    img1: ContractIcon1,
    img2: ContractIcon2,
    title: "Make it official with a contract",
    description:
      "Save your nanny contract & share your contract with your nanny.",
  },
];

const PointData2 = {
  ImgRight: pointImg2,
  title: <>Why should you use a nanny contract?</>,
  desc: [
    {
      title: "Build a foundation together",
      desc: (
        <>
          Make sure you & your nanny are on the same page with a nanny
          agreement.
        </>
      ),
    },
    {
      title: "Balance the personal and professional",
      desc: (
        <>
          Keep the parent-nanny relationship simple by setting boundaries with a
          nanny contract.
        </>
      ),
    },
    {
      title: "Create peace of mind",
      desc: <>Enjoy the comfort of no surprises with a nanny agreement.</>,
    },
  ],
};

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
    title: "Hiring Assistance",
    para: "You’re not alone. Tell us your nanny needs; we’ll send you candidates to review and interview.",
  },
  {
    icon: MemberShipIcon2,
    title: "Background Checks",
    para: "Know your child is in good hands. Run a background check and get quick results.",
  },
  {
    icon: MemberShipIcon3,
    title: "Nanny Payroll Service",
    para: "We make it easy to pay your nanny. Use our payroll service to process payments, witholdings, and taxes.",
  },
  {
    icon: MemberShipIcon1,
    title: "Hiring Assistance",
    para: "You’re not alone. Tell us your nanny needs; we’ll send you candidates to review and interview.",
  },
  {
    icon: MemberShipIcon2,
    title: "Background Checks",
    para: "Know your child is in good hands. Run a background check and get quick results.",
  },
  {
    icon: MemberShipIcon3,
    title: "Nanny Payroll Service",
    para: "We make it easy to pay your nanny. Use our payroll service to process payments, witholdings, and taxes.",
  },
];

export default function NannyContracts() {
  return (
    <div className="md:px-6 px-3 flex flex-col md:gap-y-[100px] gap-y-[80px] md:py-[60px] py-[40px]">
      <Hero data={HeroData} />
      <ProcessStep data={ProcessStepData} list={ProcessStepList} />
      <PointContent data={PointData} />
      <Contract data={contractData} list={contractList} />
      <PointContent data={PointData2} />
      <MemberShip data={MemberShipData} list={MemberShipList} />
    </div>
  );
}
