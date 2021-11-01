**About this Project**

This application was developed using .Net Core(5.0), ReactJs, and Bootsrap for cross-platform server and client side code.
MySQL was used for the database.

Entity framework was used to do database operations like creating the database and querying.
Code-first approach was used to map models onto the database.

**Dependencies**

- dotNet core 5.0
- dotNet EF tools install using the `dotnet tool install --global dotnet-ef` command
- reactjs 16.0.0
- MySql
- use `npm install` to install the remaining UI dependencies

**Setting up Database**

For setting up the database run the following command `dotnet ef database update`

The following parameters are the default for the database
- User ID: root
- Password: P@ssw0rd123456
- Port: 3308
- Database name: ElectroDb
- Host: localhost
  if you wish to change the parameters please make sure to change the connection string in the `appsettings.json` file accordingly.

