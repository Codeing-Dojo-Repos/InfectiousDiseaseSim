# TODO

## Create MongoDB Schema
1. [x] create new template project
1. [x] create DB schema
1. [x] create db name in config

## Write Controller to 
1. [x] create entry for location
2. [x] read all entries
3. [x] update entry for by user name
4. [x] delete entry for a user
5. [x] node server.js work?

## Write Postman req to hit controller endpoints
1. [x] create location
1. [x] delete location
1. [x] get all 
1. [x] get one
1. [x] update

## Write location page that queries
1. [x] queries location 
2. [x] writes the location in the database for the user
3. route for location page should have :_id in route

## Create page to register as a user
1. [x] create post axios request to create new user to database
2. [x] write their initial position
3. [ ] username should be lifted state and used in every component

## Set Express to listen on https
1. [ ] Create cert/pem file with open ssl
1. [ ] Read into express https server

## Create Dashboard component
1. [x] On dashboard, query current position
2. [x] print the position to the dashboard

## On Dashboard query all users
1. [ ] Query all users and put in a large State array
2. [ ] Write js algo to cal calculate the distance between user and all users

## Write js algorithm to calculate distance
1. [ ] filter the list to remove the current user
1. [ ] calculate distance between one user and all users in the list

## Create All Users component
1. [x] Query all users and print their locations in the table
2. [x] Add link to delete a user
3. [ ] Add link to update a user
