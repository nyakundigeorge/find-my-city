import { City } from "../models/city.model";
import { Injectable } from "@angular/core";
import { DataService } from "./data.service";

@Injectable()
export class CitiesService {

  constructor(private dataService: DataService) {

  }

  public async findCityByName(name: string): Promise<City | any> {
    try {
      let data = await this.dataService.db.executeSql("SELECT * FROM cidades WHERE nome = ?", [name]);
      if (data.rows.length > 0) {
        let item = data.rows.item(0);
        return new City(item.id, item.ibge, item.nome, item.uf);
      }
      return;
    }
    catch (err) {
      console.log('Error: ', err);
      return;
    };
  }
}