# MANHATTAN D

A mock e-commerce website specialising in selling mid-high fashion clothing.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Website Wireframe](#website-wireframe)
- [Screenshots](#screenshots)
- [API Endpoints](#api-endpoints)
- [Next Steps](#next-steps)
- [Contact](#contact)

## About

MANHATTAN D offers a diverse range of clothing inclusive of tops, bottoms, shoes, bags and accessories. Our intuitive design and secure payment systems ensure a smooth shopping experience for our users.
Click here for the deployment link: (https://manhattan-d.onrender.com/)

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

**Front-end:** 
React

**Back-end:** 
Node.js, Express.js

**UI Components:** 
Material UI

**Payment:** 
Stripe.js

**Routing:**
React Router

**Database:**
MongoDB

## Installation

1. Clone the Repository

```
Copy code
git clone https://github.com/di-wee/Project-Manhatten-D.git
cd Project-Manhatten-D
```

2. Backend Setup
Navigate to the backend directory:

```
Copy code
cd Backend
```

Install the required npm packages:
```
npm init -y
npm i express mongoose dotenv stripe
```

3. Frontend Setup
Navigate to the frontend directory: React

```
Copy code
cd React
```

Install the required npm packages:

```
Copy code
npm install react-router-dom
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install stripe

```
4. Environment Variables
Create a .env file in the root of your backend directory and fill in the required variables, for instance:

```
Copy code
DB_CONNECTION_STRING=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Replace placeholders like your_mongodb_connection_string with the actual details.

5. Starting the Application

Backend:

From the backend directory, run:

```
Copy code
npm run dev
```
By default, the backend might run on http://localhost:5000 unless you've set it up differently.

Frontend:

From the frontend directory, run:

```
Copy code
npm run dev
```
By default, this will start the React development server, typically on http://localhost:3000.

## Website Wireframe

<img width="756" alt="Wireframe" src="https://github.com/di-wee/Project-Manhatten-D/assets/126299115/c8784613-5ab9-4ea7-9870-9346d3f3230e">

## Screenshots

### Landing Page

<img width="1428" alt="LandingPage" src="https://github.com/di-wee/Project-Manhatten-D/assets/126299115/2180d38b-05ab-4bf9-ba38-4952c55840dc">

### Product Category Page

<img width="1430" alt="ProductCategoryPage" src="https://github.com/di-wee/Project-Manhatten-D/assets/126299115/0df69e91-2e56-4f7c-86fa-c61ade52b43d">

### Product Details Modal

<img width="1429" alt="ProductDetailsModal" src="https://github.com/di-wee/Project-Manhatten-D/assets/126299115/9a5c8dee-918d-432a-8c73-e425e955e7ee">

### Shopping Cart

![shoppingCart](https://github.com/di-wee/Project-Manhatten-D/assets/126299115/9d14f580-e9ed-4d45-a58e-45c940993845)

### Checkout

<img width="1431" alt="CheckoutPage" src="https://github.com/di-wee/Project-Manhatten-D/assets/126299115/4a393513-b178-4421-86ac-792ba4967b33">

### Payment

![Payment](https://github.com/di-wee/Project-Manhatten-D/assets/126299115/9696cd5e-ca36-46e4-a017-9afb0056b1a8)

### Order Confirmation

![OrderConfirmation](https://github.com/di-wee/Project-Manhatten-D/assets/126299115/d4f602e3-d7f4-4e0e-b92a-4e4a4d8812ad)

### FAQ

<img width="1432" alt="FAQ" src="https://github.com/di-wee/Project-Manhatten-D/assets/126299115/8c8508df-34ad-4cae-9b13-be7d224aeb19">

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
