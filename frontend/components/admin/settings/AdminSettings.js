import { useState, useEffect } from "react";
import { Disclosure, Menu, Switch, Transition } from "@headlessui/react";
import { API_URL } from "@/config/index";
import { toast } from "react-toastify";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminSettings({ token = "" }) {
  const [cpiChangeAllowed, setCpiChangeAllowed] = useState(false);
  const [registrationsAllowed, setRegistrationsAllowed] = useState(false);

  const handleUpdateSetting = (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to update this setting?")) {
      fetch(`${API_URL}/api/setting`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            cpi_change_allowed: cpiChangeAllowed,
            registrations_allowed: registrationsAllowed,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            toast.success("Successfully Updated");
          }
          else {
            toast.error("Something Went Wrong!");
          }
        })
        .catch((err) => {
          toast.error("Something Went Wrong!");
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetch(`${API_URL}/api/setting`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCpiChangeAllowed(data.data?.attributes?.cpi_change_allowed);
        setRegistrationsAllowed(data.data?.attributes?.registrations_allowed);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="mt-4">
      <div className="max-w-screen-xl mx-auto pb-6 ">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
            <form
              className="divide-y divide-gray-200 lg:col-span-12"
              onSubmit={handleUpdateSetting}
            >
              {/* Privacy section */}
              <div className="pt-6 divide-y divide-gray-200">
                <div className="px-4 sm:px-6">
                  <div>
                    <h2 className="text-lg leading-6 font-medium text-gray-900">
                      Admin Settings
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Universal setting managed by admins.
                    </p>
                  </div>
                  <ul role="list" className="mt-2 divide-y divide-gray-200">
                    <Switch.Group
                      as="li"
                      className="py-4 flex items-center justify-between"
                    >
                      <div className="flex flex-col">
                        <Switch.Label
                          as="p"
                          className="text-sm font-medium text-gray-900"
                          passive
                        >
                          Allow editing Overall CGPA and Semester CGPA
                        </Switch.Label>
                        <Switch.Description className="text-sm text-gray-500">
                          This will allow all students to edit their overall CGPA and
                          Semester CGPA.
                        </Switch.Description>
                      </div>
                      <Switch
                        checked={cpiChangeAllowed}
                        onChange={setCpiChangeAllowed}
                        className={classNames(
                          cpiChangeAllowed ? "bg-teal-500" : "bg-gray-200",
                          "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            cpiChangeAllowed
                              ? "translate-x-5"
                              : "translate-x-0",
                            "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                          )}
                        />
                      </Switch>
                    </Switch.Group>
                    <Switch.Group
                      as="li"
                      className="py-4 flex items-center justify-between"
                    >
                      <div className="flex flex-col">
                        <Switch.Label
                          as="p"
                          className="text-sm font-medium text-gray-900"
                          passive
                        >
                          Allow Student Registration
                        </Switch.Label>
                        <Switch.Description className="text-sm text-gray-500">
                          Change this to allow or disallow student registration
                        </Switch.Description>
                      </div>
                      <Switch
                        checked={registrationsAllowed}
                        onChange={setRegistrationsAllowed}
                        className={classNames(
                          registrationsAllowed ? "bg-teal-500" : "bg-gray-200",
                          "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            registrationsAllowed
                              ? "translate-x-5"
                              : "translate-x-0",
                            "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                          )}
                        />
                      </Switch>
                    </Switch.Group>
                  </ul>
                </div>
                <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                  <button
                    type="button"
                    className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-5 bg-yellow-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
