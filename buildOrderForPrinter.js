const buildOrderForPrinter = (orderMessage) => {
  const order = JSON.parse(orderMessage);
  let formattedOrder = "";

  formattedOrder += "TACO MAZAMA\n";
  formattedOrder += "-------------\n\n";

  formattedOrder += `TRAPEZI No: ${tableNo}\n\n`;

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
      if (dish.extras) formattedOrder += `Extras: ${dish.extras.join(", ")}\n`;
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
      if (sides.comments)
        formattedOrder += `Comments: ${sides.comments.join(", ")}\n\n`;
    }
  }

  // Beverages
  if (order.beverages && order.beverages.length > 0) {
    formattedOrder += "Beverages:\n----------\n";
    for (const beverage of order.beverages) {
      formattedOrder += `${beverage.title.toUpperCase()}\n`;
      formattedOrder += `Quantity: X${beverage.multiplier}\n`;
      if (beverages.comments)
        formattedOrder += `Comments: ${beverages.comments.join(", ")}\n\n`;
    }
  }

  // Total Price
  if (order.price) {
    formattedOrder += `Total Price: €${order.price}\n`;
  }

  return formattedOrder;
};

module.exports = buildOrderForPrinter;