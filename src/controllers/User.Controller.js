import UserModel from '../models/User.model.js'
import httpStatus from '../../config/httpStatus.js'
import jwt from 'jsonwebtoken'
import HandleToken from '../functions/HandleToken.js'

const createUser = async (req, res) => {
  const {name, email, password, role } = req.body
  try {
    const user = await UserModel.findOne({ email })
    if (user)
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ msg: { msgBody: 'Username already exsit', msgError: true } })
    else {
      const newUser = await new UserModel({name, email, password, role })
      await newUser.save()
      res.status(httpStatus.CREATED).json({
        msg: { msgBody: 'Successfully create new account', msgError: true },
      })
    }
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ msg: { msgBody: 'An error occured', msgError: true } })
  }
}

const loginUser = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const { _id, username } = req.user
      const token = HandleToken.signToken(jwt, _id)
      res.cookie('access-token', token, { httpOnly: true, sameSite: true })
      res.status(httpStatus.OK).json({
        isAuthenticated: true,
        user: { _id, username },
        message: {
          msg: { msgBody: 'Successfully logged in', msgError: false },
        },
      })
    }
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      isAuthenticated: false,
      message: {
        msg: { msgBody: 'An error occured', msgError: true },
      },
    })
  }
}

const logoutUser = async (req, res) => {
  try {
    await res.clearCookie('access-token')
    res.json({ user: { username: '' }, success: true })
  } catch (error) {
    res.send({message: {
      msg: { msgBody: 'Unable to logout', msgError: true },
    },})
  }
}

const authenticated = (req, res) => {
  const { _id, username } = req.user
  res.status(httpStatus.OK).json({
    isAuthenticated: true,
    user: { _id, username },
  })
}

const updateUser = async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: 'Cannot update empty value' })
    }
    const { _id, username } = req.body
    const response = await UserModel.findByIdAndUpdate(_id, {
      username: username,
    })
    res.status(httpStatus.OK).send(response)
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: 'An error occured',
      error: error.message,
    })
  }
}

const addAddress = async () => {}

const getAllUsers = async (req, res) => {
  try {
    const response = await UserModel.find()
    res.status(httpStatus.OK).send(response)
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message })
  }
}

const findUser = async (req, res) => {
  try {
    const response = await UserModel.findById(req.params.userId)
    res.status(httpStatus.OK).send(response)
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: 'An error has occured',
      error: error.message,
    })
  }
}

const getUserWithUsernameQuery = async (req, res) => {
  try {
    const response = await UserModel.find({ username: req.query.username })
    response.length !== 0
      ? res.status(httpStatus.OK).send(response)
      : res.status(httpStatus.NOT_FOUND).send({
          message: 'Could not find user with username ' + req.query.username,
        })
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: 'An error occur',
      error: error.message,
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const response = await UserModel.findByIdAndDelete(req.params.userId)
    res.status(httpStatus.OK).send(response)
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: 'An error occured',
      error: error.message,
    })
  }
}

export default {
  createUser,
  loginUser,
  logoutUser,
  authenticated,
  getAllUsers,
  findUser,
  getUserWithUsernameQuery,
  updateUser,
  deleteUser,
}
