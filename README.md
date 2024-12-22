# DrugStoreUI
DrugStoreUI is a simple drug management system build using the Angular as Frontend, FastAPI as the Backend and MongoDB as the Database.It lets you add,view,update,delete and bulk upload drug information via a UI.

## Requirements

Python Version:`3.9.0`
Node.js Version:`v22.12.0`
MongoDB Compass Version:`1.45.0`

## Setting Up the DataBase

Install `MongoDB Compass`.
Setup a connection with `drugdb` as database name and `drugcoll` as collection name.
Now connect it and copy the connection string.
And paste the copied connection string on the `MONGODB_URI` inside `DoubleQuotes`.

## Installation of Required Packages and Activating Virtual Environment

Angular CLI - for installing Angular CLI open Terminal and type `npm install -g @angular/cli`.
FastAPI - for installing FastAPI open Terminal and type `pip install fastapi`.
After the installation of Angular CLI and FastAPI for Activating the Virtual Environment go to the backend folder inside the DrugStoreUI folder and open the Terminal and type `.\venv\Scripts\Activate` which activates the Virtual Environment.
After that take the backend folder and open the terminal and type `pip install -r requirements.txt` to install the required packages for the working of Backend.
And for the installation of frontend packages open the frontend folder in a terminal and type `npm install`.

## Running the Application

### Backend(FastAPI)

After activating the virtual environment and installing the required packages,Go to the Backend folder in the Terminal and run the command `uvicorn main:app --reload` to start the server.
This will start the backend server at `http://127.0.0.1:8000`.

### Frontend(Angular)

After installing the required packages in the Frontend folder , Go to the Frontend folder in the terminal and run the command `ng serve -o` to start the Angular Development Server.
This will start and open the frontend Application at `http://localhost:4200`.

From there u can use the application.