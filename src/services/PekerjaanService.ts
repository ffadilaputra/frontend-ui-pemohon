import { api } from "../config";
import { ServiceGenerator } from "./ServiceGenerator";
import Axios from "axios";

export class PekerjaanService extends ServiceGenerator<IPekerjaan> {
  protected endpoint = api.endpoint + "pekerjaan";

  public getByUsername() {
    return new Promise<IPekerjaan>((resolve, reject) => {
      Axios.get(`${this.endpoint}/${localStorage.getItem("authUser")}`, {
        headers: this.getHeader()
      })
        .then(response => resolve(response.data.data))
        .catch(error => reject(error));
    });
  }
}
