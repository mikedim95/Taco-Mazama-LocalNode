const greekUtils = require("greek-utils");

const buildOrderForPrinter = (orderMessage) => {
  const order2 = JSON.parse(orderMessage);
  const order = order2.order;
  console.log(order);
  let formattedOrder = "";

  formattedOrder += "TACO MAZAMA\n";
  formattedOrder += "-------------\n\n";

  formattedOrder += `TRAPEZI No: ${greekUtils.toGreeklish(order.tableNo)}\n\n`;

  // Dishes
  if (order.dish && order.dish.length > 0) {
    formattedOrder += "PIATA:\n-------\n";
    for (const dish of order.dish) {
      formattedOrder += `${dish.multiplier}x\n`;
      formattedOrder += `${dish.size}\n`;
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
  formattedOrder += "\nPOTA:\n----------\n";
  if (order.beverages) {
    if (order.beverages.beers && order.beverages.beers.length > 0) {
      for (const beer of order.beverages.beers) {
        formattedOrder += `${beer.multiplier}x\n`;
        formattedOrder += `${greekUtils
          .toGreeklish(beer.title)
          .toUpperCase()}\n`;
      }
    }

    if (order.beverages.drinks && order.beverages.drinks.length > 0) {
      for (const drink of order.beverages.drinks) {
        formattedOrder += `${drink.multiplier}x\n`;
        formattedOrder += `${greekUtils
          .toGreeklish(drink.title)
          .toUpperCase()}\n`;
      }
    }

    if (order.beverages.softDrinks && order.beverages.softDrinks.length > 0) {
      for (const softDrink of order.beverages.softDrinks) {
        formattedOrder += `${softDrink.multiplier}x\n`;
        formattedOrder += `${greekUtils
          .toGreeklish(softDrink.title)
          .toUpperCase()}\n\n`;
      }
    }
  }

  // Total Price
  if (order.price) {
    formattedOrder += `\n\nTotal Price: ${order.price} EURO\n`;
  }
  /* console.log(formattedOrder); */
  return formattedOrder;
};

module.exports = buildOrderForPrinter;
