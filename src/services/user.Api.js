import axios from "axios";

class UsersManager {
  static async login(infoUser) {
    let response;
    try {
      response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/signin`,
        infoUser
      );
    } catch (error) {}
    return response;
  }

  static async register(userInformation, setErrorLog, setLog) {
    let response;
    try {
      response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/register`,
        userInformation
      );
      setLog(true)
    } catch (error) {
      setErrorLog(error.response.data.errorsMsg);
    }
    return response;
  }

  static async registerEmployees(
    infoUser,
    setCreated,
    setNotCreated,
    setErrors
  ) {
    let response;
    try {
      response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/register-employeers`,
        infoUser
      );
      setCreated(true);
    } catch (error) {
      setErrors(error.response.data.errorsMsg);
      setNotCreated(true);
    }
    return setCreated, setNotCreated, setErrors, response;
  }

  static getAccess(setAccess, id_user) {
    const getAccess = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/worker/${id_user}`
      );
      setAccess(response.data[0].state);
    };
    getAccess();
    return setAccess;
  }
}

export default UsersManager;
