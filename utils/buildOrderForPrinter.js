const buildOrderForPrinter = (orderMessage) => {
  const order2 = JSON.parse(orderMessage);
  const order = order2.order;
  let formattedOrder = "";

  formattedOrder += "TACO MAZAMA\n";
  formattedOrder += "-------------\n\n";

  formattedOrder += `TRAPEZI No: ${order.tableNo}\n\n`;

  // Dishes
  if (order.dish && order.dish.length > 0) {
    formattedOrder += "Dishes:\n-------\n";
    for (const dish of order.dish) {
      formattedOrder += `${dish.title.toUpperCase()}\n`;
      if (dish.stuffing)
        formattedOrder += `Stuffing: ${dish.stuffing.join(", ")}\n`;
      if (dish.ingredients)
        formattedOrder += `Ingredients: ${dish.ingredients.join(", ")}\n`;
      if (dish.salsa) formattedOrder += `Salsa: ${dish.salsa.join(", ")}\n`;
      if (dish.extra) formattedOrder += `Extras: ${dish.extra.join(", ")}\n`;
      formattedOrder += `Quantity: X${dish.multiplier}\n`;
      if (dish.comments)
        formattedOrder += `Comments: ${dish.comments.join(", ")}\n\n`;
    }
  }

  // Sides
  if (order.sides && order.sides.length > 0) {
    formattedOrder += "Sides:\n------\n";
    for (const side of order.sides) {
      formattedOrder += `${side.title.toUpperCase()}\n`;
      formattedOrder += `Quantity: X${side.multiplier}\n`;
      if (order.sides.comments)
        formattedOrder += `Comments: ${sides.comments.join(", ")}\n\n`;
    }
  }

  // Beverages
  if (order.beverages && order.beverages.length > 0) {
    formattedOrder += "Beverages:\n----------\n";
    for (const beverage of order.beverages) {
      formattedOrder += `${beverage.title.toUpperCase()}\n`;
      formattedOrder += `Quantity: X${beverage.multiplier}\n`;
      if (order.beverages.comments)
        formattedOrder += `Comments: ${beverages.comments.join(", ")}\n\n`;
    }
  }

  /*   // Total Price (bold)
  if (order.price) {
    formattedOrder += `\x1b[1mTotal Price: €${order.price}\x1b[0m\n`; // Apply bold formatting */

  // Total Price
  if (order.price) {
    formattedOrder += `Total Price: \u20AC${order.price}\n`;
  }

  return formattedOrder;
};

module.exports = buildOrderForPrinter;
