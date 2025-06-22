"use client";

import { useState, useEffect } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { FiCheckCircle } from "react-icons/fi";

interface ModalProps {
  isSuccess: boolean | null;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ModalProps> = ({ isSuccess, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isSuccess ?? false);
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsOpen(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      <div className="max-w-sm p-6 mx-auto bg-white rounded-lg">
        <div className="flex items-center">
          {isSuccess ? (
            <>
              <FiCheckCircle className="mr-2 text-2xl text-green-500" />
              <h2 className="text-lg font-semibold text-gray-800">
                Message Sent!
              </h2>
            </>
          ) : (
            <>
              <BiErrorCircle className="mr-2 text-2xl text-red-500" />
              <h2 className="text-lg font-semibold text-gray-800">
                Failed to Send
              </h2>
            </>
          )}
        </div>
        <p className="mt-2 text-gray-600">
          {isSuccess
            ? "Your message has been successfully sent."
            : "Please try again later."}
        </p>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 mt-4 text-white bg-indigo-600 rounded700 hover:bg-indigo-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
