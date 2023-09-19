import React, { useState, useEffect } from 'react'
import { API_URL } from '@/config/index'
import { toast } from 'react-toastify'
import axios from 'axios';
function UploadDocuments({ token, studentsData }) {
    const [casteCertificate, setCasteCertificate] = useState();
    const [tenthCertificate, setTenthCertificate] = useState();
    const [twelthCertificate, setTwelthCertificate] = useState();
    const [drivingLicence, setDrivingLicence] = useState();
    const [aadharCard, setAadharCard] = useState();
    const [panCard, setPanCard] = useState();
    const [disabilityCertificate, setDisabilityCertificate] = useState();
    const [allSemMarksheet, setAllSemMarksheet] = useState();
    const handleSubmit = async (e) => {
        e.preventDefault()
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
            toast.success('Successfully Updated')
            setAadharCard('')   
            setAllSemMarksheet('')
            setCasteCertificate('')
            setDisabilityCertificate('')
            setDrivingLicence('')
            setPanCard('')
            setTenthCertificate('')
            setTwelthCertificate('')
        } else {
            toast.error('Something Went Wrong')
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
                            <div className=''>
                                <label htmlFor="">casteCertificate</label>
                                <input type="file" name="casteCertificate" id="casteCertificate" onChange={(e) => setCasteCertificate(e.target.files[0])} />
                            </div>
                        </> : null}
                        <div>
                            <label htmlFor="">tenthCertificate</label>
                            <input type="file" name="tenthCertificate" id="tenthCertificate" onChange={(e) => setTenthCertificate(e.target.files[0])} />
                        </div>
                        <div>
                            <label htmlFor="">twelthCertificate</label>
                            <input type="file" name="twelthCertificate" id="twelthCertificate" onChange={(e) => setTwelthCertificate(e.target.files[0])} />
                        </div>
                        <div>
                            <label htmlFor="">aadharCard</label>
                            <input type="file" name="aadharCard" id="aadharCard" onChange={(e) => setAadharCard(e.target.files[0])} />
                        </div>
                        <div>
                            <label htmlFor="">panCard</label>
                            <input type="file" name="panCard" id="panCard" onChange={(e) => setPanCard(e.target.files[0])} />
                        </div>
                        <div>
                            <label htmlFor="">drivingLicence</label>
                            <input type="file" name="drivingLicence" id="drivingLicence" onChange={(e) => setDrivingLicence(e.target.files[0])} />
                        </div>
                        {studentsData.pwd ? <>
                            <div>
                                <label htmlFor="">disabilityCertificate</label>
                                <input type="file" name="disabilityCertificate" id="disabilityCertificate" onChange={(e) => setDisabilityCertificate(e.target.files[0])} />
                            </div>
                        </> : null}
                        <div>
                            <label htmlFor="">allSemMarksheet</label>
                            <input type="file" name="allSemMarksheet" id="allSemMarksheet" onChange={(e) => setAllSemMarksheet(e.target.files[0])} />
                        </div>
                    </div>
                    <button type='submit' onClick={handleSubmit} className='bg-yellow-500'>submit</button>
                </form>
            </div>
        </>
    )
}

export default UploadDocuments