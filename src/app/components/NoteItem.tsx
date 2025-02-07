import { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";

interface Note {
  _id: string;
  date: string;
  content: string;
}

interface NoteItemProps {
  note: Note;
  onNotesChange?: () => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onNotesChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(note.content);
  const [editDate, setEditDate] = useState(note.date);
  const [loading, setLoading] = useState(false);

  return (
    <div
      id={`note-${note._id}`}
      className="relative bg-[#6f493d] p-4 rounded-2xl shadow-md text-[#e3be86] flex flex-col justify-between w-full h-64 max-w-[300px] mx-auto"
    >
      {/* 日期输入框/显示 */}
      <div className="flex justify-between items-center">
        {isEditing ? (
          <input
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            className="p-2 bg-[#f4e5ce] text-[#402e32] rounded-md border border-[#402e32] w-full"
          />
        ) : (
          <p className="text-[#f4e5ce] text-lg font-semibold">{note.date}</p>
        )}
      </div>

      {/* 笔记内容输入框/显示 */}
      {isEditing ? (
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="w-full min-h-[120px] p-2 bg-[#f4e5ce] text-[#402e32] rounded-md border border-[#402e32] resize-none mt-2"
        />
      ) : (
        <p className="bg-[#f4e5ce] text-[#402e32] p-3 h-32 rounded-md mt-2">
          {note.content}
        </p>
      )}

      {/* 操作按钮 */}
      <div className="flex justify-end space-x-3 mt-3">
        {!isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(true)}
              disabled={loading}
              className="p-2 bg-[#e3be86] rounded-full hover:bg-opacity-80 transition"
            >
              <EditOutlined className="text-[#402e32] text-xl" />
            </button>
            <button
              // onClick={handleDelete}
              disabled={loading}
              className="p-2 bg-red-500 rounded-full hover:bg-opacity-80 transition"
            >
              <DeleteOutlined className="text-white text-xl" />
            </button>
          </>
        ) : (
          <>
            <button
              // onClick={handleUpdate}
              disabled={loading}
              className="p-2 bg-green-500 rounded-full hover:bg-opacity-80 transition"
            >
              <SaveOutlined className="text-white text-xl" />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              disabled={loading}
              className="p-2 bg-gray-500 rounded-full hover:bg-opacity-80 transition"
            >
              <CloseOutlined className="text-white text-xl" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteItem;
