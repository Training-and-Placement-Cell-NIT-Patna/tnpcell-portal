import React, { useState, useEffect } from 'react'
import { API_URL } from '@/config/index'
import { toast } from 'react-toastify'
import { BsFillEyeFill } from 'react-icons/bs'
function UploadDocuments({ token, studentsData }) {

    // console.log("studentData: ", studentsData);
    const [casteCertificate, setCasteCertificate] = useState(studentsData.casteCertificate);
    const [tenthCertificate, setTenthCertificate] = useState(studentsData.tenthCertificate);
    const [twelthCertificate, setTwelthCertificate] = useState(studentsData.twelthCertificate);
    const [drivingLicence, setDrivingLicence] = useState(studentsData.drivingLicence);
    const [aadharCard, setAadharCard] = useState(studentsData.aadharCard);
    const [panCard, setPanCard] = useState(studentsData.panCard);
    const [disabilityCertificate, setDisabilityCertificate] = useState(studentsData.disabilityCertificate);
    const [allSemMarksheet, setAllSemMarksheet] = useState(studentsData.allSemMarksheet);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault()



        if (studentsData.category !== "general") {
            if (!casteCertificate) {
                toast.error('Please Upload Caste Certificate')
                return;
            }
        }

        if (studentsData.pwd) {
            if (!disabilityCertificate) {
                toast.error('Please Upload Disability Certificate')
                return;
            }
        }

        // if (!tenthCertificate || !twelthCertificate || !aadharCard || !drivingLicence   || !panCard || !allSemMarksheet) {
        //     toast.error('Please Upload All Documents')
        //     return;
        // }   
        // temporary changes due students doesn't have pan and dl
        if (!tenthCertificate || !twelthCertificate || !aadharCard || !allSemMarksheet) {
            toast.error('Please Upload All Documents');
            return;
        }


        setLoading(true)
        const form = new FormData();
        form.append('casteCertificate', casteCertificate);
        form.append('tenthCertificate', tenthCertificate);
        form.append('twelthCertificate', twelthCertificate);
        form.append('drivingLicence', drivingLicence);
        form.append('aadharCard', aadharCard);
        form.append('panCard', panCard);
        form.append('disabilityCertificate', disabilityCertificate);
        form.append('allSemMarksheet', allSemMarksheet);
        const res = await fetch(`${API_URL}/api/student/modify`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: form,
        })

        if (res.ok) {
            toast.success('Successfully Updated', {
                position: "top-right",
            })
            setAadharCard('')
            setAllSemMarksheet('')
            setCasteCertificate('')
            setDisabilityCertificate('')
            setDrivingLicence('')
            setPanCard('')
            setTenthCertificate('')
            setTwelthCertificate('')
            setLoading(false)
        } else {
            toast.error('Something Went Wrong')
            setLoading(false);
        }
    }
    // useEffect(() => {
    //     // const data = axios.ge
    // },[])
    return (
        <>
            <div className='p-20'>
                <form>
                    <div className='col-span-3 sm:col-span-1'>
                        {studentsData.category !== 'general' ? <>
                            <div>
                                <label htmlFor="casteCertificate" className='mb-1 block text-sm font-medium text-gray-700'>Caste Certificate</label>
                                <input type="file" className='file-input file-input-bordered file-input-warning file-input-sm w-full max-w-xs' required={studentsData.category !== 'general' ? true : false} name="casteCertificate" id="casteCertificate" onChange={(e) => setCasteCertificate(e.target.files[0])} /> <a href={`${API_URL}` + studentsData.casteCertificate?.url} target='_blank' ><BsFillEyeFill className='inline text-2xl' /></a>
                            </div>
                        </> : null}
                        <div>
                            <label htmlFor="tenthCertificate" className='mb-1 block text-sm font-medium text-gray-700'>Tenth Certificate</label>
                            <input type="file" className='file-input file-input-bordered file-input-warning file-input-sm w-full max-w-xs' disabled={studentsData.tenthCertificate?.url} name="tenthCertificate" id="tenthCertificate" onChange={(e) => setTenthCertificate(e.target.files[0])} /> <a href={`${API_URL}` + studentsData.tenthCertificate?.url} target='_blank' ><BsFillEyeFill className='inline text-2xl' /></a>
                        </div>
                        <div>
                            <label htmlFor="twelthCertificate" className='mb-1 block text-sm font-medium text-gray-700'>Twelth Certificate</label>
                            <input type="file" className='file-input file-input-bordered file-input-warning file-input-sm w-full max-w-xs' disabled={studentsData.twelthCertificate?.url} name="twelthCertificate" id="twelthCertificate" onChange={(e) => setTwelthCertificate(e.target.files[0])} /> <a href={`${API_URL}` + studentsData.twelthCertificate?.url} target='_blank' ><BsFillEyeFill className='inline text-2xl' /></a>
                        </div>
                        <div>
                            <label htmlFor="aadharCard" className='mb-1 block text-sm font-medium text-gray-700'>Aadhar Card</label>
                            <input type="file" className='file-input file-input-bordered file-input-warning file-input-sm w-full max-w-xs' disabled={studentsData.aadharCard?.url} name="aadharCard" id="aadharCard" onChange={(e) => setAadharCard(e.target.files[0])} /> <a href={`${API_URL}` + studentsData.aadharCard?.url} target='_blank' ><BsFillEyeFill className='inline text-2xl' /></a>
                        </div>
                        <div>
                            <label htmlFor="panCard" className='mb-1 block text-sm font-medium text-gray-700'>Pan Card</label>
                            <input type="file" className='file-input file-input-bordered file-input-warning file-input-sm w-full max-w-xs' disabled={studentsData.panCard?.url} name="panCard" id="panCard" onChange={(e) => setPanCard(e.target.files[0])} /> <a href={`${API_URL}` + studentsData.panCard?.url} target='_blank' ><BsFillEyeFill className='inline text-2xl' /></a>
                        </div>
                        <div>
                            <label htmlFor="drivingLicence" className='mb-1 block text-sm font-medium text-gray-700'>Driving Licence</label>
                            <input type="file" className=' file-input file-input-bordered file-input-warning file-input-sm w-full max-w-xs' disabled={studentsData.drivingLicence?.url} name="drivingLicence" id="drivingLicence" onChange={(e) => setDrivingLicence(e.target.files[0])} /> <a href={`${API_URL}` + studentsData.drivingLicence?.url} target='_blank' ><BsFillEyeFill className='inline text-2xl' /></a>
                        </div>

                        {studentsData.pwd ? <>
                            <div>
                                <label htmlFor="disabilityCertificate" className='mb-1 block text-sm font-medium text-gray-700'>Disability Certificate</label>

                                <input type="file" className=' file-input file-input-bordered file-input-warning file-input-sm w-full max-w-xs' name="disabilityCertificate" id="disabilityCertificate" onChange={(e) => setDisabilityCertificate(e.target.files[0])} /> <a href={`${API_URL}` + studentsData.disabilityCertificate?.url} target='_blank' ><BsFillEyeFill className='inline text-2xl' /></a>
                            </div>
                        </> : null}

                        <div>
                            <label htmlFor="allSemMarksheet" className='mb-1 block text-sm font-medium text-gray-700'>All Sem Marksheet</label>
                            <input type="file" className='file-input file-input-bordered file-input-warning file-input-sm w-full max-w-xs' name="allSemMarksheet" id="allSemMarksheet" onChange={(e) => setAllSemMarksheet(e.target.files[0])} />
                            <a href={`${API_URL}` + studentsData.allSemMarksheet?.url} target='_blank' ><BsFillEyeFill className='inline text-2xl' /></a>
                        </div>
                    </div>
                    <div className='flex justify-start py-2'>
                        <button type='submit' onClick={handleSubmit} className='bg-yellow-500 px-2 py-2 rounded shadow'>{loading ? 'Wait...' : 'Submit'}</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UploadDocuments