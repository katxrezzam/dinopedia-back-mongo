import { Router } from "express";
import { createAsset, deleteAsset, findAllAsset, updateAsset, findAssetById, findAssetBySection } from "../../controllers/assetController";


const routerAsset = Router()

routerAsset.route('/')
  .get(findAllAsset)
  .post(createAsset)

routerAsset.route('/:id')
  .get(findAssetById)
  .put(updateAsset)
  .delete(deleteAsset)

routerAsset.route('/section/:id')
  .get(findAssetBySection)

export default routerAsset
