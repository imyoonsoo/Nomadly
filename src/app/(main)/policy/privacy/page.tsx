import { privacyPolicy } from "@/constants/policy";

const PrivacyPage = () => {
  const { version, title, description, updatedAt, sections } = privacyPolicy;
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 w-full max-w-250 mx-auto gap-12 p-7.5 mt-12 md:mt-20 mb-10">
        <div className="flex flex-col justify-between items-start gap-5 mb-20 pb-15 border-b border-gray-200">
          <h1 className="text-32-bold mb-6 text-gray-950">{title}</h1>
          <p className="text-14-medium break-keep leading-8 text-gray-800 md:text-16-medium">
            {description}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-14-medium text-gray-400">
              version {version}
            </span>
            <span className="text-14-medium text-gray-400">|</span>
            <span className="text-14-medium text-gray-400">
              최종 수정일: {updatedAt}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-16">
          {sections.map((section) => (
            <section key={section.id}>
              <h2 className="text-16-bold mb-3 md:text-18-bold">
                {section.title}
              </h2>
              <p className="text-14-medium leading-1.5 mb-6 text-gray-800">
                {section.content}
              </p>
              <ul className="space-y-1 rounded-xl bg-gray-25 p-8">
                {section.subList.map((sub) => (
                  <li
                    key={sub}
                    className="flex gap-3 text-14-medium text-gray-700"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary-500" />
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
