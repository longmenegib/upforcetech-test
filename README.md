#Upforcetech test
BLog management using the mern stack

#Prerequisites
Node.js
MongoDB
Any other dependencies specific to your project

Getting Started
Provide step-by-step instructions to help users set up and run your project locally. You can include the following sections:

#Clone the repository:

git clone https://github.com/longmenegib/upforcetech-test/

#Backend

Change to the backend directory:

cd backend

Install the required dependencies:

npm install --ignore-engines or yarn install --ignore-engines

Create a .env file in the root of the backend directory and add the necessary environment variables, such as database connection details, API keys, etc.

MONGODB_URI = mongodb+srv://gib:lL2oXxsuPxc45Z7W@test.tx02zbx.mongodb.net/?retryWrites=true&w=majority

PORT = 4000

Start the backend server:

npm start or yarn start

The server should start running on a specified port (e.g., http://localhost:4000).

#Frontend
Change to the frontend directory:

cd frontend

Install the required dependencies:

npm install or yarn install
In the project's source code, you may need to configure the API endpoint to match the backend server's URL (for local by default it is: http://localhost:4000). YOu can change it in frontend/src/urls/Api_url.js


Start the frontend development server:

npm start or yarn start
The development server should start running, and you can access the app in your web browser at http://localhost:3000.
