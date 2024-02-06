const ERROR_CODES = require("../constant/error-messages");
const CustomError = require("../utils/error");
const {MediaOwner, Sequelize, MediaLibrary } = require("../../models");
const { Op } = require("@sequelize/core");

class MediaLibraryService {
  static async create(params) {
    const _existingData = await MediaLibrary.findOne({
      where: { title: params.title },
      raw: true,
    });
    if (_existingData) {
      throw new CustomError(ERROR_CODES.ALREADY_EXISTS);
    }
    
    let data = await MediaLibrary.create({
        mediaOwnerId:params.mediaOwnerId,
        title: params.title,
        description: params.description,
        type: params.type,
        resource: params.resource,
        parentId: params.parentId,
        identifierType: params.identifierType,
        identifier: params.identifier,
        thumbnail: params.thumbnail,
        collection: params.collection
    });
    return data;
  }

  static async getAll() {
    const _data = await MediaLibrary.findAll({
      include: [
        {
          model: MediaOwner,
          as: 'MediaOwner',
          id: Sequelize.col('mediaOwnerId')
        }
      ]
    });    
    return _data;
  }

  static async get(params) {    
    let rowData = await MediaLibrary.findOne({
      where: { id: params.id },
      include: [
        {
          model: MediaOwner,
          as: 'MediaOwner',
          id: Sequelize.col('mediaOwnerId')
        }
      ]
    });
    if ( rowData == null ) {
      throw new CustomError(ERROR_CODES.NOT_FOUND);
    }
    return rowData;
  }

  static async update(params) {
    let _existingData = await MediaLibrary.findOne({
      where: { title: params.title, id: { [Op.ne]: params.id }, mediaOwnerId: params.mediaOwnerId },
      raw: true,
    });
    if (_existingData) {
      throw new CustomError(ERROR_CODES.ALREADY_EXISTS);
    }

    let data = await MediaLibrary.update(params, {
        where: {
            id: params.id
        }
    });

    if (data[0] === 0) {
      throw new CustomError(ERROR_CODES.NOT_FOUND);
    }

    let rowData = await MediaLibrary.findOne({
      where: { id: params.id },
      raw: true,
    });
    return rowData;
  }

  static async delete(params) {
    let data = await MediaLibrary.destroy({
        where: {
            id: params.id
        }
    });
    if (data === 0) {
      throw new CustomError(ERROR_CODES.NOT_FOUND);
    }
    return true;
  }

}
module.exports = { MediaLibraryService };
