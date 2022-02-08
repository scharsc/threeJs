"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrimitive = exports.getPrimitiveIds = exports.deletePrimitive = exports.createCylinderFinite = exports.createLineSegment = exports.createPrimitive = void 0;
const primitive_list_1 = require("../models/primitive-list");
const createPrimitive = (req, res, next) => {
    const type = req.params.type;
    console.log(type);
    let uuid = "";
    switch (type) {
        case "sphere":
            uuid = primitive_list_1.primitiveList.createPrimitive(req.body);
            break;
        case "cylinderfinite":
            uuid = primitive_list_1.primitiveList.createPrimitive(req.body);
            break;
        case "linesegment":
            uuid = primitive_list_1.primitiveList.createPrimitive(req.body);
            break;
    }
    console.log(uuid);
    res.status(201).json({ message: type + " created", uuid: uuid });
};
exports.createPrimitive = createPrimitive;
const createLineSegment = (req, res, next) => {
    const lineSegment = req.body;
    const uuid = primitive_list_1.primitiveList.createPrimitive(lineSegment);
    res.status(201).json({ message: "LineSegment created", uuid: uuid });
};
exports.createLineSegment = createLineSegment;
const createCylinderFinite = (req, res, next) => {
    const cylinderFinite = req.body;
    const uuid = primitive_list_1.primitiveList.createPrimitive(cylinderFinite);
    res.status(201).json({ message: "CylinderFinite created", uuid: uuid });
};
exports.createCylinderFinite = createCylinderFinite;
const deletePrimitive = (req, res, _next) => {
    const uuid = req.params.uuid;
    if (primitive_list_1.primitiveList.deletePrimitive(uuid)) {
        res.json({ message: "primitive deleted!" });
    }
    else
        throw new Error("Could not find primitive!");
};
exports.deletePrimitive = deletePrimitive;
const getPrimitiveIds = (req, res, _next) => {
    const type = req.params.type;
    const primitiveIds = primitive_list_1.primitiveList.getPrimitiveIds(type);
    res.json({ uuids: primitiveIds });
};
exports.getPrimitiveIds = getPrimitiveIds;
const getPrimitive = (req, res, _next) => {
    const type = req.params.type;
    const uuid = req.params.uuid;
    switch (type) {
        case "sphere":
            const sphere = primitive_list_1.primitiveList.getPrimitive(uuid);
            if (sphere)
                return res.json(sphere);
            break;
        case "linesegment":
            const lineSegment = primitive_list_1.primitiveList.getPrimitive(uuid);
            if (lineSegment)
                return res.json(lineSegment);
            break;
        case "cylinderfinite":
            const cylinderFinite = primitive_list_1.primitiveList.getPrimitive(uuid);
            if (cylinderFinite)
                return res.json(cylinderFinite);
            break;
    }
    throw new Error("Could not find primitive!");
};
exports.getPrimitive = getPrimitive;
