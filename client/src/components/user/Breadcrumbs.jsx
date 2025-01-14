import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumbs = () => {
  const [links, setLinks] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const pathnames = location.pathname.split('/').filter((x) => x); // Split and remove empty strings
    setLinks(pathnames);
  }, [location]);

  return (
    <div className=" bg-gray-800 text-gray-100 p-2 flex pop uppercase font-medium text-sm tracking-widest gap-x-4 w-full items-center">
      <p>
        <Link to="/">
          Home
        </Link>
        {links.map((link, index) => {
          const path = `/${links.slice(0, index + 1).join('/')}`;
          return (
            <span key={index}>
              {' / '}
              <Link to={path} className="text-blue-400 ">
                {link.charAt(0).toUpperCase() + link.slice(1)} {/* Capitalize */}
              </Link>
            </span>
          );
        })}
      </p>
    </div>
  );
};

export default Breadcrumbs;
