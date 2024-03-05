import express, { Request, Response } from 'express';
import { addToFile, editItemFromFile, readAllFromFile, removeFromFileById } from '../utils/fileSystem';
import { dbNames } from '../utils/tools';


const router = express.Router()

//route /posts/
router.route('/')
  .post(async (req: Request, res: Response) => {
    try {
        addToFile(req.body, dbNames.POSTS)
        res.send({post: req.body})
    } catch (error: any) {
      console.error('Error posting:', error.message);
      res.status(400).json({ error: error.message });
    }
  })
  .get(async (req: Request, res: Response) => {
    try {
       const data = await readAllFromFile(dbNames.POSTS)
      res.json(data)
    } catch (error: any) {
      console.error('Error getting posts:', error.message);
      res.status(400).json({ error: error.message });
    }
  });

//route /post/:id
router.route('/:id')
  .put(async (req: Request, res: Response) => {
    try{
        const itemId = parseInt(req.params.id);
        editItemFromFile(req.body, itemId, dbNames.POSTS)
        res.status(200).json({ message: 'Item Edited successfully' });
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }

  })
  .delete(async (req: Request, res: Response) => {
    const itemId = parseInt(req.params.id);
    try {
        removeFromFileById(itemId, dbNames.POSTS)
        res.status(200).json({ message: 'Item deleted successfully' });

    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }

  });



export default router;