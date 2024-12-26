import React from "react";
import { H1, H6, Font1 } from "@/config/typography";
import InputField from "@/component/common/input";
import TextArea from "@/component/common/textarea";
import FileUpload from "@/component/common/upload";

export default function Request() {
  return (
    <>
      <div className="py-[30px] md:py-[50px] ">
        <div className="container mx-auto p-6">
          <H1 className="font-creato mb-4 capitalize">submit request</H1>
          <div className="w-12/12 md:w-9/12 lg:w-7/12">
            <div className="py-2">
              <InputField
                type="text"
                label="Your email address"
                // value={model[question.key] || ''}
                // onChange={(e) => fillModel(question.key, e.target.value)}
                className=""
              />
            </div>
            <div className="py-2">
              <InputField
                type="text"
                label="submit"
                // value={model[question.key] || ''}
                // onChange={(e) => fillModel(question.key, e.target.value)}
                className=""
              />
            </div>
            <div className="py-2">
              <TextArea
                type="text"
                label="description"
                // value={model[question.key] || ''}
                // onChange={(e) => fillModel(question.key, e.target.value)}
                minlength={40}
                className=""
              />
            </div>
            <div className="py-2">
              <InputField
                type="text"
                label="country"
                // value={model[question.key] || ''}
                // onChange={(e) => fillModel(question.key, e.target.value)}
                className=""
              />
            </div>
            <div className="py-1">
              <FileUpload
              // type="text"
              // label="country"
              // value=
              // onChange={(e) => fillModel(question.key, e.target.value)}
              // className=""
              />
            </div>
            <div className="py-2">
              <button className="px-16 py-3 border-none text-white rounded-[25px] me-2 flex bg-[#ff6f61]">
                <a>Submint</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
