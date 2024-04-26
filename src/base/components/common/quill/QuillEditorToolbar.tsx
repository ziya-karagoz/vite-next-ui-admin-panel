import { Quill } from "react-quill";

export function undoChange() {
    window.Quill.history.undo();
}
export function redoChange() {
    window.Quill.history.redo();
}

const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

const Font = Quill.import("formats/font");
Font.whitelist = [
    "arial",
    "comic-sans",
    "courier-new",
    "georgia",
    "helvetica",
    "lucida"
];
Quill.register(Font, true);

