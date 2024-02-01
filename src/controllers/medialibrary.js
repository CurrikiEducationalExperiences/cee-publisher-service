const { MediaLibraryService } = require("../services/medialibrary");
const { responseHandler } = require("../utils/response");
class MediaLibraryController {
  static async create(req, res, next) {
    try {
      const result = await MediaLibraryService.create(req.body);
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
      const result = await MediaLibraryService.getAll();
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
      const result = await MediaLibraryService.get(req.query);
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
      const result = await MediaLibraryService.update(req.body);
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
      const result = await MediaLibraryService.delete(req.query);
      return responseHandler({
        response: res,
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  
}

module.exports = { MediaLibraryController };
