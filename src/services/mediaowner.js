const ERROR_CODES = require("../constant/error-messages");
const CustomError = require("../utils/error");
const { MediaOwner, Sequelize, MediaLibrary } = require("../../models");

class MediaOwnerService {
  static async create(params) {
    let _existingData = await MediaOwner.findOne({
      where: { title: params.title },
      raw: true,
    });
    if (_existingData) {
      throw new CustomError(ERROR_CODES.ALREADY_EXISTS);
    }
    
    let data = await MediaOwner.create({
      title: params.title,
      description: params.description,
      about: params.about
    });
    return data;
  }

  static async getAll() {
    const _data = await MediaOwner.findAll({
      include: [
        {
          model: MediaLibrary,
          as: 'MediaLibrary'
        }
      ]
    });    
    return _data;
  }

  static async get(params) {    
    let rowData = await MediaOwner.findOne({
      where: { id: params.id },
      include: [{
          model: MediaLibrary,
          as: 'MediaLibrary'
      }]
    });
    if ( rowData == null ) {
      throw new CustomError(ERROR_CODES.NOT_FOUND);
    }
    return rowData;
  }

  static async update(params) {
    let data = await MediaOwner.update(params, {
        where: {
            id: params.id
        }
    });

    if (data[0] === 0) {
      throw new CustomError(ERROR_CODES.NOT_FOUND);
    }

    let rowData = await MediaOwner.findOne({
      where: { id: params.id },
      raw: true,
    });
    return rowData;
  }

  static async delete(params) {
    let data = await MediaOwner.destroy({
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
module.exports = { MediaOwnerService };
