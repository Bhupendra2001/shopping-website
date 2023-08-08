const stripe = require('stripe')


const Payment = async (req, res)=>{

    stripe.charges.create(
     {
    source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
      }
      ,

    (stripeErr, stripeRes) => {
        if (stripeErr) {
          res.status(500).json(stripeErr);
        } else {
          res.status(200).json(stripeRes);
        }
      }
    );
}

module.exports ={ Payment}