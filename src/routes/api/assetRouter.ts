import { Router } from "express";
import { createAsset, deleteAsset, findAllAsset, updateAsset, findAssetById, findAssetBySection } from "../../controllers/assetController";
import { upload } from "../../lib/multerConfig";


const routerAsset = Router()

routerAsset.route('/')
  .get(findAllAsset)
  .post(upload.single('file'),createAsset)

routerAsset.route('/:id')
  .get(findAssetById)
  .put(upload.single('file'),updateAsset)
  .delete(deleteAsset)

routerAsset.route('/section/:id')
  .get(findAssetBySection)

export default routerAsset
