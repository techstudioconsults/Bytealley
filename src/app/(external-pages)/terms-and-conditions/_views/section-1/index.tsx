"use client";

import React from "react";

import { termsandconditions } from "~/utils/constants";

export const TermsAndConditions: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[70rem] py-10 text-left sm:py-20">
        <div className="list-outside list-decimal space-y-6 px-6">
          {termsandconditions.map((term, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-2xl font-bold">{term.title}</h3>
              <p className="mt-2">{term.text}</p>
              {term.points && (
                <div className="mt-2 list-outside list-disc space-y-2 pl-6">
                  {term.points.map((point, pointIndex) => (
                    <li key={pointIndex}>{point}</li>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
