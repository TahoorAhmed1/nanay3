import React from "react";
// Images
import HeroImgBG from "@/assets/nanny-share/hero-img.png";
import TwoWayImg1 from "@/assets/nanny-share/two-way-1.png";
import TwoWayImg2 from "@/assets/nanny-share/two-way-2.png";
import processStepBG from "@/assets/nanny-share/processStepBG.png";
import ContractIcon1 from "@/assets/services/contract/contractImg1.png";
import ContractIcon2 from "@/assets/services/contract/contractImg2.png";
import ctaImgBG from "@/assets/nanny-share/cta-bg.png";
import ctaImg from "@/assets/nanny-share/cta-img.png";
import findImg1 from "@/assets/nanny-share/find-img-1.png";
import findImg2 from "@/assets/nanny-share/find-img-2.png";
import findImg3 from "@/assets/nanny-share/find-img-3.png";

// component
import Hero from "@/component/pages/hero";
import TwoWay from "@/component/services/two-way";
import ProcessStep from "@/component/services/process-step";
import Contract from "@/component/services/contract";
import Cta from "@/component/pages/cta";
import Find from "@/component/pages/find";

export default function NannyShare() {
  const HeroData = {
    Img: HeroImgBG,
    title: (
      <>
        Share your nanny <br className="hidden lg:block" /> with another family
      </>
    ),
    content: (
      <>
        Split the cost of a nanny and enjoy flexible child{" "}
        <br className="hidden lg:block" /> care with a nanny share.
      </>
    ),
  };

  const TwoWayData = {
    title: (
      <>
        The most common ways to
        <br /> set up your nanny share
      </>
    ),
  };
  const TwoWayList = [
    {
      img: TwoWayImg1,
      title: "Your nanny watches both families’ kids together",
      description:
        "You can have a nanny that watches both kids together at one of your homes.",
    },
    {
      img: TwoWayImg2,
      title: "Your nanny splits time between two families",
      description:
        "You can split your nanny’s hours with another family to fit around your schedule.",
    },
  ];

  const ProcessStepData = {
    widthFull: true,
    img: processStepBG,
    title: (
      <>
        <span className="text-[#FF6F61] md:font-extrabold font-bold md:font-extrabold font-bold ">We’re here</span> for you at every{" "}
        <br className="hidden md:block" /> step of the process{" "}
      </>
    ),
  };

  const ProcessStepList = [
    {
      // icon: processImg1,
      title: "Explore at your own pace",
      para: "Whether you need a nanny now or later, you’re free to browse at your convenience.",
    },
    {
      // icon: processImg2,
      title: "Explore at your own pace",
      para: "Whether you need a nanny now or later, you’re free to browse at your convenience.",
    },
    {
      // icon: processImg3,
      title: "Explore at your own pace",
      para: "Whether you need a nanny now or later, you’re free to browse at your convenience.",
    },
  ];

  const contractData = {
    title: (
      <>
        Why a nanny share is the
        <br /> right choice for your family
      </>
    ),
  };

  const contractList = [
    {
      img1: ContractIcon2,
      img2: ContractIcon1,
      title: "Use the nanny contract template",
      description: "Answer easy questions to help build your nanny contract.",
    },
    {
      img1: ContractIcon2,
      img2: ContractIcon1,
      title: "Use the nanny contract template",
      description: "Answer easy questions to help build your nanny contract.",
    },
    {
      img1: ContractIcon2,
      img2: ContractIcon1,
      title: "Use the nanny contract template",
      description: "Answer easy questions to help build your nanny contract.",
    },
    {
      img1: ContractIcon2,
      img2: ContractIcon1,
      title: "Use the nanny contract template",
      description: "Answer easy questions to help build your nanny contract.",
    },
  ];

  const CtaData = {
    bgImg: ctaImgBG,
    Img: ctaImg,
    title: (
      <>
        Make more time for <br className="hidden md:block" />
        what matters with our
        <br className="hidden md:block" /> payroll service{" "}
      </>
    ),
    content: (
      <>
        Send us your shared and individual hours, the negotiated{" "}
        <br className="hidden lg:block" />
        rates, and we’ll take care of all your payroll needs.
      </>
    ),
  };

  const FindData = {
    title: (
      <>
        Tips on how to manage your{" "}
        <span className="text-[#FF6F61] md:font-extrabold font-bold ">nanny</span>
      </>
    ),
    icon1: findImg1,
    text1: "Starting your search",
    content1: "Find Your Perfect Nanny Job With Top Nanny Sitter",
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

  return (
    <>
    <div className="md:px-6 px-3  ">
      <Hero data={HeroData} />
      <div className="flex flex-col md:gap-y-[100px] gap-y-[80px] md:pb-[60px] pb-[40px]  ">

      <TwoWay data={TwoWayData} list={TwoWayList} />
      <ProcessStep data={ProcessStepData} list={ProcessStepList} />
      </div>
      </div>
      <div className="flex flex-col md:gap-y-[90px] gap-y-[70px] ">

      <Contract data={contractData} list={contractList} />
      <Cta data={CtaData} /> 
      </div>
      <div className="md:px-6 px-3 flex flex-col md:gap-y-[100px] gap-y-[80px] md:py-[60px] py-[40px]">
      <Find data={FindData} />
      </div>
      
    </>
  );
}
