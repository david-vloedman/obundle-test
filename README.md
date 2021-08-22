# oBundle Assessment

## Deployment
The current deployment of this theme can be found [here](https://obundle-test6.mybigcommerce.com/) and the preview code is "v6rj1zgrvz".

## Features added
### Thumbnail Image Hover on Category Page
Changes were made to the responsive image component to include a source URL for the second image of the product. This was not ideal as the changes are now baked into the responsive image component, however, I wanted to utilize the responsive nature of the component. 

I considered creating two image elements in the HTML as the second image needs to be fetched after hovering, sometimes causing a slight delay in the image changing. I decided that ultimately, it was not worth pursuing.
### Add All Items Button
An "add all items" button was added to the category template, which adds all products visible on the screen and within the current category to the cart.

A new JS module called cart-utils was created for the fetch requests to the storefront cart API . I pulled these functions from the big commerce documentation.

When the "add all items" button is clicked a check to see if an cart exists is performed. If the cart does exist it will add items to it and if it does not exist a cart will be made and items added to it.

The items are added in a single POST request to the storefront API by passing an array of line items in the request body. The product ids are pulled from the "data-product-id" attribute on the product card component.

Upon testing the add all items button, I noticed that some of the sample items in the theme require an additional 'variantId'. The variant id corresponding to specific options such a color of a product. Given the additional user intervention of selecting options, I choose not to add these items to the cart via the add all items button, instead showing an alert to notify the user that the items cannot be added this way.
### Remove All Items from Cart Button
A "remove all items" button was added to the category template and only appears when items are in the cart.

This button, like the "add all items" button, utilizes the new cart-utils module to make requests to the storefront API.

I initially wanted handlebars to handle the conditional rendering of the 'remove all items' button by bringing the stencil cart object into the category template via front matter. When I tried to do this the stencil object did not seem to immediately reflect changes to the cart. While the cart component in the top right updated immediately, the stencil object would take a few refreshes to acknowledge the changes to the cart.

In light of this I decided to use jQuery and a default hidden button. This is not ideal as the button will appear after the initial rendering of the page. 
### Button Action Confirmation Alerts
When looking through the theme I noticed "sweet-alert" is used for displaying messages to the user and decided to use it for consistency. 

A confirmation for removing all items from cart was added. When the action is confirmed the fetch request takes place, when the request is done an alert is fired indicating whether or not the request was successful.

A success/error alert was added for adding all items to the cart. If one of the items attempting to be added requires addition options to be selected, a message is displayed saying so and the items are not added. If all items were successfully added to the cart, an alert fires indicating success.
 
### Current Logged in Customer Details
A banner on the category template will now display the name, email and, if present, phone number. If there is no customer currently logged in the banner will not display.

I achieved this by bringing the customer stencil object into the category template and utilizing handlebars for conditional rendering.


