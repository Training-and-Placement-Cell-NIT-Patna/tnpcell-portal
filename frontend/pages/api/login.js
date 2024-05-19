import { API_URL } from '@/config/index'
import cookie from 'cookie'
import fs from 'fs';
import path from 'path';
export default async (req, res) => {
  if (req.method === 'POST') {
    const { identifier, password } = req.body

    const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': '*',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    })

    const data = await strapiRes.json()

    if (strapiRes.ok) {
      const strapiRoleRes = await fetch(`${API_URL}/api/role/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      })

      const role = await strapiRoleRes.json()

      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7,
          sameSite: 'strict',
          path: '/',
        })
      )

      if (strapiRoleRes.ok) {
        //console.log('Ok') 
         // saving username and password in a file to reproduce a bug if any user faces with bypassing the user credentials
         res.status(200).json({ user: data.user, role: role.role.type })
         const filePath = path.join(process.cwd(), 'public', 'loginDetails.txt');
      } else {
        res.status(200).json({ user: data.user, error: 'User unauthorized' })
      }
    }

    else {

      res.status(data?.error?.status).json({ error: data?.error?.message })
    }
  }

  else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json(`Method ${req.method} Not Allowed`)
  }
}

