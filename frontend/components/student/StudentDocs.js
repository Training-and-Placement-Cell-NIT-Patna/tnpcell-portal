
/** 
 *  This component is used to show the uploaded docs by the student (both approved and unapproved) to the admin while checking 
 * the student details
 * 
 */

import { PaperClipIcon } from "@heroicons/react/solid";
import { API_URL } from "@/config/index";

const StudentDocs = function ({ uploadedDoc, google_drive_link, doc_name }) {

    //data = {resume , 10,12, AAdhar , Pan, Driving, all sem  }

    //data = {of which I have to show all the attributes}
    //li k


    return (
        <>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{doc_name}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul
                        role="list"
                        className="border border-gray-200 rounded-md divide-y divide-gray-200"
                    >
                        <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div className="w-0 flex-1 flex items-center">
                                <PaperClipIcon
                                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                <span className="ml-2 flex-1 w-0 truncate">
                                    {uploadedDoc ? doc_name + ".pdf" : `No ${doc_name} found`}
                                </span>
                            </div>
                            <div className="ml-4 flex-shrink-0 space-x-4">
                                {uploadedDoc?.attributes.url ? (
                                    <div className="">
                                        <span>
                                            <a
                                                href={`${API_URL}${uploadedDoc?.attributes?.url}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="font-medium text-yellow-600 hover:text-yellow-500 px-2"
                                            >
                                                Download
                                            </a>
                                        </span>
                                        {
                                            google_drive_link ? (
                                                <span>
                                                    <a
                                                        href={google_drive_link}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="font-medium text-yellow-600 hover:text-yellow-500 cursor-pointer"
                                                    >
                                                        Google Drive Link
                                                    </a>
                                                </span>
                                            ) : null
                                        }
                                    </div>
                                ) : (
                                    <p className="font-medium text-yellow-600 hover:text-yellow-500">
                                        NA
                                    </p>
                                )}
                            </div>
                        </li>
                    </ul>
                </dd>
            </div>
        </>
    )
}

export default StudentDocs;