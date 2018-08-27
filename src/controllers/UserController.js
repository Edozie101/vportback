class UserController {


  /**
   * Handles user signup
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @memberof AccessController
   */
  static initialAuth(req, res) {
      return res.json({ message: "Welcome to vport api"});
  }
  /**
   * Handles user signup
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @memberof AccessController
   */
  static signUp(req, res) {
    return res.json({ message: req.body });
  }

   /**
   * Handles user sign in
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @memberof AccessController
   */
  static signIn(req, res) {
    return res.json({ message: req.body });
  }

   /**
   * Fetches a user
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @memberof AccessController
   */
  static getUser(req, res) {
    return res.json({ message: req.body });
  }

  /**
   * Fetches a user
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @memberof AccessController
   */
  static updateUser(req, res) {
    return res.json({ message: req.body });
  }

   /**
   * Fetches a user
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @memberof AccessController
   */
  static deleteUser(req, res) {
    return res.json({ message: req.body });
  }
}

export default UserController;