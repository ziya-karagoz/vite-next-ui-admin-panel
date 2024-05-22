import { useEffect, useState } from "react";
import {
  FileManager,
  Permissions,
  Toolbar,
  Item,
  FileSelectionItem,
  ContextMenu,
} from "devextreme-react/file-manager";
import { Popup } from "devextreme-react";
import { useDispatch, useSelector } from "react-redux";

import "devextreme/dist/css/dx.dark.css";


import FileManagerLoader from "../components/Loader";
import { FetchStatus } from "@base/enums/api.enum";
import { AppDispatch, RootState } from "@app/store";
import { createFolderThunk, deleteFilesThunk, fetchFilesThunk, renameFilesThunk, uploadFilesThunk } from "@app/store/file-browser/thunks";
import { Button } from "@nextui-org/react";

type Props = {
  setSelectedFileUrl?: (url: string) => void;
};

function FileBrowser({ setSelectedFileUrl }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [popupVisible, setPopupVisible] = useState(false);
  const [imageItemToDisplay, setImageItemToDisplay] = useState<
    { name: string; url: string } | undefined
  >();
  const hideImagePopup = () => {
    setPopupVisible(false);
  };
  const displayImagePopup = (e: any) => {
    setPopupVisible(true);
    setImageItemToDisplay({ name: e.file.name, url: e.file.dataItem.url });
  };
  const [refresh, setrefresh] = useState(false);
  const [onLoad, setOnLoad] = useState(false);
  const [currentPath, setCurrentPath] = useState(
    localStorage.getItem("currentPath") ?? "/konutkonfor"
  );
  const { filesStatus } = useSelector((state: RootState) => state.fileBrowser);
  const customizeIcon = (fileSystemItem: any) => {
    if (fileSystemItem.isDirectory) {
      return "/assets/filemaneger/folder-icon.svg";
    }

    const fileExtension = fileSystemItem.getFileExtension();
    switch (fileExtension) {
      case ".jpeg":
        return "/assets/filemaneger/img-icon.svg";
      case ".png":
        return "/assets/filemaneger/img-icon.svg";
      case ".docs":
        return "/assets/filemaneger/docs-icon.svg";
      case ".pdf":
        return "/assets/filemaneger/pdf-icon.svg";
      case ".xlsx":
        return "/assets/filemaneger/excel-icon.svg";
      case ".svg":
        return "/assets/filemaneger/img-icon.svg";
      default:
        return "/assets/filemaneger/img-icon.svg";
    }
  };

  useEffect(() => {
    dispatch(fetchFilesThunk());
  }, [dispatch, refresh, onLoad]);

  return filesStatus !== FetchStatus.SUCCEEDED || onLoad ? (
    <FileManagerLoader />
  ) : (
    <div >
        <FileManager
          fileSystemProvider={JSON.parse(localStorage.getItem("files") ?? "[]")}
          currentPath={currentPath}
          onCurrentDirectoryChanged={function (e: any) {
            localStorage.setItem("currentPath", e.directory.key);
            setCurrentPath(e.directory.key);
          }}
          onToolbarItemClick={(e: any) => {
            if (e.itemData === "refresh") {
              setrefresh(!refresh);
            }
          }}
          onFileUploaded={async (e: any) => {
            setOnLoad(true);
            await dispatch(
              uploadFilesThunk({
                file: e.fileData,
                pathname: e.parentDirectory.path,
              })
            );
            setOnLoad(false);
          }}
          onItemDeleting={async (e: any) => {
            setOnLoad(true);
            await dispatch(deleteFilesThunk({ filename: e.item.path }));
            setOnLoad(false);
          }}
          onItemRenaming={async (e: any) => {
            setOnLoad(true);
            await dispatch(
              renameFilesThunk({
                oldName: e.item.path,
                newName: `${e.item.parentPath}/${e.newName}`,
              })
            );
            setOnLoad(false);
          }}
          onDirectoryCreated={async (e) => {
            setOnLoad(true);
            await dispatch(
              createFolderThunk({
                folder_path: `${e.parentDirectory.path}/${e.name}`,
              })
            );
            setOnLoad(false);
          }}
          onSelectedFileOpened={displayImagePopup}
          customizeThumbnail={customizeIcon}
        >
          <Permissions
            delete={true}
            rename={true}
            upload={true}
            download={true}
            create={true}
          ></Permissions>
          <Toolbar>
            <Item name="showNavPane" visible={true} />
            <Item name="separator" />
            <Item
              name="create"
              icon=""
              cssClass="bi bi-folder-plus"
              text="Yeni Klasör"
            />
            <Item name="upload" text="Yeni dosya" />
            <Item widget="dxMenu" location="before" />
            <Item name="refresh" />
            <Item name="separator" location="after" />
            <Item name="switchView" />
            <FileSelectionItem name="rename" text="Yeniden adlandır" />
            <FileSelectionItem name="separator" />
            <FileSelectionItem name="delete" text="Sil" />
            <FileSelectionItem name="separator" />
            <FileSelectionItem widget="dxMenu" location="before" />
            <FileSelectionItem name="refresh" />
            <FileSelectionItem name="clearSelection" text="Seçimi temizle" />
          </Toolbar>

          <ContextMenu>
            <Item name="create" text="Yeni klasör" />
            <Item name="rename" text="Yeniden adlandır" />
            <Item name="upload" text="Yeni dosya" />
            <Item name="refresh" beginGroup={true} text="Yenile" />
          </ContextMenu>
        </FileManager>
        <Popup
          maxHeight={600}
          hideOnOutsideClick={true}
          title={imageItemToDisplay?.name}
          onHiding={hideImagePopup}
          visible={popupVisible}
          className="photo-popup-content"
        >
          <div className="row">
            <div className="col-md-6 text-center">
              <img
                alt=""
                style={{
                  maxWidth: "60%",
                  maxHeight: "400px",
                  objectFit: "contain",
                }}
                src={imageItemToDisplay?.url}
                className="photo-popup-image"
              />
            </div>
            <div className="col-md-6">
              {imageItemToDisplay?.name}
              <div className="mt-3">
                <Button
                  onClick={() => {
                    if (setSelectedFileUrl)
                      setSelectedFileUrl(imageItemToDisplay?.url ?? "");
                    setPopupVisible(false);
                  }}
                >
                  Resmi Seç
                </Button>
              </div>
            </div>
          </div>
        </Popup>
      </div>
  );
}

export default FileBrowser;
