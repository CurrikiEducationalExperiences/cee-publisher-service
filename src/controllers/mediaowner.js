const { MediaOwnerService } = require("../services/mediaowner");
const { responseHandler } = require("../utils/response");
class MediaOwnerController {
  static async create(req, res, next) {
    try {
      const result = await MediaOwnerService.create(req.body);
      return responseHandler({
        response: res,
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const result = await MediaOwnerService.getAll();
      return res.status(200).json({
          success: true,
          count: result.length,
          result: result
      })
    } catch (error) {
      next(error);
    }
  }
  
  static async get(req, res, next) {
    try {
      const result = await MediaOwnerService.get(req.query);
      return responseHandler({
        response: res,
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const result = await MediaOwnerService.update(req.body);
      return responseHandler({
        response: res,
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const result = await MediaOwnerService.delete(req.query);
      return responseHandler({
        response: res,
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  
}

module.exports = { MediaOwnerController };
