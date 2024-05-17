export interface AdminType {
  id: any;
}

export default class Admin {
  id: any;
  constructor(admin: AdminType) {
    this.id = admin.id;
  }
}
