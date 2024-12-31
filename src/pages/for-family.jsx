import React from "react";
// Images
import HeroImgBG from "@/assets/for-family/hero-img.png";
import pointsImg from "@/assets/for-family/points-img.png";
import processImg1 from "@/assets/process/process-img-1.png";
import processImg2 from "@/assets/process/process-img-2.png";
import processImg3 from "@/assets/process/process-img-3.png";
import ctaImgBG from "@/assets/for-family/cta-bg.png";
import ctaImg from "@/assets/for-family/cta-img.png";
import Icon1 from "@/assets/member-service/icons/icon-1.png";
import Icon2 from "@/assets/member-service/icons/icon-2.png";
import Icon3 from "@/assets/member-service/icons/icon-3.png";
import NeedImg from "@/assets/for-family/need-img.png";
import findImg1 from "@/assets/for-family/find-img-1.png";
import findImg2 from "@/assets/for-family/find-img-2.png";
import findImg3 from "@/assets/for-family/find-img-3.png";
// component
import Hero from "@/component/pages/hero";
import Points from "@/component/pages/points";
import Process from "@/component/pages/process";
import Cta from "@/component/pages/cta";
import MemberService from "@/component/pages/member-service";
import Find from "@/component/pages/find";
import Need from "@/component/pages/need";

const HeroData = {
  Img: HeroImgBG,
  title: (
    <>
      Reliable <span className="text-[#FF6F61] md:font-extrabold font-bold md:font-extrabold font-bold ">Babysitting</span>
      <br className="hidden lg:block" /> Services You Can Trust
    </>
  ),
  content: (
    <>
      Trust our reliable babysitters to keep your little ones{" "}
      <br className="hidden lg:block" /> safe and happy, whenever you need them.
    </>
  ),
};

const PointsData = {
  Img: pointsImg,
  title: (
    <>
      What over 1,500,000
      <br className="hidden xl:block" />{" "}
      <span className="text-[#FF6F61] md:font-extrabold font-bold md:font-extrabold font-bold md:font-extrabold font-bold">families and nannies love</span>
      <br className="hidden xl:block" /> about Top Nanny Sitter
    </>
  ),
  points: [
    {
      title: <>Explore at your own pace</>,
      content: (
        <>
          Whether you need a nanny now or later, you’re free
          <br className="hidden lg:block" /> to browse at your convenience.
        </>
      ),
      bg: "bg-[#FFB300]",
    },
    {
      title: <>Focus on your child’s development</>,
      content: (
        <>
          With a nanny or nanny share, be sure your child receives
          <br className="hidden xl:block" /> the attentive care they need.
        </>
      ),
      bg: "bg-[#512DA8]",
    },
    {
      title: <>Receive guidance at every step</>,
      content: (
        <>
          Discover helpful tips and articles to support you while you
          <br className="hidden xl:block" /> find and manage your nanny.
        </>
      ),
      bg: "bg-[#59B5FF]",
    },
  ],
};

const ProcessData = {
  title: (
    <>
      <span className="text-[#FF6F61] md:font-extrabold font-bold md:font-extrabold font-bold md:font-extrabold font-bold ">We’re here</span> for you at every{" "}
      <br className="hidden md:block" /> step of the process{" "}
    </>
  ),
};

const ProcessList = [
  {
    icon: processImg1,
    title: "Finding your nanny",
    para: "Create your profile and connect with nannies that fit your needs.",
  },
  {
    icon: processImg2,
    title: "Hiring your nanny",
    para: "Run a background check and finalize the details.",
  },
  {
    icon: processImg3,
    title: "Paying your nanny",
    para: "Ease the process of payments and taxes with our payroll service.",
  },
  {
    icon: processImg1,
    title: "Finding your nanny",
    para: "Create your profile and connect with nannies that fit your needs.",
  },
  {
    icon: processImg2,
    title: "Hiring your nanny",
    para: "Run a background check and finalize the details.",
  },
  {
    icon: processImg3,
    title: "Paying your nanny",
    para: "Ease the process of payments and taxes with our payroll service.",
  },
];

const MemberServiceData = {
  title: (
    <>
      Complete <span className="text-[#FF6F61] md:font-extrabold font-bold ">your nanny</span> search
      with <br className="hidden xl:block" /> these additional services
    </>
  ),
  content: (
    <>
      From browsing profiles to handling payments, we’ve got services you can
      access whenever you need them.
    </>
  ),
  title2: (
    <>
      Become a PLUS member to get access to these{" "}
      <br className="hidden xl:block" /> services for only $60/month!
    </>
  ),
};

const MemberServiceList = [
  {
    icon: Icon1,
    title: "Hiring Assistance ",
    para: "You’re not alone. Tell us your nanny needs; we’ll send you candidates to review and interview.",
  },
  {
    icon: Icon2,
    title: "Background Checks",
    para: "Know your child is in good hands. Run a background check and get quick results.",
  },
  {
    icon: Icon3,
    title: "Nanny Payroll Service",
    para: "We make it easy to pay your nanny. Use our payroll service to process payments, witholdings, and taxes.",
  },
  {
    icon: Icon1,
    title: "Explore at your own pace",
    para: "Whether you need a nanny now or later, you’re free to browse at your convenience.",
  },
  {
    icon: Icon2,
    title: "Explore at your own pace",
    para: "Whether you need a nanny now or later, you’re free to browse at your convenience.",
  },
  {
    icon: Icon3,
    title: "Explore at your own pace",
    para: "Whether you need a nanny now or later, you’re free to browse at your convenience.",
  },
];

const NeedData = {
  title: (
    <>
      Find a <span className="text-[#FF6F61] md:font-extrabold font-bold md:font-extrabold font-bold">nanny</span> that becomes part
      of your family
    </>
  ),
  content: (
    <>
      Riley has been watching our 4 children for over a year now. She is kind,
      caring, a lot of fun! Our children not only love Riley but ask to see her
      all the time! We are fortunate to have found her and she will be in our
      life for a long time to come!
    </>
  ),
  Img: NeedImg,
};

const CtaData = {
  bgImg: ctaImgBG,
  Img: ctaImg,
  title: (
    <>
      Share your nanny <br className="hidden md:block" /> with another family
    </>
  ),
  content: (
    <>
Enjoy attentive care and have playmates for your <br className="hidden lg:block" /> kids, all at a reasonable cost.
    </>
  ),
};

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

export default function ForFamily() {
  // export default function ForFamily(userDetails) {
  //   const user = userDetails.user;
  // 	const logout = () => {
  // 		window.open(`http://localhost:5000/auth/logout`, "_self");
  // 	};
  return (
    <>
    <div className="md:px-6 px-3 ">
      <Hero data={HeroData} />
      <Points data={PointsData} />
      <Process data={ProcessData} list={ProcessList} button={true}/>
    </div>
      <Cta data={CtaData}  nany={false} />
    <div className="md:px-6 px-3 md:mb-[80px] mb-[50px] ">

      <MemberService data={MemberServiceData} list={MemberServiceList} />
      <Need data={NeedData} />
      <Find data={FindData} />
    </div>

    </>

  );
}
