export class FreezableSet<T> extends Set<T> {
  private _frozen: boolean = false;
  
  public override add(value: T): this {
    if(this._frozen)
      return this;

    return super.add(value);
  }

  public override delete(value: T): boolean {
    if(this._frozen)
      return false;

    return super.delete(value);
  }

  public override clear(): void {
    if(this._frozen)
      return;
    
    return super.clear();
  }

  public freeze(): this {
    if(!this._frozen) {
      this._frozen = true;
    }

    return this;
  }
}
