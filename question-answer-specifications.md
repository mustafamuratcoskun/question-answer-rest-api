# Question Answer Backend Rest API Specifications

In this project, I created a backend Rest Api that includes basic functionalities that a simple Q&A website provides. This Api can be consumed by any frontend technologies such as React, Angular etc. All of the functionalities of this Rest Api are listed below.

Note : This api is still being developed. Feel free to contribute this project.


### Questions

#### Public Operations

- List all questions
   * Paginate and  Limit number of Questions 
   * Sorting Questions By Most-Answered, Most-Liked or More Recent(Default)
   * Searching Questions By Title
   * Population User Of The Question

- Get a single question with their answers

#### Private Operations

- Ask (Create) a New Question
  * Authenticated users only (Logged In Users) 
  * Field validation 

- Edit a Question
  * Owner User Only
  * Field Validation
- Delete a Question
  * Owner User Only
- Like a Question
  * Authenticated user only
  * Only 1 Like Per User
- Undo Like a Question
  * Authenticated user only
  * Only Applicable To Question That Liked Before

### Answers

#### Public Operations
- Get All Answers by Question Id
- Get Single Answer By Answer Id

#### Private Operations
- Add (Create) a New Answer To Question
  * Authenticated users only (Logged In Users) 
  * Field validation 

- Edit a Answer
  * Owner User Only
  * Field Validation
- Delete a Answer
  * Owner User Only
- Like a Answer
  * Authenticated user only
  * Only 1 Like Per User
- Undo Like a Answer
  * Authenticated user only
  * Only Applicable To Answer That Liked Before

### Users

#### Public Operations

- List all Users
  * Paginate and  Limit number of Users 
  * Search By name
- Get User Profile

#### Private Operations

- Block A User
- Delete A User

### Authentication

- Authentication Strategy : JWT and Cookie
 * JWT and Cookie Expiration : 30 Minutes For Testing Api
- Registration
 * User can register as a "Admin" or simply "User"
 * Password Hash
 * Token includes : "id" and "name"
 * Token Are Stored In Cookie  
- Login
 * User can login with "email" and "password"
 * Everytime a user login, new Token are sent to to client and stored in cookie.
- Logout
 * Token set to null in cookie.
- Forgot Password
 * Reset Password Token send to client via email.
 * This token expires in 1 hour.
- Reset Password
 * Reset Password Token can be used in 1 hour.
 * User can set a new password using this token.
- Update User Details (Bio)
 * Users can add their bio details when logged in.
- User Profile
 * Users can view their personal information after they login.
- Profile Photo Upload
 * Users can upload an avatar for their profile.

