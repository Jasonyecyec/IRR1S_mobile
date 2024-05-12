import React, { useState, useEffect } from "react";
import { Modal, Label } from "flowbite-react";
import { fetchFacility } from "@/src/services/api/sharedService";

const RoomAssets = ({ isOpen, onClose, facility }) => {
  return (
    <div>
      <Modal show size={"lg"} popup onClose={onClose} className="pt-[10rem]">
        <Modal.Header className="bg-mainColor2">
          {" "}
          <Label className="text-white text-lg">Room Assets</Label>
        </Modal.Header>
        <Modal.Body className="p-3 ">
          <div className="space-y-1">
            {facility && facility.facilities_asset.length > 0 ? (
              facility.facilities_asset.map((item) => (
                <div key={item.id} className="flex font-semibold space-x-3">
                  {" "}
                  <p className="capitalize w-24 flex justify-between ">
                    {" "}
                    <span>{item.assets} </span> <span>- </span>
                  </p>{" "}
                  <p>{item.quantity} quantity</p>
                </div>
              ))
            ) : (
              <p className="text-center font-semibold">No data available</p>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RoomAssets;
