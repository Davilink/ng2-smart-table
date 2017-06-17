import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { SEntity, FilterFieldConfig } from 'lib/typings';

export abstract class DataSource<T extends SEntity> {

  protected onChangedSource = new Subject<T>();
  protected onAddedSource = new Subject<T>();
  protected onUpdatedSource = new Subject<T>();
  protected onRemovedSource = new Subject<T>();

  abstract getAll(): Promise<T>;
  abstract getElements(): Promise<T[]>;
  abstract getSort(): T;
  abstract getFilter(): T;
  abstract getPaging(): T;
  abstract count(): number;

  refresh() {
    this.emitOnChanged('refresh');
  }

  load(data: Array<T>): Promise<void> {
    this.emitOnChanged('load');
    return Promise.resolve();
  }

  onChanged(): Observable<T> {
    return this.onChangedSource.asObservable();
  }

  onAdded(): Observable<T> {
    return this.onAddedSource.asObservable();
  }

  onUpdated(): Observable<T> {
    return this.onUpdatedSource.asObservable();
  }

  onRemoved(): Observable<T> {
    return this.onRemovedSource.asObservable();
  }

  prepend(element: T): Promise<void> {
    this.emitOnAdded(element);
    this.emitOnChanged('prepend');
    return Promise.resolve();
  }

  append(element: T): Promise<void> {
    this.emitOnAdded(element);
    this.emitOnChanged('append');
    return Promise.resolve();
  }

  add(element: T): Promise<void> {
    this.emitOnAdded(element);
    this.emitOnChanged('add');
    return Promise.resolve();
  }

  remove(element: T): Promise<void> {
    this.emitOnRemoved(element);
    this.emitOnChanged('remove');
    return Promise.resolve();
  }

  update(element: T, values: T): Promise<void> {
    this.emitOnUpdated(element);
    this.emitOnChanged('update');
    return Promise.resolve();
  }

  empty(): Promise<void> {
    this.emitOnChanged('empty');
    return Promise.resolve();
  }

  setSort(conf: Array<T>, doEmit?: boolean) {
    if (doEmit) {
      this.emitOnChanged('sort');
    }
  }

  setFilter(conf: Array<FilterFieldConfig>, andOperator?: boolean, doEmit?: boolean) {
    if (doEmit) {
      this.emitOnChanged('filter');
    }
  }

  addFilter(fieldConf: {}, andOperator?: boolean, doEmit?: boolean) {
    if (doEmit) {
      this.emitOnChanged('filter');
    }
  }

  setPaging(page: number, perPage: number, doEmit?: boolean) {
    if (doEmit) {
      this.emitOnChanged('paging');
    }
  }

  setPage(page: number, doEmit?: boolean) {
    if (doEmit) {
      this.emitOnChanged('page');
    }
  }

  protected emitOnRemoved(element: T) {
    this.onRemovedSource.next(element);
  }

  protected emitOnUpdated(element: T) {
    this.onUpdatedSource.next(element);
  }

  protected emitOnAdded(element: T) {
    this.onAddedSource.next(element);
  }

  protected emitOnChanged(action: string) {
    this.getElements().then((elements) => this.onChangedSource.next({
      action: action,
      elements: elements,
      paging: this.getPaging(),
      filter: this.getFilter(),
      sort: this.getSort(),
    }));
  }
}
