import express, { Request, Response } from 'express';
import { readAllFromFile } from '../utils/fileSystem';
import { dbNames } from '../utils/tools';


const router = express.Router()

//route /users/
router.route('/')
  .get(async (req: Request, res: Response) => {
    try {
       const data = await readAllFromFile(dbNames.USERS)
      res.json(data)
    } catch (error: any) {
      console.error('Error getting users:', error.message);
      res.status(400).json({ error: error.message });
    }
  });

export default router;