import React, { useState } from 'react'
import { API_URL } from '@/config/index'
import Layout from '@/components/admin/Layout'
import { toast } from 'react-toastify'
import { parseCookies } from '@/helpers/index'
export default function AddCoordinatorDetails({ token }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    year: '',
    linkedin: '',
    twitter: '',
  })
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile || !formData.year || !formData.linkedin || !formData.twitter || !image) {
      toast.error('Please fill all the fields')
      return;
    }
    setLoading(true)
    const formDataToSend = new FormData();
    const userData = {
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      year: formData.year,
      linkedin: formData.linkedin,
      twitter: formData.twitter,
    };
    formDataToSend.append('data', JSON.stringify(userData));
    formDataToSend.append('files.image', image);
    try {
      const resp = await fetch(`${API_URL}/api/coordinators`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      })
      if (resp.ok) {
        setLoading(false)
        toast.success('Coordinator Added Successfully');
      }
      else {
        setLoading(false)
        toast.error('Something Went Wrong');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something Went Wrong');
      setLoading(false)
    }
  }
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const deleteCoordinator = async (id) => {
    const yes = window.confirm('Are you sure you want to delete this coordinator?')
    if (!yes) {
      return
    }
    const resp = await fetch(`${API_URL}/api/coordinators/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (resp.ok) {
      console.log("Coordinator Deleted Successfully")
    } else {
      console.log("Something Went Wrong")
    }
  }

  return (
    <>
      <Layout>
        <div>
          <form>
            <div>
              <label htmlFor="">Name</label>
              <input type="text" name='name' value={formData.name} onChange={handleOnChange} />
            </div>
            <div>
              <label htmlFor="">Email</label>
              <input type="text" name='email' value={formData.email} onChange={handleOnChange} />
            </div>
            <div>
              <label htmlFor="">Mobile</label>
              <input type="text" name='mobile' value={formData.mobile} onChange={handleOnChange} />
            </div>
            <div>
              <label htmlFor="">Year</label>
              <input type="text" name='year' value={formData.year} onChange={handleOnChange} />
            </div>
            <div>
              <label htmlFor="">image</label>
              <input type="file" name='image' onChange={e => setImage(e.target.files[0])} />
            </div>
            <div>
              <label htmlFor="">Linkedin</label>
              <input type="text" name='linkedin' value={formData.linkedin} onChange={handleOnChange} />
            </div>
            <div>
              <label htmlFor="">Twitter</label>
              <input type="text" name='twitter' value={formData.twitter} onChange={handleOnChange} />
            </div>
            <div>
              <button type='submit' onClick={handleSubmit} className='bg-yellow-400 p-2 rounded-sm'>{loading ? 'Submitting...' : 'Submit'}</button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  return {
    props: { token: token }, // will be passed to the page component as props
  }
}