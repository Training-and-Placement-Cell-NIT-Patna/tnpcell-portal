import { API_URL } from '@/config/index'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function FileUpload({ token }) {
  const [resume, setResume] = useState(null)
  const [resumeLink, setResumeLink] = useState('')
  const [transcriptLink, setTranscriptLink] = useState('')
  const [coverLetterLink, setCoverLetterLink] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('resume', resume)
    formData.append('resume_link', resumeLink)

    const res = await fetch(`${API_URL}/api/student/modify`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (res.ok) {
      toast.success('Successfully Updated')
    } else {
      toast.error('Something Went Wrong')
    }
  }

  const transciptSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('transcript_link', transcriptLink)

    const res = await fetch(`${API_URL}/api/student/modify`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (res.ok) {
      toast.success('Successfully Updated')
    } else {
      toast.error('Something Went Wrong')
    }
  }

  const coverSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('cover_letter_link', coverLetterLink)

    const res = await fetch(`${API_URL}/api/student/modify`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (res.ok) {
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1])
      }
      console.log(await res.json())
      toast.success('Successfully Updated')
    } else {
      toast.error('Something Went Wrong')
    }
  }

  const handleFileChange = (e) => {
    setResume(e.target.files[0])
  }
  return (
    <>
      <form
        className='space-y-8 divide-y divide-gray-200'
        onSubmit={handleSubmit}
      >
        <div className='space-y-8 divide-y divide-gray-200'>
          <div>
            <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
              <div className='sm:col-span-4'>
                <label
                  htmlFor='resume_link'
                  className='block text-sm font-medium text-gray-700'
                >
                  Resume Link
                </label>
                <div className='mt-1 flex rounded-md shadow-sm'>
                  <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm'>
                    Google or other Drive Link
                  </span>
                  <input
                    value={resumeLink}
                    onChange={(e) => setResumeLink(e.target.value)}
                    type='text'
                    name='resume_link'
                    id='resume_link'
                    autoComplete='resume_link'
                    required
                    className='flex-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300'
                  />
                </div>
              </div>
              <div className='sm:col-span-6'>
                <label
                  htmlFor='cover-photo'
                  className='block text-sm font-medium text-gray-700'
                >
                  Upload resume
                </label>
                <div className='mt-1 flex justify-center px-6 py-24 border-2 border-gray-300 border-dashed rounded-md'>
                  <div className='space-y-1 text-center'>
                    {resume ? (
                      <object
                        className='w-full h-full'
                        data={URL.createObjectURL(resume)}
                        type='application/pdf'
                        width='100%'
                        height='100%'
                      >
                        <p>Resume preview is not supported in your browser.</p>
                      </object>
                    ) : (
                      <svg
                        className='mx-auto h-12 w-12 text-gray-400'
                        stroke='currentColor'
                        fill='none'
                        viewBox='0 0 48 48'
                        aria-hidden='true'
                      >
                        <path
                          d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    )}
                    <div className='pt-10 flex text-sm text-gray-600'>
                      <label
                        htmlFor='resume'
                        className='relative cursor-pointer bg-white rounded-md font-medium text-yellow-600 hover:text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-yellow-500'
                      >
                        <span>Upload a file</span>
                        <input
                          id='resume'
                          name='resume'
                          type='file'
                          accept='application/pdf'
                          onChange={handleFileChange}
                          className='sr-only'
                          required
                        />
                      </label>
                      <p className='pl-1'>or drag and drop</p>
                    </div>
                    <p className='text-xs text-gray-500'>PDF up to 500KB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='pt-5'>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
            >
              Submit Resume
            </button>
          </div>
        </div>
      </form>

      <form
        className='space-y-8 divide-y divide-gray-200'
        onSubmit={transciptSubmit}
      >
        <div className='space-y-8 divide-y divide-gray-200'>
          <div>
            <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
              <div className='sm:col-span-4'>
                <label
                  htmlFor='transcript_link'
                  className='block text-sm font-medium text-gray-700'
                >
                  Transcript Link (Marksheet)
                </label>
                <div className='mt-1 flex rounded-md shadow-sm'>
                  <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm'>
                    Google Drive Link
                  </span>
                  <input
                    value={transcriptLink}
                    onChange={(e) => setTranscriptLink(e.target.value)}
                    type='text'
                    name='transcript_link'
                    id='transcript_link'
                    autoComplete='transcript_link'
                    required
                    className='flex-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='pt-5'>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
            >
              Submit Transcript
            </button>
          </div>
        </div>
      </form>
      <form
        className='space-y-8 divide-y divide-gray-200'
        onSubmit={coverSubmit}
      >
        <div className='space-y-8 divide-y divide-gray-200'>
          <div>
            <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
              <div className='sm:col-span-4'>
                <label
                  htmlFor='cover_letter_link'
                  className='block text-sm font-medium text-gray-700'
                >
                  Cover letter Link
                </label>
                <div className='mt-1 flex rounded-md shadow-sm'>
                  <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm'>
                    Google Drive Link
                  </span>
                  <input
                    value={coverLetterLink}
                    onChange={(e) => setCoverLetterLink(e.target.value)}
                    type='text'
                    name='cover_letter_link'
                    id='cover_letter_link'
                    autoComplete='cover_letter_link'
                    required
                    className='flex-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='pt-5'>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
            >
              Submit Cover Letter
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
