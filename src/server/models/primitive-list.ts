import { Primitive } from "../models/primitives";
import fs from "fs";
import { v4 } from "uuid";
import { Matrix4 } from "three";

export type PrimitiveItem = { uuid: string; primitive: Primitive };

export class PrimitiveList {
  constructor(private path: fs.PathLike) {
    if (fs.existsSync(path)) {
      fs.readFile(path, "utf8", (err, data) => {
        if (err) console.log(err);
        this.primitives = JSON.parse(data).primitives as PrimitiveItem[];
        console.log("loaded number of primitives: " + this.primitives.length);
      });
    } else {
    }

    const m = new Matrix4();
    m.identity();
  }

  public update() {
    const str: string =
      '{ "primitives": ' + JSON.stringify(this.primitives) + "}";
    fs.writeFile(this.path, str, function (err) {
      if (err) {
        return console.log(err);
      }
    });
  }

  public createPrimitive(prim: Primitive): string {
    const uuid: string = v4();
    this.primitives.push({ uuid: uuid, primitive: prim });
    this.update();
    return uuid;
  }

  public deletePrimitive(uuid: string) {
    const primIndex = this.primitives.findIndex(
      (prim: PrimitiveItem) => prim.uuid === uuid
    );

    if (primIndex < 0) {
      return false;
    }

    this.primitives.splice(primIndex, 1);
    this.update();
    return true;
  }

  public getPrimitive<PrimitiveT extends Primitive>(uuid: string) {
    const primIndex = this.primitives.findIndex(
      (prim: PrimitiveItem) => prim.uuid === uuid
    );

    if (primIndex < 0) {
      return undefined;
    }
    return this.primitives[primIndex].primitive as PrimitiveT;
  }

  public getPrimitiveIds(type: string): string[] {
    console.log(this.primitives);
    console.log(this.primitives);
    return this.primitives
      .filter((prim: PrimitiveItem) => {
        return prim.primitive.type === type;
      })
      .map((prim) => prim.uuid);
  }

  private primitives: PrimitiveItem[] = [];
}

export const primitiveList: PrimitiveList = new PrimitiveList(
  "primitives.json"
);
