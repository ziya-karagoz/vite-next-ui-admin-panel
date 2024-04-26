import api from "./Interceptor";
import download from "downloadjs";


type fileProp = {
    request : string;
    fileName : string;
    sort? : string;  
    status : string | undefined;
}

export const exportExcel = async ({ request, fileName, sort = "", status = undefined }:fileProp) => {
        
    const headers = { Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" };
    return new Promise((_, reject) => { // Removed unused 'resolve' parameter
        api
            .get(`${import.meta.env.VITE_API_URL}/api/backoffice/${request}?sort=${sort}&status=${status}`, { responseType: 'blob', headers })
            .then(async (response) => {
                const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                download(blob, fileName + ".xlsx");
            })
            .catch((error) => {
                reject(error)
            });
    });
};