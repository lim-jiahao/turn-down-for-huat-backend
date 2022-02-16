export default class BaseController {
  constructor(model, db) {
    this.model = model;
    this.db = db;
  }
}
