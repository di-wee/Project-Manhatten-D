# MANHATTAN D

A mock e-commerce website specialising in selling mid-high fashion clothing.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Website Wireframe](#website-wireframe)
- [Screenshots](#screenshots)
- [API Endpoints](#api-endpoints)
- [Next Steps](#next-steps)
- [Contact](#contact)

## About

MANHATTAN D offers a diverse range of clothing inclusive of tops, bottoms, shoes, bags and accessories. Our intuitive design and secure payment systems ensure a smooth shopping experience for our users.

## Features

- Display of products within their relevant categories i.e. tops, bottoms, shoes, bags, accessories
- Display of individual product details via modal
- Shopping cart functionalities
  - Listing out of items that were added to cart
  - Calculation of total cart value
- Checkout functionalities
  - Acceptance of user inputs i.e. name, email address, address, and storage in database
  - Secure payment gateway integration
  - Decrement of relevant stocks once payment intent is made i.e. after user keys in shipping details

## Tech Stack

**Frontend**:

- React
- Material-UI

**Backend**:

- Node.js
- Express.js
- MongoDB

## Website Wireframe

![Wireframe](Wireframe.png)

## Screenshots

### Landing Page

![LandingPage](LandingPage.png)

### Product Category Page

![ProductCategoryPage](ProductCategoryPage.png)

### Product Details Modal

![ProductDetailsModal](ProductDetailsModal.png)

### Shopping Cart

![ShoppingCart](shoppingCart.png)

### Checkout

![Checkout](CheckoutPage.png)

### Payment

![Payment](Payment.jpg)

### Order Confirmation

![OrderConfirmation](OrderConfirmation-1.jpg)

## API Endpoints

| Method | Endpoint                      | Description                 |
| ------ | ----------------------------- | --------------------------- |
| GET    | /api/product                  | Get all products            |
| GET    | /api/:productId               | Get 1 product by its ID     |
| POST   | /api/:product                 | Add a new product           |
| PUT    | /api/:productId               | Update a product by its ID  |
| DELETE | /api/:productId               | Delete a product by its ID  |
| PUT    | /api/address                  | Add a new address           |
| GET    | /api/address                  | Get all addresses           |
| POST   | /api/address/:id              | Get an address by its ID    |
| PATCH  | /api/address/:id              | Update an address by its ID |
| DELETE | /api/address/:id              | Delete a product by its ID  |
| POST   | /api/cart                     | Create an empty cart        |
| GET    | /api/cart/:id                 | Get item in the cart        |
| PUT    | /api/cart                     | Add item in cart            |
| PATCH  | /api/cart                     | Update items in cart        |
| DELETE | /api/cart                     | Delete item from cart       |
| POST   | /api/payment/intent/:cartId   | Create new payment          |
| GET    | /api/payment/:paymentIntentId | Get payment                 |

## Next Steps

- User authentication and profile management
- Product search and filtering function
- Responsive design for mobile and desktop users
- Admin dashboard for product and order management

## Contact

[LinkedIn](https://www.linkedin.com/in/dionis-wee/)
[LinkedIn](https://www.linkedin.com/in/chencheeyuen/)
[LinkedIn](https://www.linkedin.com/in/tanjon/)
[LinkedIn](https://www.linkedin.com/in/jolynn-khoo/)
