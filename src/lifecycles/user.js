const _ = require("lodash");
const { createAccessCamera } = require("../queue/migrate-queue");

const migrateAccessCameras = async (userId) => {
  // await Promise.all(
  //   _.map(cameras, async (camera) => {
  //     let { id } = camera;
  //     const existingAccessCamera = await strapi.entityService.findMany(
  //       "api::access-camera.access-camera",
  //       {
  //         filters: {
  //           $and: [
  //             {
  //               user: userId,
  //             },
  //             {
  //               camera: id,
  //             },
  //           ],
  //         },
  //       }
  //     );
  //     if (existingAccessCamera.length > 0) {
  //       await strapi.entityService.update(
  //         "api::access-camera.access-camera",
  //         existingAccessCamera[0].id,
  //         {
  //           data: {
  //             camera: id,
  //             user: userId,
  //             expiredDate: null,
  //           },
  //         }
  //       );
  //     } else {
  //       await strapi.entityService.create("api::access-camera.access-camera", {
  //         data: {
  //           camera: id,
  //           user: userId,
  //           expiredDate: null,
  //         },
  //       });
  //     }
  //   })
  // );
};

module.exports = {
  models: ["plugin::users-permissions.user"],
  async afterCreate(event) {
    const cameras = await strapi.entityService.findMany("api::camera.camera");
    let result = await Promise.all(
      _.map(cameras, async (camera) => {
        let created = await createAccessCamera({
          camera: camera,
          userId: event.result.id,
        });

        console.log(created);
        return created;
      })
    );

    console.log(result);
  },
};
