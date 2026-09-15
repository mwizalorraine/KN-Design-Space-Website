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
  className="relative min-h-[calc(100dvh-84px)] px-6 md:px-12 py-12 md:py-16 bg-[var(--paper-light)] flex items-center"
>
  <div className="absolute inset-0 bg-black/10 pointer-events-none" />

  <div className={`${CONTAINER} w-full relative`}>
    <h2 className="font-display font-semibold text-3xl md:text-5xl lg:text-6xl mb-12 md:mb-16 text-center">
      Our Services
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start">
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
  className="text-center md:text-left flex flex-col items-center md:items-start"
>
  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-[var(--brass)] flex-shrink-0 flex items-center justify-center mb-5">
    {cat.icon}
  </div>

  <div className="h-[90px] flex items-start">
    <h3 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl uppercase leading-tight">
      {cat.title}
    </h3>
  </div>

  <div className="w-36 md:w-48 h-[2px] bg-[var(--brass)] mb-7" />

  <ul className="space-y-6 md:space-y-7">
    {cat.items.map((item) => (
      <li
        key={item.label}
        className="flex items-center gap-4"
      >
        <span className="w-9 h-9 flex-shrink-0">
          {item.icon}
        </span>

        <span className="text-base md:text-lg lg:text-xl">
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

      </main>
    </>
  );
}