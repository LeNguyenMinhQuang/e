const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const checkout = async (req, res) => {
    const { itemList, userId } = req.body;

    const findImage = (color, item) => {
        let prod = item.product.image.filter((select) => select.color == color);
        return prod;
    };

    let line_items = itemList.map((item) => {
        let images = [`${findImage(item.color, item)[0].url}`];
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.product.name,
                    images,
                    metadata: {
                        id: item.product._id,
                    },
                },
                unit_amount: `${item.product.price}00`,
            },
            quantity: item.quantity,
        };
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
            allowed_countries: ["VN"],
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: 0,
                        currency: "usd",
                    },
                    display_name: "Free shipping",
                    // Delivers between 5-7 business days
                    delivery_estimate: {
                        minimum: {
                            unit: "business_day",
                            value: 5,
                        },
                        maximum: {
                            unit: "business_day",
                            value: 7,
                        },
                    },
                },
            },
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: 1500,
                        currency: "usd",
                    },
                    display_name: "Next day air",
                    // Delivers in exactly 1 business day
                    delivery_estimate: {
                        minimum: {
                            unit: "business_day",
                            value: 1,
                        },
                        maximum: {
                            unit: "business_day",
                            value: 1,
                        },
                    },
                },
            },
        ],
        phone_number_collection: {
            enabled: true,
        },
        line_items,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}`,
    });

    res.status(303).json({ success: true, url: session.url });
};

module.exports = {
    checkout,
};
