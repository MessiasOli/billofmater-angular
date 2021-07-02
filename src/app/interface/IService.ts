export interface Service<T> {
  Add(any:T):Promise<boolean>
  Remove(any:T):Promise<boolean>
  Update(any:T):Promise<boolean>
  FildAll():Promise<T[]>
  Find(id:string):Promise<T>
}