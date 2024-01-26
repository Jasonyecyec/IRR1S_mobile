import React from "react";
import PageTitle from "@/src/components/PageTitle";
import "../../index.css";

const RateReportPage = () => {
  return (
    <div className="h-screen w-screen background">
      <PageTitle title="RATE & REVIEW" />

      <div className=" p-5 pt-12">
        <div className="bg-white rounded-md p-3 space-y-5 shadow-md">
          <div>
            <p>asdasdsad</p>
            <p>asdasdsad</p>
            <p>asdasdsad</p>

            <div className="flex justify-center space-x-5">
              <div>
                <p>Before</p>
                <img
                  alt="img-before"
                  className="w-16 h-16 bg-gray-200 rounded-md"
                />
              </div>

              <div>
                <p>After</p>
                <img
                  alt="img-after"
                  className="w-16 h-16 bg-gray-200 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-gray-50 p-2">
              <p>Issue fixed</p>

              <div></div>
            </div>

            <div className="bg-gray-50 p-2">
              <p>Issue fixed</p>

              <div></div>
            </div>

            <div className="bg-gray-50 p-2">
              <p>Issue fixed</p>

              <div></div>
            </div>

            <div className="bg-gray-50 p-2">
              <p>Issue fixed</p>

              <div></div>
            </div>
          </div>

          <div className="">
            <label for="comments ">Additional comments:</label>

            <textarea
              id="comment"
              name="comments"
              placeholder="Share more thoughts on the facility to help facility improvements"
              rows="5"
              cols="33"
              className="w-full rounded-md"
            ></textarea>
          </div>

          <div className="text-right">
            <button className="bg-mainColor text-white font-bold text-xl px-10 py-2 rounded-md ">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateReportPage;
