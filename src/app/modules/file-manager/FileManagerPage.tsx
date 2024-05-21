import { Route, Routes } from "react-router-dom";
import DynamoFileManager from "@base/components/common/dynamo-file-manager/DynamoFileManager";

const FileManagerPage = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DynamoFileManager
            addDirectory={(folder_path: string) => {
              console.log("addDirectory", folder_path);
            }}
            uploadFile={(pathname: string, file: File) => {
              console.log("uploadFile", pathname, file);
            }}
            refreshFiles={() => {
              console.log("refreshFiles");
            }}
            deleteFile={(fileName: string) => {
              console.log("deleteFile", fileName);
            }}
            files={[
              {
                name: "konutkonfor",
                isDirectory: true,
                items: [
                  {
                    name: "5685ceb2-2ea0-40e9-a1ab-1ee433657a67.png",
                    isDirectory: false,
                    size: 1003861,
                    url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/5685ceb2-2ea0-40e9-a1ab-1ee433657a67.png",
                  },
                  {
                    name: "Untitled directory",
                    isDirectory: true,
                    items: [
                      {
                        name: "TechnoHouse_Logo.svg",
                        isDirectory: false,
                        size: 28635,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/Untitled directory/TechnoHouse_Logo.svg",
                      },
                    ],
                    size: 0,
                    url: "",
                  },
                  {
                    name: "asdasdasdasd",
                    isDirectory: true,
                    items: [],
                    size: 0,
                    url: "",
                  },
                  {
                    name: "box.png",
                    isDirectory: false,
                    size: 22360,
                    url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/box.png",
                  },
                  {
                    name: "doğukankor.JPG",
                    isDirectory: false,
                    size: 212238,
                    url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/doğukankor.JPG",
                  },
                  {
                    name: "emlak-4.jpg",
                    isDirectory: false,
                    size: 112380,
                    url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/emlak-4.jpg",
                  },
                  {
                    name: "hero",
                    isDirectory: true,
                    items: [
                      {
                        name: "3413914_150X150.jpg",
                        isDirectory: false,
                        size: 73402,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/hero/3413914_150X150.jpg",
                      },
                      {
                        name: "Saglam_Tapu_Ev.jpg",
                        isDirectory: false,
                        size: 882205,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/hero/Saglam_Tapu_Ev.jpg",
                      },
                      {
                        name: "deneme.png",
                        isDirectory: false,
                        size: 2483,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/hero/deneme.png",
                      },
                      {
                        name: "doğukankor.JPG",
                        isDirectory: false,
                        size: 212238,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/hero/doğukankor.JPG",
                      },
                      {
                        name: "mobil-2000x1000.jpg",
                        isDirectory: false,
                        size: 260790,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/hero/mobil-2000x1000.jpg",
                      },
                      {
                        name: "ziya.png",
                        isDirectory: false,
                        size: 289296,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/hero/ziya.png",
                      },
                    ],
                    size: 0,
                    url: "",
                  },
                  {
                    name: "kullanicilar",
                    isDirectory: true,
                    items: [
                      {
                        name: "03609ba8-7230-419b-83fc-1b5bfa1dfe111702285196994.jpeg",
                        isDirectory: false,
                        size: 88546,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/kullanicilar/03609ba8-7230-419b-83fc-1b5bfa1dfe111702285196994.jpeg",
                      },
                      {
                        name: "1d5e41cc-6abd-4556-985b-ef0336c9e2381701676738868.JPG",
                        isDirectory: false,
                        size: 212238,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/kullanicilar/1d5e41cc-6abd-4556-985b-ef0336c9e2381701676738868.JPG",
                      },
                      {
                        name: "503d2756-59f9-4dcb-a9eb-75bbaefd3fc31702470559092.JPG",
                        isDirectory: false,
                        size: 212238,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/kullanicilar/503d2756-59f9-4dcb-a9eb-75bbaefd3fc31702470559092.JPG",
                      },
                      {
                        name: "55242a4a-4a14-40bd-a00e-bd9dc37728771701860662720.JPG",
                        isDirectory: false,
                        size: 212238,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/kullanicilar/55242a4a-4a14-40bd-a00e-bd9dc37728771701860662720.JPG",
                      },
                      {
                        name: "9f881642-8e19-4502-a599-6f7b83c25fe91701701464538.JPG",
                        isDirectory: false,
                        size: 212238,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/kullanicilar/9f881642-8e19-4502-a599-6f7b83c25fe91701701464538.JPG",
                      },
                      {
                        name: "ab86a697-48e1-475e-87ad-b1f9d31d02931701689689134.JPG",
                        isDirectory: false,
                        size: 212238,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/kullanicilar/ab86a697-48e1-475e-87ad-b1f9d31d02931701689689134.JPG",
                      },
                      {
                        name: "ac5d9996-6fd4-424c-8a8d-d1275eb2fc381701441758233.JPG",
                        isDirectory: false,
                        size: 212238,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/kullanicilar/ac5d9996-6fd4-424c-8a8d-d1275eb2fc381701441758233.JPG",
                      },
                      {
                        name: "af6df4fd-a03a-467b-ac8a-5a98877abfda1701181113589.JPG",
                        isDirectory: false,
                        size: 212238,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/kullanicilar/af6df4fd-a03a-467b-ac8a-5a98877abfda1701181113589.JPG",
                      },
                      {
                        name: "c4f923c1-1e29-468f-ab1e-5e2c315848c91701181871043.JPG",
                        isDirectory: false,
                        size: 212238,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/kullanicilar/c4f923c1-1e29-468f-ab1e-5e2c315848c91701181871043.JPG",
                      },
                      {
                        name: "cd7f7182-0e76-45a5-a3bf-f5e285a8957b1703839630699.JPG",
                        isDirectory: false,
                        size: 212238,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/kullanicilar/cd7f7182-0e76-45a5-a3bf-f5e285a8957b1703839630699.JPG",
                      },
                      {
                        name: "ce20e29b-66ff-411b-b87d-2e9619dc708d1701259130587.JPG",
                        isDirectory: false,
                        size: 212238,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/kullanicilar/ce20e29b-66ff-411b-b87d-2e9619dc708d1701259130587.JPG",
                      },
                      {
                        name: "d1e8c4d6-4792-46ba-88a9-0506b3ca88481701769152523.JPG",
                        isDirectory: false,
                        size: 212238,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/kullanicilar/d1e8c4d6-4792-46ba-88a9-0506b3ca88481701769152523.JPG",
                      },
                      {
                        name: "d575a8d6-eee8-4f79-b445-480e1fc76dbd1701959057806.png",
                        isDirectory: false,
                        size: 151156,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/kullanicilar/d575a8d6-eee8-4f79-b445-480e1fc76dbd1701959057806.png",
                      },
                      {
                        name: "f228dca7-9fcb-4e39-a8f1-68454b2316171709626942407.jpeg",
                        isDirectory: false,
                        size: 78245,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/kullanicilar/f228dca7-9fcb-4e39-a8f1-68454b2316171709626942407.jpeg",
                      },
                    ],
                    size: 0,
                    url: "",
                  },
                  {
                    name: "musteriler",
                    isDirectory: true,
                    items: [
                      {
                        name: "Group.png",
                        isDirectory: false,
                        size: 18917,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/musteriler/Group.png",
                      },
                      {
                        name: "empty.jpg",
                        isDirectory: false,
                        size: 58598,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/musteriler/empty.jpg",
                      },
                      {
                        name: "test",
                        isDirectory: true,
                        items: [],
                        size: 0,
                        url: "",
                      },
                    ],
                    size: 0,
                    url: "",
                  },
                  {
                    name: "q.png",
                    isDirectory: false,
                    size: 661998,
                    url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/q.png",
                  },
                  {
                    name: "slider.jpeg",
                    isDirectory: false,
                    size: 88546,
                    url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/slider.jpeg",
                  },
                  {
                    name: "urunler",
                    isDirectory: true,
                    items: [
                      {
                        name: "vazo.webp",
                        isDirectory: false,
                        size: 217038,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/urunler/vazo.webp",
                      },
                    ],
                    size: 0,
                    url: "",
                  },
                  {
                    name: "yoneticiler",
                    isDirectory: true,
                    items: [
                      {
                        name: "empty.jpg",
                        isDirectory: false,
                        size: 58598,
                        url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/yoneticiler/empty.jpg",
                      },
                    ],
                    size: 0,
                    url: "",
                  },
                  {
                    name: "ziya.png",
                    isDirectory: false,
                    size: 289296,
                    url: "https://konutkonfor-backend.dev.inity.com.tr/api/openoffice/cdn/konutkonfor-dev?filePath=konutkonfor/ziya.png",
                  },
                ],
                size: 0,
                url: "",
              },
            ]}
          />
        }
      ></Route>
    </Routes>
  );
};

export default FileManagerPage;
