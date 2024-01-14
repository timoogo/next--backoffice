// Layout.tsx
import React from 'react';

interface LayoutProps {
  // Add any additional props you need here
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header>
        {/* Add header content if needed */}
      </header>
      <main>{children}</main>
      <footer>
        {/* Add footer content if needed */}
      </footer>
    </div>
  );
};

export default Layout;