const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO checked if logged in

    const item = ctx.db.mutation.createItem({
      data: {
        ...args
      }
    }, info);
    return item;
  },
  updateItem(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;

    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // find item
    const item = await ctx.db.query.item({ where }, `{ id title }`);
    //  TODO check if user owns item or has permission to delete it
    // delete it
    return ctx.db.mutation.deleteItem({ where }, info);
  },
};

module.exports = Mutations;
