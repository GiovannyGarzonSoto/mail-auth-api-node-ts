import usersRoutes from './usersRoutes'

import {Router} from 'express'

const router: Router = Router()

router.use('/auth', usersRoutes)

export default router