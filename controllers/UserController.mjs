import dotenv from 'dotenv';
import BaseController from './BaseController.mjs';

dotenv.config();
const { SALT } = process.env;

export default class UserController extends BaseController {
  async authUser(req, res) {
  }

  async createUser(req, res) {
  }
}
