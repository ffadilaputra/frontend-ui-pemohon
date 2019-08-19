import { api } from "../config";
import { ServiceGenerator } from "./ServiceGenerator";
import Axios from "axios";

export class PemohonService extends ServiceGenerator<IPemohon> {
  protected endpoint = api.endpoint + "pemohon/users";

  public getByUsername() {
    return new Promise<IPemohon>((resolve, reject) => {
      Axios.get(`${this.endpoint}/${localStorage.getItem("authUser")}`, {
        headers: this.getHeader()
      })
        .then(response => resolve(response.data.data))
        .catch(error => reject(error));
    });
  }
}
