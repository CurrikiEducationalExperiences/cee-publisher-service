const {CeeManifest} = require("../../models");
const {Cee} = require("../../models");
const {CeeWorkflow} = require("../../models");
const {CeeCreator} = require("../../models");
const {CeeMedia} = require("../../models");
const {Media} = require("../../models");
const {MediaRoyalty} = require("../../models");
const {StoreService} = require("../../models");
const {Service} = require("../../models");
const {ManifestJsonldService} = require("./manifest-jsonld");

class CeeManifestService {
    static async create(req) {
        try {
            const payload = req.body;
            const ceeId = payload.ceeId;
            const previewCeeSubscription = payload.previewCeeSubscription;
            const licensedCeeSubscription = payload.licensedCeeSubscription;
            const client = req.Client;

            // get StoreService model by publisherClientId attribute where publisherClientId is the client's id
            const storeService = await StoreService.findOne({ where: { publisherClientId: client.id } });
            // get first record from Service model
            const publisherService = await Service.findOne();
        
            // get Cee by ceeId along with its associated models like CeeWorkflow, CeeCreator and CeeMedia

            const cee = await Cee.findByPk(ceeId, {
                include: [
                    {
                        model: CeeCreator
                    },
                    {
                        model: CeeWorkflow,
                        include: [
                            {
                                model: CeeMedia,
                                include: [
                                    {
                                        model: Media,
                                        include: [
                                            {
                                                model: MediaRoyalty
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });

            // Making Prewview Manifest
            const ceeManifestPreview = await CeeManifest.create({
                ceeId: cee.id,
                type: 'preview',
                subscriptionId: previewCeeSubscription.id,
                storeId: storeService.id
            });
            const previewManifest = await ManifestJsonldService.get(cee, ceeManifestPreview.id, previewCeeSubscription, storeService, publisherService);
            // update manifest attribute of ceeManifestPreview with previewManifest
            await ceeManifestPreview.update({ manifest: previewManifest });

            // Making Licensed Manifest
            const ceeManifestLicensed = await CeeManifest.create({
                ceeId: cee.id,
                type: 'licensed',
                subscriptionId: licensedCeeSubscription.id,
                storeId: storeService.id
            });
            const licensedManifest = await ManifestJsonldService.get(cee, ceeManifestLicensed.id, licensedCeeSubscription, storeService, publisherService);
            // update manifest attribute of ceeManifestLicensed with licensedManifest
            await ceeManifestLicensed.update({ manifest: licensedManifest });
            
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { CeeManifestService }