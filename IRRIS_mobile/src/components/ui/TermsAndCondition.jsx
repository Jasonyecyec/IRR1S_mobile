import React, { useState, useEffect } from "react";
import { Button, Label, Modal } from "flowbite-react";

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
        <Modal.Header className="bg-mainColor text-white p-3 rounded-t-lg">
          {/* Modal header content */}
          <Label value="Terms and Conditions" className="text-white text-lg" />
        </Modal.Header>

        <Modal.Body>
          {/* Modal body content */}
          <div className="space-y-4">
            {/* Term 1: Data Privacy and Security */}
            <div>
              <Label
                value="1. Data Privacy and Security"
                className="text-lg font-bold"
              />
            </div>

            <div>
              <Label
                value="1.1 We prioritize the privacy and security of your data."
                className="text-gray-300"
              />
            </div>
            <div>
              <Label
                value="1.2 Your personal information will only be used for the purposes outlined in this agreement."
                className="text-gray-300"
              />
            </div>
            <div>
              <Label
                value="1.3 We use industry-standard security measures to protect your data from unauthorized access, disclosure, or alteration."
                className="text-gray-300"
              />
            </div>

            {/* Term 2: Data Collection and Use */}
            <div>
              <Label
                value="2. Data Collection and Use"
                className="text-lg font-bold"
              />
            </div>
            <div>
              <Label
                value="2.1 By using our system, you consent to the collection and use of your data as outlined in this agreement."
                className="text-gray-300"
              />
            </div>
            <div>
              <Label
                value="2.2 We collect information such as your name, contact details, and usage data to provide and improve our services."
                className="text-gray-300"
              />
            </div>
            <div>
              <Label
                value="2.3 Your data may be used to personalize your experience, improve our services, and communicate with you."
                className="text-gray-300"
              />
            </div>
            <div>
              <Label
                value="2.4 We may also collect your IP address for security and analytical purposes."
                className="text-gray-300"
              />
            </div>

            {/* Term 3: Data Sharing */}
            <div>
              {" "}
              <Label value="3. Data Sharing" className="text-lg font-bold" />
            </div>
            <div>
              <Label
                value="3.1 We do not sell, trade, or rent your personal information to third parties."
                className="text-gray-300"
              />
            </div>
            <div>
              <Label
                value="3.2 Your data may be shared with trusted third parties who assist us in operating our system, as long as they agree to keep your information confidential."
                className="text-gray-300"
              />
            </div>

            {/* Term 4: Data Retention */}
            <div>
              {" "}
              <Label value="4. Data Retention" className="text-lg font-bold" />
            </div>
            <div>
              <Label
                value="4.1 Your data will be retained for as long as necessary to fulfill the purposes outlined in this agreement."
                className="text-gray-300"
              />
            </div>

            <div>
              <Label
                value="4.2 You may request the deletion of your data at any time, subject to legal and contractual obligations."
                className="text-gray-300"
              />
            </div>

            {/* Term 5: Consent */}
            <div>
              {" "}
              <Label value="5. Consent" className="text-lg font-bold" />
            </div>
            <div>
              <Label
                value="5.1 By using our system, you consent to the collection, use, and sharing of your data as outlined in this agreement."
                className="text-gray-300"
              />
            </div>
            <div>
              <Label
                value="5.2 You have the right to withdraw your consent at any time by contacting us."
                className="text-gray-300"
              />
            </div>

            {/* Term 6: Changes to the Agreement */}
            <div>
              <Label
                value="6. Changes to the Agreement"
                className="text-lg font-bold"
              />
            </div>

            <div>
              <Label
                value="6.1 We reserve the right to modify or update this agreement at any time."
                className="text-gray-300"
              />
            </div>

            <div>
              <Label
                value="6.2 Any changes to the agreement will be communicated to you through our system."
                className="text-gray-300"
              />
            </div>

            {/* Term 7: Contact Us */}
            <div>
              <Label value="7. Contact Us" className="text-lg font-bold" />
            </div>

            <div>
              <Label
                value="7.1 If you have any questions or concerns about this agreement, please contact us at"
                className="text-gray-300"
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TermsAndCondition;
