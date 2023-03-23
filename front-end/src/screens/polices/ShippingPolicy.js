import React,{ useLayoutEffect} from 'react'

function ShippingPolicy() {
    useLayoutEffect(() => {
        window.scrollTo({top: 0, left: 0,});
      }, [])
    return (
        <div>
            <h1>Shipping policy</h1>
            <h2>Free Shipping </h2>

            Complimentary free shipping via Australia Post on all purchases. Once produced your parcel will be shipped out and delivery times will vary depending on your location from our design studio is located in Sydney, Australia. We currently offer Australia Post both domestically in Australia and internationally to the United States and the rest of the world.

            At Anime Town Creations we have helped trendy shoppers personalize and protect millions of consumer electronic devices with removable full-color skins, cases and sleeves. These items are custom made so please allow for 1-3 days production and processing time. A shipping confirmation will be automatically emailed once your order has been processed.

            Shipping Estimates:

            Domestic shipping estimate:
            Standard: 2-8 business days
            Standard (tracked): 2-6 business days
            Express: 1-4 business days
            International shipping estimate:
            International Standard: 10-25 business days
            International Standard (tracked): 10-20 business days
            International Express: 5-12 business days
            Tracking Information:

            Please kindly note that our complimentary shipping option does not come with available tracking, this is so that we can continue to offer our products to our fans at the most competitive price.
            If you have upgraded your shipping to tracked parcel post, relevant tracking information will be added to your order status page within 48 hours of shipping.
        </div>
    )
}
export default ShippingPolicy     

