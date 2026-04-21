"use client";

import { useState } from "react";

type TabsProps = {
  grouped: Record<string, any[]>;
  tabs: string[];
};

export function Tabs({ grouped, tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
   <div className="space-y-6 ">

  {/* TAB NAVIGATION */}
  <div className="flex w-full bg-gray-100  p-2 rounded-xl gap-2">

    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`flex-1 min-w-0 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 truncate ${
          activeTab === tab
            ? "bg-white  text-gray-900  shadow-sm"
            : "text-gray-600  hover:text-gray-900 "
        }`}
        title={tab}
      >
        {tab}
      </button>
    ))}

  </div>

  {/* TAB CONTENT */}
  <div className="space-y-6">

    {grouped[activeTab]?.map((section: any) => (
      <div
        key={section.id}
        className="bg-white 0 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
      >

        <h3 className="text-lg font-semibold text-gray-900  mb-3">
          {section.title.rendered}
        </h3>

        <div
          className="prose prose-p:leading-relaxed prose-p:my-4 [&_.wp-block-heading]:mt-6 [&_.wp-block-heading]:mb-1 max-w-none prose-gray dark:prose-invert [&_.wp-block-heading]:font-bold prose-strong:font-bold prose-b:font-bold text-justify prose-p:leading-relaxed prose-img:mx-auto prose-img:rounded-xl prose-img:shadow [&_.aligncenter]:mx-auto [&_.aligncenter]:text-center [&_.wp-block-image]:text-center [&_.wp-block-image_img]:mx-auto [&_.wp-block-image]:my-6"
          dangerouslySetInnerHTML={{
            __html: section.content.rendered,
          }}
        />
      </div>
    ))}

  </div>

</div>
  );
}