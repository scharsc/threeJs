"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.primitiveList = exports.PrimitiveList = void 0;
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const three_1 = require("three");
class PrimitiveList {
    constructor(path) {
        this.path = path;
        this.primitives = [];
        if (fs_1.default.existsSync(path)) {
            fs_1.default.readFile(path, "utf8", (err, data) => {
                if (err)
                    console.log(err);
                this.primitives = JSON.parse(data).primitives;
                console.log("loaded number of primitives: " + this.primitives.length);
            });
        }
        else {
        }
        const m = new three_1.Matrix4();
        m.identity();
    }
    update() {
        const str = '{ "primitives": ' + JSON.stringify(this.primitives) + "}";
        fs_1.default.writeFile(this.path, str, function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }
    createPrimitive(prim) {
        const uuid = (0, uuid_1.v4)();
        this.primitives.push({ uuid: uuid, primitive: prim });
        this.update();
        return uuid;
    }
    deletePrimitive(uuid) {
        const primIndex = this.primitives.findIndex((prim) => prim.uuid === uuid);
        if (primIndex < 0) {
            return false;
        }
        this.primitives.splice(primIndex, 1);
        this.update();
        return true;
    }
    getPrimitive(uuid) {
        const primIndex = this.primitives.findIndex((prim) => prim.uuid === uuid);
        if (primIndex < 0) {
            return undefined;
        }
        return this.primitives[primIndex].primitive;
    }
    getPrimitiveIds(type) {
        console.log(this.primitives);
        console.log(this.primitives);
        return this.primitives
            .filter((prim) => {
            return prim.primitive.type === type;
        })
            .map((prim) => prim.uuid);
    }
}
exports.PrimitiveList = PrimitiveList;
exports.primitiveList = new PrimitiveList("primitives.json");
