import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "@/components/editor/styles.css";

type EditorProps = {
  value: string;
  onChangeValue: (value: string) => void;
};

const Editor = ({ value, onChangeValue }: EditorProps) => {
  return (
    <div>
      <ReactQuill
        value={value}
        onChange={(value) => onChangeValue(value)}
        placeholder="Enter your description"
      />
    </div>
  );
};

export default Editor;
