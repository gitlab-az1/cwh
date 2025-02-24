import { uuidv7 } from '@/resources/uid';


export abstract class Entity<TProps> {
  protected static _generateId(dashes: boolean = false): string {
    const uid = uuidv7();
    return dashes ? uid : uid.replace(/-/g, '');
  }

  protected static _stringifyDate(input: any): string | undefined {
    if(input instanceof Date)
      return input.toISOString();

    return input ? String(input) : void 0;
  }

  public constructor(
    protected readonly _props: TProps,
    protected readonly _id: string = Entity._generateId() // eslint-disable-line comma-dangle
  ) { }

  public get id(): string {
    return this._id.slice(0);
  }

  public equals(object?: Entity<TProps>): boolean {
    if(object == null || object === undefined)
      return false;

    if(this === object)
      return true;

    if(!(object instanceof Entity))
      return false;

    return this._id === object._id;
  }
}

export default Entity;
