import { Address } from "./Address";

export type CustomerProps = {
  id: string
  name: string
}

export class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;

  constructor({ id, name }: CustomerProps) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get name() {
    return this._name;
  }

  validate() {
    if(this._id.length === 0) throw new Error("Id is required")
    if(this._name.length === 0) throw new Error("Name is required")
  }

  changeName(name: string) {
    this._name = name;
    this.validate()
  }

  activate() {
    if (this._address === undefined) throw new Error('Address is mandatory to activate a customer');

    this._active = true;
  }
  
  deactivate(): void {
    this._active = false;
  }

  isActive() {
    return this._active;
  }

  addAddress(address: Address) {
    this._address = address;
  }
}
