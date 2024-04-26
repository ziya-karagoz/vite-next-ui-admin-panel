import { ERole, ERolePath } from "@base/enums/role.enum";
import { jwtDecode } from "jwt-decode";
const AUTH_LOCAL_STORAGE_KEY =
  import.meta.env.VITE_AUTH_LOCAL_STORAGE_KEY || "accessToken";
export const hasPermissionMany = (access: string) => {
  if (access.includes(ERole.Public)) return true;
  const accessArr = access?.split(",");
  const accessToken =
    localStorage.getItem(AUTH_LOCAL_STORAGE_KEY) ??
    sessionStorage.getItem(AUTH_LOCAL_STORAGE_KEY) ??
    "";
  return (
    accessArr.filter(
      // @ts-ignore
      (item) => !jwtDecode(accessToken)?.user.roles.includes(item)
    )?.length !== accessArr.length
  );
};
export const hasPermission = (access: string) => {

  if (access.includes(ERole.Public)) return true;
  const accessToken =
    localStorage.getItem(AUTH_LOCAL_STORAGE_KEY) ??
    sessionStorage.getItem(AUTH_LOCAL_STORAGE_KEY) ??
    "";
  // @ts-ignore
  return jwtDecode(accessToken)?.user.roles.includes(access);
};

export function getRoleForCurrentPath(currentPath: string): string | undefined {
  // ERolePath içindeki her bir yolu döngü ile kontrol et

  for (const path in ERolePath) {
    if (path.includes(":")) {
      // Dinamik yol parçalarını ":" işareti ile ayır
      const dynamicSegments = path.split("/").filter((p) => p.startsWith(":"));
      const currentPathSegments = currentPath.split("/");

      // Dinamik yol ile mevcut yolun eşleşip eşleşmediğini kontrol et
      if (
        dynamicSegments.length > 0 &&
        currentPathSegments.length === path.split("/").length
      ) {
        let matches = true;
        for (let i = 0; i < currentPathSegments.length; i++) {
          if (dynamicSegments.includes(path.split("/")[i])) {
            continue;
          }
          if (currentPathSegments[i] !== path.split("/")[i]) {
            matches = false;
            break;
          }
        }
        if (matches) {
          return ERolePath[path as keyof typeof ERolePath].toString();
        }
      }
    } else {
      // Sabit yol
      if (path === currentPath) {
        return ERolePath[path as keyof typeof ERolePath].toString();
      }
    }
  }
}
