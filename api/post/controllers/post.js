"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);

      if (!data || !data.description) {
        ctx.throw(400, "Please add description");
      }

      if (!files || !files.image) {
        ctx.throw(400, "Please add an image");
      }

      entity = await strapi.services.post.create(
        { ...data, likes: 0 },
        { files }
      );
    } else {
      ctx.throw(400, "Please submit required form data");
    }
    return sanitizeEntity(entity, { model: strapi.models.post });
  },
};
