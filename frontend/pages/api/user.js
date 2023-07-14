import { API_URL } from '@/config/index'
import cookie from 'cookie'

export default async (req, res) => {
  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' })
      return
    }

    const { token } = cookie.parse(req.headers.cookie)
    const strapiRes = await fetch(`${API_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const user = await strapiRes.json()

    if (strapiRes.ok) {
      const strapiRoleRes = await fetch(`${API_URL}/api/role/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const role = await strapiRoleRes.json()

      if (strapiRoleRes.ok) {
        res.status(200).json({ user: user, role: role.role.type })
      } else {
        res.status(403).json({ user: user, error: 'User unauthorized' })
      }
    } else {
      res.status(403).json({ message: 'User forbidden' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
