import { DataSource } from './data-source/data-source';

export class SEntity {
  [key: string]: SEntity;
}

export interface Deferred<T> {
    resolve(newData?: T): void;
    reject(): void;
  }

  export interface FilterFieldConfig {
    field: string;
    search: string;
    filter?(cb: Function): void;
  }

  export interface SortingFieldConfig {
    [key: string]: string | Function;

    field: string;
    direction: string;
    compare?(cb: Function): void
  }

  export interface PagingConfig {
    page: number;
    perPage: number;
    doEmit?: boolean;
  }

  export interface TEvent<T extends SEntity> {
    source: DataSource<T>;
  }

  export interface Event {
    source: DataSource<any>;
  }

  export interface TDataEvent<T extends SEntity> extends TEvent<T> {
    data: T;
  }

  export interface DataEvent extends TDataEvent<any> {
    data: any;
  }

  export interface TRowSelectEvent<T> {
    isSelected: boolean;
  }

  export interface RowSelectEvent extends TRowSelectEvent<any> {
    isSelected: boolean;
  }

  export interface TUserRowSelectEvent<T> {
    selected: T;
  }

  export interface UserRowSelectEvent extends TUserRowSelectEvent<any>, TRowSelectEvent<any> {
    selected: any;
  }

  export interface TConfirmEvent<T extends SEntity> extends TEvent<T> {
    confirm: Deferred<T>;
  }

  export interface TCreateConfirmEvent<T extends SEntity> extends TConfirmEvent<T> {
    newData: T;
  }

  export interface CreateConfirmEvent extends TConfirmEvent<any> {
    newData: any;
  }

  export interface TEditConfirmEvent<T extends SEntity> extends TDataEvent<T>, TConfirmEvent<T>, TCreateConfirmEvent<T> { }

  export interface EditConfirmEvent extends TDataEvent<any>, TConfirmEvent<any>, TCreateConfirmEvent<any> { }

  export interface TDeleteConfirmEvent<T extends SEntity> extends TDataEvent<T>, TConfirmEvent<T> { }

  export interface DeleteConfirmEvent extends TDataEvent<any>, TConfirmEvent<any> { }