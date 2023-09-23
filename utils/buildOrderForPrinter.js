const greekUtils = require("greek-utils");

const buildOrderForPrinter = (orderMessage) => {
  const order = JSON.parse(orderMessage);

  let formattedOrder = "";

  formattedOrder += "TACO MAZAMA\n";
  formattedOrder += "-------------\n\n";

  formattedOrder += `TRAPEZI No: ${greekUtils.toGreeklish(order.tableNo)}\n\n`;

  // Dishes
  if (order.dish && order.dish.length > 0) {
    formattedOrder += "PIATA:\n-------\n";
    for (const dish of order.dish) {
      formattedOrder += `${dish.multiplier}x\n`;
      formattedOrder += `${greekUtils.toGreeklish(dish.title).toUpperCase()}\n`;
      if (dish.stuffing)
        formattedOrder += `${greekUtils.toGreeklish(
          dish.stuffing.join(", ")
        )}\n`;
      if (dish.ingredients)
        formattedOrder += `${greekUtils.toGreeklish(
          dish.ingredients.join(", ")
        )}\n`;
      if (dish.salsa)
        formattedOrder += `${greekUtils.toGreeklish(dish.salsa.join(", "))}\n`;
      if (dish.extra)
        formattedOrder += `Extras: ${greekUtils.toGreeklish(
          dish.extra.join(", ")
        )}\n`;
      if (dish.comments)
        formattedOrder += `Comments: ${greekUtils.toGreeklish(
          dish.comments.join(", ")
        )}\n\n`;
    }
  }

  // Sides
  if (order.sides && order.sides.length > 0) {
    formattedOrder += "\nSYNODEUTIKA:\n------\n";
    for (const side of order.sides) {
      formattedOrder += `${side.multiplier}x\n`;
      formattedOrder += `${greekUtils.toGreeklish(side.title).toUpperCase()}\n`;
      if (side.comments)
        formattedOrder += `Comments: ${greekUtils.toGreeklish(
          side.comments.join(", ")
        )}\n\n`;
    }
  }

  // Beverages
  if (order.beverages && order.beverages.length > 0) {
    formattedOrder += "\nPOTA:\n----------\n";
    for (const beverage of order.beverages) {
      formattedOrder += `${beverage.multiplier}x\n`;
      formattedOrder += `${greekUtils
        .toGreeklish(beverage.title)
        .toUpperCase()}\n`;
      if (beverage.comments)
        formattedOrder += `Comments: ${greekUtils.toGreeklish(
          beverage.comments.join(", ")
        )}\n\n`;
    }
  }

  // Total Price
  if (order.price) {
    formattedOrder += `\n\nTotal Price: ${order.price} EURO\n`;
  }

  return formattedOrder;
};

module.exports = buildOrderForPrinter;
