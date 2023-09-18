import React from 'react'
import axios from 'axios'
import { API_URL } from '@/config/index'
import Layout from '@/components/student/Layout'
import { parseCookies } from '@/helpers/index'
import UploadDocuments from '@/components/student/UploadDocuments'
export default function UploadDocs({ data = '', token = '', statusCode = '' }) {
    return (
        <>
            <Layout heading='Upload Documents'>
                {statusCode === 204 ? (<>
                    <h1>First fill the registrations form</h1>
                </>) : (<>
                    <UploadDocuments studentsData={data} token={token} />
                </>)}
            </Layout>
        </>
    )
}

export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req)

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    }

    const res = await axios.get(`${API_URL}/api/student/me`, config)
    return {
        props: { data: res.data, statusCode: res.status, token: token },
    }
}
