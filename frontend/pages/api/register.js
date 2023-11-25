import { API_URL } from '@/config/index'
import cookie from 'cookie'

export default async (req, res) => {
  if (req.method === 'POST') {
    // console.log('ok')
    const { username, email, password } = req.body

    const strapiRes = await fetch(`${API_URL}/api/student/register-student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })


    try {
      const data = await strapiRes.json()
      console.log('data', data)
      if (strapiRes.ok) {
        //console.log('Ok');
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', data.token, {
            httpOnly: true,
            //secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60,
          })
        )
        res.statusCode = 200
        res.end(
          JSON.stringify({
            message: 'Successfully registered',
          })
        )
      } else {
        res.statusCode = 400
        res.end(
          JSON.stringify({
            message: data.error,
          })
        )
      }
    } catch (err) {
      console.log('err: ', err)
      res.statusCode = 500
      res.end(
        JSON.stringify({
          message: 'Something went wrong',
        })
      )
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json(`Method ${req.method} Not Allowed`)
  }
}
