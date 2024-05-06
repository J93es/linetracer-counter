export function isNotEmptyObject(target: object) {
  try {
    if (typeof target === "object" && JSON.stringify(target) !== "{}") {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

export function isNotEmptyArray(src: any): boolean {
  try {
    if (Array.isArray(src) && src.length > 0) return true;
    return false;
  } catch (e) {
    return false;
  }
}

export function findTargetBy_id(_id: string, objectList: any[]): any {
  try {
    for (let object of objectList) {
      if (object._id === _id) return JSON.parse(JSON.stringify(object));
    }
    return {};
  } catch (e) {
    return {};
  }
}
