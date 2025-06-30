import React from "react";
import { ChefHat, Utensils, Clock } from "lucide-react";

const Loader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
      <div className="text-center">
        {/* Main animated icon container */}
        <div className="relative mb-8">
          {/* Rotating outer ring */}
          <div className="w-24 h-24 mx-auto relative">
            <div className="absolute inset-0 border-4 border-orange-200 rounded-full animate-spin border-t-orange-500"></div>

            {/* Central chef hat icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <ChefHat className="w-10 h-10 text-orange-600 animate-pulse" />
            </div>
          </div>

          {/* Floating utensils */}
          <div className="absolute -top-2 -left-2">
            <Utensils
              className="w-6 h-6 text-red-500 animate-bounce"
              style={{ animationDelay: "0.1s" }}
            />
          </div>
          <div className="absolute -top-2 -right-2">
            <Clock
              className="w-6 h-6 text-orange-500 animate-bounce"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-800 animate-pulse">
            Preparing your order
          </h2>
          <p
            className="text-gray-600 animate-pulse"
            style={{ animationDelay: "0.2s" }}
          >
            Our chefs are working their magic...
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
          <div
            className="w-3 h-3 bg-red-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>

        {/* Progress bar */}
        <div className="w-64 mx-auto mt-8 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
