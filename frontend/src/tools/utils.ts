export function isEmptyObject(target: object) {
  try {
    if (!(typeof target === "object")) {
      return true;
    }
    if (JSON.stringify(target) === "{}") {
      return true;
    }
    return false;
  } catch (e) {
    return true;
  }
}

export function isEmptyArray(src: any): boolean {
  try {
    if (!Array.isArray(src)) {
      return true;
    }
    if (src.length === 0) {
      return true;
    }
    return false;
  } catch (e) {
    return true;
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
