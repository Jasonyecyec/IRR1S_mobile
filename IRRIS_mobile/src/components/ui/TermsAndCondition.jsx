import React, { useState, useEffect } from "react";
import { Button, Label, Modal } from "flowbite-react";
import { termsAndConditionsText } from "./termsAndConditionText";

const TermsAndCondition = ({ handleCloseModal, isLoading }) => {
  return (
    <div>
      {/* Terms and Conditions Modal */}
      <Modal
        show
        popup
        size="lg"
        onClose={handleCloseModal}
        className="bg-black w-full"
      >
        <Modal.Header className="bg-mainColor2 text-white p-2 text-cente rounded-t-lg ">
          {/* Modal header content */}
          <Label value="Terms and Conditions" className="text-white text-lg " />
        </Modal.Header>

        <Modal.Body>
          {/* Modal body content */}
          <div className="space-y-10 py-5">
            {Object.keys(termsAndConditionsText).map((termKey, index) => (
              <div key={index} className="space-y-3">
                <Label
                  value={termsAndConditionsText[termKey].title}
                  className="text-lg font-bold"
                />
                <div className="space-y-5">
                  {termsAndConditionsText[termKey].points.map(
                    (point, pointIndex) => (
                      <div key={pointIndex}>
                        <Label value={point} className="text-gray-600" />
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TermsAndCondition;
