import { SEntity } from "lib/typings";

export class LocalSorter {

  protected static COMPARE = (direction: any, a: any, b: any) => {
    if (a < b) {
      return -1 * direction;
    }
    if (a > b) {
      return direction;
    }
    return 0;
  }

  static sort<T extends SEntity>(data: Array<T>, field: string, direction: string, customCompare?: Function): Array<T> {

    const dir: number = (direction === 'asc') ? 1 : -1;
    const compare: Function = customCompare ? customCompare : this.COMPARE;

    return data.sort((a, b) => {
      return compare.call(null, dir, a[field], b[field]);
    });
  }
}
