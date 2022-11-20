import { v4 } from "uuid"

export class Uuid {
    public generate = ():string => v4()
}

export default new Uuid()