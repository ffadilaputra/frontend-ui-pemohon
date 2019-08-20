import { api } from "../config";
import { ServiceGenerator } from "./ServiceGenerator";

export class AsesmenService extends ServiceGenerator<IAsesmen> {
  protected endpoint = api.endpoint + "asesi";
}
