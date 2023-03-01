import Users from "../../database/models/UsersModel";

const userMock = {
  "email": "tiago@gmail.com",
  "password": "123tiago123"
} as Users;

const userCompleteMock = {
  "id": 1,
  "username": "prysthon",
  "role": "CEO",
  "email": "tiago@gmail.com",
  "password": "123tiago123"
} as Users;

const tokenMock = {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}

const userWithoutEmailMock = {
  "password": "123tiago123"
} as Users;

const userWithoutPasswordMock = {
  "email": "tiago@gmail.com",
} as Users;

const missingFields = { "message": "All fields must be filled" }

const wrongEmail = {
  "email": '@exemplo.com',
  "password": "123tiago123"
} as Users;

const wrongPassword = {
  "email": "tiago@gmail.com",
  "password": "123"
} as Users;

const infNotInserted = {
  "email": "fake@gmail.com",
  "password": "fakeqweqwe"
} as Users;

const wrongFields =   { "message": "Invalid email or password" }

export { userMock, userCompleteMock, tokenMock, userWithoutEmailMock, userWithoutPasswordMock, missingFields, wrongEmail, wrongPassword, infNotInserted, wrongFields };