# Question Answer Backend Rest API Specifications

In this project, I created a backend Rest Api that includes basic functionalities that a simple Q&A website provides. This Api can be consumed by any frontend technologies such as React, Angular etc. All of the functionalities of this Rest Api are listed below.

Note : This api is still being developed. Feel free to contribute this project.


## Questions

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

## Answers

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

## Users

#### Public Operations

- List all Users
  * Paginate and  Limit number of Users 
  * Search By name
- Get User Profile

#### Private Operations

- Block A User
- Delete A User

## Authentication

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

## Models

#### User
- name
  * type : String
  * required : true
  * Validation : Please provide a name
- email
  * type : String
  * required : true
  * unique : true
  * Validation with Regex : Please provide a valid email
- role
  * type : String
  * enum : user,admin
  * default : user
- password
  * type : String
  * required : true
  * minlength : 6
  * Validation : Please provide a password
- createdAt
  * type : String
  * default : Date.now
- title
  * type : String
- about
  * type : String
- website
  * type : String
- place
  * type : String
- profile_image
  * type : String
- blocked
  * type : Boolean
  * default : false
- resetPasswordToken
  * type : String
- resetPasswordExpire
  * type : Date

#### Question

- title
  * type : String
  * required : true
  * Validation : Please provide a title
  * minLength : 10
  * unique : true
- content
  * type : String
  * required : true
  * Validation : Please provide a content
  * minLength : 20
- slug
  * type : String
- createdAt
  * type : Date
  * default : Date.now
- likeCount
  * type : Number
  * default : 0
  * min : 0
- likes
  * type : Array(ObjectId)
  * ref  : "User"
- user
  * type : ObjectId
  * ref : "User"
- answerCount
  * type : Number
  * default : 0
- answers
  * type : Array(ObjectId)
  * ref : Answer

#### Answer

- content
  * type : String
  * required : true
  * Validation : Please provide a content
  * minLength : 20
- createdAt
  * type : Date
  * default  : Date.now
- likeCount
  * type : Number
  * default : 0
  * min : 0
- likes
  * type : Array(ObjectId)
  * ref : User
- user
  * type : ObjectId
  * ref : User
  * required : true
- question
  * type : ObjectId
  * ref : Question
  * required : true

## Middlewares

#### Authorization

- Middlewares That Protect Routes From Unauthorized Access
  * getAccessToRoute
  * getAdminAccess
  * getQuestionOwnerAccess
  * getAnswerOwnerAccess

#### Database

- Middlewares That Check Entities Exist With Given Ids
  * checkQuestionAndAnswerExist
  * checkQuestionExist
  * checkUserExist

#### Error 

- Middleware That Captures All Errors
  * errorHandler

#### Query

- Middleware That Provides Advance Query Functionalities
  * answerQueryMiddleware
  * questionQueryMiddleware
  * userQueryMiddleware

#### Security
- Middleware That Provides Security to Rest Api
  * limitAccess
  * hpp
  * cors
  * helmet
  * mongoSanitize

## Helper Functions and Classes

#### Database

- connectDatabase
  * MongoDb Connection


#### Error

- customError
  * Customized Error Class
- errorWrapper
  * Function that catches asynchronous errors

#### 3rd Party Libraries

- photoUpload
  * Helper Function That Customized Upload Process with Multer Package
- sendEmail
  * Helper Function That Customized 
  Mail Process with NodeMailer Package

## Environment Variables and Constants

Environment Variables and Constants Can Be Set in ./config/env/config.env.







