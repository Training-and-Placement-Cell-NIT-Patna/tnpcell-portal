/*
 * @ref: https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/optional/api.html
 *
 * Setting maxLimit to a very high value (maybe -1 would also work, but not interested in testing that on production :)
 */


module.exports = {
  rest: {
    defaultLimit: 99999,
    maxLimit: 99999,
    withCount: true,
  },
};

/*

This code is a configuration file for a Strapi (an open-source headless content management system) application. 
It exports an object that sets the REST API limits for the application.

The rest object has the following properties:

defaultLimit: This sets the default limit of records to be returned when making a REST API request. 
The value is set to 99999, meaning that by default, 99999 records will be returned with each request.

maxLimit: This sets the maximum limit of records that can be returned when making a REST API request. 
The value is also set to 99999, meaning that even if the client requests more records, no more than 99999 will be returned.

withCount: This flag indicates whether to return the total count of records along with the records returned in the response. 
The value is set to true, meaning that the total count of records will be returned with each response.

The purpose of setting maxLimit and defaultLimit to a very high value is to make sure that the client can retrieve as many records as it needs with a single request, 
without having to make multiple requests.
 This may be useful for improving the performance of the application and reducing the overhead of making multiple requests.

 */

