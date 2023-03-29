import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5002";

/** API: Class with methods to make requests to api */

class GardenAPI {
  static token;
  // Individual API routes

  /** login: logs in user
   *
   * data: object - user data {username, password}
   *
   * returns: string - token
   */

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;

    let headers = {
      Authorization: `Bearer ${GardenAPI.token}`,
      "Content-Type": `application/json`,
    };

    if (endpoint === "login" || endpoint === "signup") {
      headers = {
        "Content-Type": `application/json`,
      };
    }

    const params = method === "get" ? data : {};

    try {
      const result = await axios({ url, method, data, params, headers });
      return result.data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.errors;

      if (typeof message === "object" && !Array.isArray(message)) {
        let updatedMessage = [];
        for (let key in message) {
          updatedMessage.push(`${key}: ${message[key]}`);
        }
        throw updatedMessage;
      }

      throw Array.isArray(message) ? message : [message];
    }
  }


   /** Login user
   * data: object - user data {email, password}
   *
   * returns: string - token
   */

  static async login(data) {
    let res = await this.request("login", data, "post");
    return res.token;
  }

   /** Signup user
   * data: object - user data {email, password, firstName, lastName}
   *
   * returns: string - token
   */

  static async signup(data) {
    let res = await this.request("signup", data, "post");
    return res.token;
  }

  /**
   * Gets user plants
   */
  static async getPlants() {
    let res = await this.request("plants");
    return res;
  }

  /** Get current user
   *
   * id: number
   *
   * returns: object - user object
   */
  static async getUser(id) {
    let res = await this.request(`users/${id}`);
    return res.user;
  }


  // /** Get plants */
  // static async getPlants() {
  //   let res = await this.request(`plants`);
  //   return res.plants;
  // }

  /** Sow plant */
  static async sowPlant(plantId) {
    let res = await this.request(`plants/${plantId}/sow`, {}, "patch");
    return res;
  }

  /** Plant plant */
  static async plantPlant(plantId) {
    let res = await this.request(`plants/${plantId}/plant`, {}, "patch");
    return res;
  }

  /** Water plant */
  static async waterPlant(plantId) {
    let res = await this.request(`plants/${plantId}/water`, {}, "patch");
    return res;
  }

  /** Sell plant */
  static async sellPlant(plantId) {
    let res = await this.request(`plants/${plantId}/sell`, {}, "patch");
    return res;
  }

  /** Age plants */
  static async agePlants() {
    let res = await this.request(`plants/age`, {}, "post");
    return res;
  }

  /** Sell seed */
  static async buySeed(seedId) {
    let res = await this.request(`plants/${seedId}/buy`, {}, "post");
    return res;
  }
  /** Get shop items */
  static async getShopItems() {
    let res = await this.request('/shop');
    return res;
  }
}

export default GardenAPI;
