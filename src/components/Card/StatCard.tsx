import React from 'react';
import Link from 'next/link';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  redirection?: string;
  accessibilityLabel: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon, redirection, accessibilityLabel }) => {
  return (
    <div className="w-full p-2 lg:w-1/4 md:w-1/2">
      {redirection ? (
        <Link href={redirection}>
            <div className="flex flex-col px-6 py-10 overflow-hidden bg-white hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
              <div className="flex flex-row justify-between items-center">
                <div className="px-4 py-4 bg-gray-300 rounded-xl bg-opacity-30">{icon}</div>
                <div className="inline-flex text-sm text-gray-600 group-hover:text-gray-200 sm:text-base">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 text-green-500 group-hover:text-gray-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {description}
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-12 group-hover:text-gray-50">
                {value}
              </h1>
              <div className="flex flex-row justify-between group-hover:text-gray-200">
                <p>{title}</p>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-600 group-hover:text-gray-200"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
        </Link>
      ) : (
        <div className="flex flex-col px-6 py-10 overflow-hidden bg-white hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
          <div className="flex flex-row justify-between items-center">
            <div className="px-4 py-4 bg-gray-300 rounded-xl bg-opacity-30">{icon}</div>
            <div className="inline-flex text-sm text-gray-600 group-hover:text-gray-200 sm:text-base">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-green-500 group-hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {description}
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-12 group-hover:text-gray-50">
            {value}
          </h1>
          <div className="flex flex-row justify-between group-hover:text-gray-200">
            <p>{title}</p>
            <span title={accessibilityLabel}>
              <svg
              
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-600 group-hover:text-gray-200"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatCard;
