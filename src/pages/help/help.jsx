import React from "react";
import Hero from "@/component/help/hero";
import RecentActivity from "@/component/help/recent-activity";

const FaqContent = {
  title: <>Recently activity</>,
};

const FaqList = [
  {
    id: 1,
    question: "How can I reset my password?",
    answer: "To reset your password, go to the 'Forgot Password' section...",
  },
  {
    id: 2,
    question: "How do I update my billing information?",
    answer: "To update your billing information, go to Account Settings...",
  },
  {
    id: 3,
    question: "How can I contact customer support?",
    answer:
      "You can contact customer support by submitting a support request...",
  },
  {
    id: 4,
    question: "How do I delete my account?",
    answer:
      "To delete your account, navigate to Account Settings and click 'Delete'.",
  },
];

export default function Help() {
  return (
    <>
      <Hero />
      <RecentActivity data={FaqContent} list={FaqList} />
    </>
  );
}
