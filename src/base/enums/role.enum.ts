export class ERole {
  static readonly Public = "Public";

  static readonly AdminView = "AdminView";
  static readonly AdminRole = "AdminRole";
  static readonly AdminCreate = "AdminCreate";
  static readonly AdminUpdate = "AdminUpdate";
  static readonly AdminDelete = "AdminDelete";

}

export class ERolePath {
  static readonly "/yoneticiler" = ERole.AdminView;
  static readonly "/yoneticiler/ekle" = ERole.AdminCreate;
  static readonly "/yoneticiler/duzenle/:id" = ERole.AdminUpdate;
  static readonly "/yoneticiler/yetki/:id" = ERole.AdminRole;

}
