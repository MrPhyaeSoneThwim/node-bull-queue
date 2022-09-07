const Queue = require("bull");

const migrateQueue = new Queue("access cameras migration", {
  redis: { port: 6379, host: "127.0.0.1", password: "admin@root" },
});

migrateQueue.process(async function (job, done) {
  const { camera, userId } = job.data;

  const accessCamera = await strapi.entityService.findMany(
    "api::access-camera.access-camera",
    {
      filters: {
        $and: [
          {
            user: userId,
          },
          {
            camera: camera.id,
          },
        ],
      },
    }
  );
  if (accessCamera.length > 0) {
    let result = await strapi.entityService.update(
      "api::access-camera.access-camera",
      existingAccessCamera[0].id,
      {
        data: {
          user: userId,
          camera: camera.id,
          expiredDate: null,
        },
      }
    );
    done(null, { result });
  } else {
    let result = await strapi.entityService.create(
      "api::access-camera.access-camera",
      {
        data: {
          user: userId,
          camera: camera.id,
          expiredDate: null,
        },
      }
    );

    done(null, { result });
  }
});

const createAccessCamera = (camera) => {
  migrateQueue.add(camera);
};

module.exports = {
  createAccessCamera,
};
