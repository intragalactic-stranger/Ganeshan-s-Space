import Link from "next/link";

import { FOOTER_DATA } from "@/constants";

export const Footer = () => {
  return (
    <footer className="w-full bg-transparent text-gray-200 shadow-lg py-8 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {FOOTER_DATA.map((column) => (
            <div
              key={column.title}
              className="flex flex-col items-center sm:items-start"
            >
              <h3 className="footer-heading text-base sm:text-lg mb-4">{column.title}</h3>
              <div className="flex flex-col items-center sm:items-start gap-3">
                {column.data.map(({ icon: Icon, name, link }) => (
                  <Link
                    key={`${column.title}-${name}`}
                    href={link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex flex-row items-center gap-2 footer-link group"
                  >
                    {Icon && <Icon className="group-hover:scale-110 transition-transform" />}
                    <span className="text-sm sm:text-base">{name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

  <div className="border-t divider-soft pt-6">
          <p className="text-sm sm:text-base text-center text-gray-400">
            &copy; Ganeshan Arumuganainar {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
