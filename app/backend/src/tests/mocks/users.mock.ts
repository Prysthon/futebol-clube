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

export { userMock, userCompleteMock, tokenMock, userWithoutEmailMock, userWithoutPasswordMock, missingFields };