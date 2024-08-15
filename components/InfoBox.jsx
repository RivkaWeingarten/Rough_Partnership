import React from "react";

export default function InfoBox({
  heading,
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-800",
  buttonInfo,
  buttonInfo2,
  buttonInfo3,
  children,
  lot,
}) {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textColor}mt-2 mb-4`}>{children}</p>
      <a
        href={buttonInfo.link}
        className={`inline-block ${buttonInfo.backgroundColor} text-white rounded-lg px-4 py-2 hover:opacity-80`}
      >
        {buttonInfo.text || "Select Options"} 
      </a>
      <a
        href={buttonInfo2.link}
        className={`inline-block ${buttonInfo2.backgroundColor} text-white rounded-lg px-4 py-2 hover:opacity-80`}
      >
        {buttonInfo.text || "Add Rough"}
      </a>
      <a
        href={buttonInfo3.link}
        className={`inline-block ${buttonInfo3.backgroundColor} text-white rounded-lg px-4 py-2 hover:opacity-80`}
      >
        {buttonInfo3.text || "View Details"}
      </a>
    </div>
  );
}
