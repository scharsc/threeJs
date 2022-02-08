import { RequestHandler } from "express";
import { primitiveList } from "../models/primitive-list";
import { Sphere, LineSegment, CylinderFinite } from "../models/primitives";

export const createPrimitive: RequestHandler<{ type: string }> = (
  req,
  res,
  next
) => {
  const type = req.params.type;
  console.log(type);
  let uuid = "";
  switch (type) {
    case "sphere":
      uuid = primitiveList.createPrimitive(req.body as Sphere);
      break;
    case "cylinderfinite":
      uuid = primitiveList.createPrimitive(req.body as CylinderFinite);
      break;
    case "linesegment":
      uuid = primitiveList.createPrimitive(req.body as LineSegment);
      break;
  }
  console.log(uuid);
  res.status(201).json({ message: type + " created", uuid: uuid });
};

export const createLineSegment: RequestHandler = (req, res, next) => {
  const lineSegment = req.body as LineSegment;
  const uuid: string = primitiveList.createPrimitive(lineSegment);
  res.status(201).json({ message: "LineSegment created", uuid: uuid });
};

export const createCylinderFinite: RequestHandler = (req, res, next) => {
  const cylinderFinite = req.body as CylinderFinite;
  const uuid: string = primitiveList.createPrimitive(cylinderFinite);
  res.status(201).json({ message: "CylinderFinite created", uuid: uuid });
};

export const deletePrimitive: RequestHandler = (req, res, _next) => {
  const uuid = req.params.uuid;
  if (primitiveList.deletePrimitive(uuid)) {
    res.json({ message: "primitive deleted!" });
  } else throw new Error("Could not find primitive!");
};

export const getPrimitiveIds: RequestHandler<{ type: string}> = (
  req,
  res,
  _next
) => {
  const type = req.params.type;
  const primitiveIds = primitiveList.getPrimitiveIds(type);
  res.json({ uuids: primitiveIds });
};

export const getPrimitive: RequestHandler<{ type: string; uuid: string }> = (
  req,
  res,
  _next
) => {
  const type = req.params.type;
  const uuid = req.params.uuid;
  switch (type) {
    case "sphere":
      const sphere = primitiveList.getPrimitive<Sphere>(uuid);
      if (sphere) return res.json(sphere);
      break;
    case "linesegment":
      const lineSegment = primitiveList.getPrimitive<LineSegment>(uuid);
      if (lineSegment) return res.json(lineSegment);
      break;
    case "cylinderfinite":
      const cylinderFinite = primitiveList.getPrimitive<CylinderFinite>(uuid);
      if (cylinderFinite) return res.json(cylinderFinite);
      break;
  }

  throw new Error("Could not find primitive!");
};

