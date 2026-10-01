'use client';

import NavOverlay from '../components/NavOverlay';
import Cursor from '../components/Cursor ';

const CONTAINER = 'max-w-[1440px] mx-auto';

export default function ServicesPage() {
  return (
    <>
      <NavOverlay />
      <Cursor />

      <main className="min-h-screen bg-[var(--paper-light)] text-[var(--ink)]">

        <section
          id="services"
          className="relative min-h-[calc(100dvh-84px)] px-6 md:px-12 py-12 md:py-20 bg-[var(--paper-light)]"
        >
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />

          <div className={CONTAINER}>
            <h2 className="font-display font-semibold text-3xl md:text-5xl mb-10 md:mb-15 text-center">
              Our Services
            </h2>

            {/* SERVICES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-40 lg:gap-28 xl:gap-42">
              {[
                {
                  title: 'Project Design',
                  icon: (
                    <img
                      src="/images/files/Project_Design.png"
                      alt=""
                      className="w-10 h-10 md:w-14 md:h-14 service-icon"
                    />
                  ),
                  items: [
                    {
                      label: 'Architectural Design',
                      icon: (
                        <img
                          src="/images/files/Arch_design_icon.png"
                          alt=""
                          className="w-10 h-10 service-icon"
                        />
                      ),
                    },
                    {
                      label: 'Interior Design',
                      icon: (
                        <img
                          src="/images/files/Interior_Design.png"
                          alt=""
                          className="w-10 h-10 service-icon"
                        />
                      ),
                    },
                    {
                      label: 'Cost and Feasibility Planning',
                      icon: (
                        <img
                          src="/images/files/Cost_and_feasibility.png"
                          alt=""
                          className="w-10 h-10 service-icon"
                        />
                      ),
                    },
                  ],
                },

                {
                  title: 'Project Engineering',
                  icon: (
                    <img
                      src="/images/files/Proj_Engineering.png"
                      alt=""
                      className="w-10 h-10 md:w-14 md:h-14 service-icon"
                    />
                  ),
                  items: [
                    {
                      label: 'Structural Design',
                      icon: (
                        <img
                          src="/images/files/Structural_Design.png"
                          alt=""
                          className="w-10 h-10 service-icon"
                        />
                      ),
                    },
                    {
                      label: 'Electrical Design',
                      icon: (
                        <img
                          src="/images/files/Electrical_Design.png"
                          alt=""
                          className="w-10 h-10 service-icon"
                        />
                      ),
                    },
                    {
                      label: 'Mechanical and Plumbing Design',
                      icon: (
                        <img
                          src="/images/files/Mechanical_Plumbing.png"
                          alt=""
                          className="w-10 h-10 service-icon"
                        />
                      ),
                    },
                  ],
                },

                {
                  title: 'Project Compliance',
                  icon: (
                    <img
                      src="/images/files/Proj_Compliance.png"
                      alt=""
                      className="w-10 h-10 md:w-14 md:h-14 service-icon"
                    />
                  ),
                  items: [
                    {
                      label: 'Land Use Advisory',
                      icon: (
                        <img
                          src="/images/files/Land_Use_Advisory.png"
                          alt=""
                          className="w-10 h-10 service-icon"
                        />
                      ),
                    },
                    {
                      label: 'Permitting and Approvals',
                      icon: (
                        <img
                          src="/images/files/Permitting_Approval.png"
                          alt=""
                          className="w-10 h-10 service-icon"
                        />
                      ),
                    },
                    {
                      label: 'Construction Supervision',
                      icon: (
                        <img
                          src="/images/files/construction-supervision.png"
                          alt=""
                          className="w-10 h-10 service-icon"
                        />
                      ),
                    },
                  ],
                },
              ].map((cat) => (
                <div
  key={cat.title}
  className="w-full flex flex-col items-center md:items-start"
>
  {/* MAIN SERVICE ICON */}
  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-[var(--brass)] flex-shrink-0 flex items-center justify-center mb-4 text-[var(--brass)]">
    {cat.icon}
  </div>

  {/* MAIN SERVICE TITLE */}
  <h3 className="w-full font-display font-bold text-2xl md:text-3xl uppercase leading-tight text-center md:text-left mb-3">
    {cat.title}
  </h3>

  {/* DIVIDER */}
  <div className="w-36 md:w-44 h-[2px] bg-[var(--brass)] mb-7 md:mb-9" />

  {/* LEAVE SUBSERVICES EXACTLY AS THEY ARE */}
  <ul className="w-full max-w-[310px] space-y-6">
    {cat.items.map((item) => (
      <li
        key={item.label}
        className="grid grid-cols-[44px_1fr] gap-10 md:gap-4 items-center"
      >
        <span className="w-11 h-10 flex items-center justify-center shrink-0">
          {item.icon}
        </span>

        <span className="text-lg md:text-xl leading-snug text-left md:whitespace-nowrap">
          {item.label}
        </span>
        
      </li>
    ))}
  </ul>
</div>


              ))}
            </div>
          </div>
        </section>

        <div className="flex items-center justify-center mt-2 md:mt-2 mb-2">
          <a
            href="/contact"
            className="magnetic font-mono text-lg uppercase px-6 py-3 rounded-full bg-[var(--on-dark)] text-[var(--brass)] shadow-xl whitespace-nowrap"
          >
            Start a project →
          </a>
        </div>

      </main>
    </>
  );
}