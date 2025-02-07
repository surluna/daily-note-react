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
  onNotesChange?: () => void; // 触发父组件刷新
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onNotesChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(note.content);
  const [editDate, setEditDate] = useState(note.date);
  const [loading, setLoading] = useState(false);

  // **更新笔记**
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/notes/${note._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: editDate, content: editContent }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsEditing(false);
        onNotesChange?.(); // 触发父组件刷新
      } else {
        console.error("❌ 更新失败:", data.message);
      }
    } catch (error) {
      console.error("🔥 更新请求错误:", error);
    }
    setLoading(false);
  };

  // **删除笔记**
  const handleDelete = async () => {
    if (!confirm("确定要删除这条笔记吗？")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/notes/${note._id}`, { method: "DELETE" });

      if (res.ok) {
        onNotesChange?.(); // 触发父组件刷新
      } else {
        console.error("❌ 删除失败");
      }
    } catch (error) {
      console.error("🔥 删除请求错误:", error);
    }
    setLoading(false);
  };

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
              onClick={handleDelete}
              disabled={loading}
              className="p-2 bg-red-500 rounded-full hover:bg-opacity-80 transition"
            >
              <DeleteOutlined className="text-white text-xl" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleUpdate}
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
