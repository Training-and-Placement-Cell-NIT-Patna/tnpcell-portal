import { useState, useEffect } from "react";
import Slideover from "@/components/Slideover";
// import { toast } from "react-toastify";
import { API_URL } from "../config";
import axios from "axios";
import { BellIcon } from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const tabs = [
    { name: "TPC Guidelines", fn: openTpcGuidelines, current: false },
    //   { name: 'Team', href: '#', current: false },
  ];

  // Add slideover on click
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [tpcGuidelines, setTpcGuidelines] = useState("");

  function toggleSlideOver() {
    setOpen(!open);
  }

  function openTpcGuidelines() {
    // open tpc guidelines in new tab
    window.open(API_URL + tpcGuidelines, "_blank", "noopener,noreferrer");
  }

  //api showing error that's why commented

  const fetchSettings = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/setting?populate=*`);
      const data = res.data.data;
      // console.log(res);
      setTpcGuidelines(data.attributes.tpc_guidelines.data.attributes.url);
    } catch (err) {
      // toast.error('Error fetching TPC Guidelines')
      console.log(err);
    }
  };
  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div className="bg-white shadow">
      <Slideover open={open} setOpen={setOpen} />
      <div>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                // toggle slideover on click
                onClick={tab.fn}
                className={classNames(
                  open && tab.name === "Notifications"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-yellow-500 hover:text-yellow-600 border-yellow-500",
                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer transition duration-150 ease-in-out select-none focus:outline-none focus:text-indigo-800 focus:border-indigo-700"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </a>
            ))}
            {/* Notification icon at the right */}
            <div className="flex-grow" />
            <a
              onClick={toggleSlideOver}
              className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer transition duration-150 ease-in-out select-none focus:outline-none focus:text-indigo-800 focus:border-indigo-700"
            >
              {/* Animate bell icon */}
              <BellIcon className="h-6 w-6 text-gray-500 hover:text-indigo-700 animate-colors" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
