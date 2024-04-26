import React, { useState, useEffect } from "react";
import { Modal, Label } from "flowbite-react";
import { fetchFacility } from "@/src/services/api/sharedService";

const RoomAssets = ({ isOpen, onClose, qrCodeId, roomAssets, facilityId }) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [roomAssets, setRoomAssets] = useState(""); // State to store room assets
  console.log("Received props:", qrCodeId, roomAssets, facilityId);

  return (
    <div>
      <Modal show size={"lg"} popup onClose={onClose} className="pt-[10rem]">
        <Modal.Header className="bg-mainColor2">
          {" "}
          <Label className="text-white text-lg">Room Assets</Label>
        </Modal.Header>
        <Modal.Body className="p-3 font-bold">
          {isLoading ? (
            <p>Loading...</p>
          ) : facilityId ? (
            <p>{facilityId}</p> // Display room assets if found
          ) : (
            <p>No room assets available</p> // Display message if no room assets found
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RoomAssets;
