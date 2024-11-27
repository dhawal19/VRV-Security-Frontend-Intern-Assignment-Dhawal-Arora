import React from 'react';
import UserTable from './tables/UserTable';

const Main = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div className={`flex-1 flex flex-col ${isSidebarOpen ? 'ml-64' : ''}`}>
      {/* Header */}
     

      {/* Dynamic Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-bold mb-4">Welcome to the Dashboard</h2>
          <p className="text-gray-600">
            Here is where your main content will appear.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Main;
