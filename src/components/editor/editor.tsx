import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "@/components/editor/styles.css";

type EditorProps = {
  value: string;
  onChangeValue: (value: string) => void;
  placeholder?: string;
};

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ link: "link" }, { image: "image" }],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "link",
  "image",
];

const Editor = ({ value, onChangeValue, placeholder = "Enter your description" }: EditorProps) => {
  return (
    <div>
      <ReactQuill
        value={value}
        onChange={(value) => onChangeValue(value)}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
