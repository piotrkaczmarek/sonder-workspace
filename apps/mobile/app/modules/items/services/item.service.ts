import { Injectable } from '@angular/core';

import { Item } from '../models';

/**
 * This is organized in this module just for good housekeeping
 * However it is provided via the CoreModule to ensure it's
 * a singleton the entire app can use.
 * If your module service is *only* used in this module
 * you can have the service provided by this module.
 * In this case however, we want this service to be a true singleton
 * which can be injected into any component/service anywhere and
 * it will be the same instance therefore this is provided by the CoreModule.
 */
@Injectable()
export class ItemService {
  private items = new Array<Item>(
    { id: 1, name: "Ter Stegen", role: "Goalkeeper" },
    { id: 3, name: "Piqué", role: "Defender" },
    { id: 4, name: "axc", role: "Defender" },
    { id: 5, name: "ewrg", role: "Defender" },
    { id: 4, name: "zzz", role: "Defender" },
    { id: 5, name: "ewrg", role: "Defender" }
  );

  getItems(): Item[] {
    return this.items;
  }

  getItem(id: number): Item {
    return this.items.filter(item => item.id === id)[0];
  }
}
