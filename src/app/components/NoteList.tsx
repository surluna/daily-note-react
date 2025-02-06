import NoteItem from "./NoteItem";

interface Note {
  _id: string;
  date: string;
  content: string;
}

interface NoteListProps {
  items: Note[];
  onNotesChange: () => void;
}

const NoteList: React.FC<NoteListProps> = ({ items, onNotesChange }) => {
  return (
    <div className="flex justify-center">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {items.length === 0 ? (
          <p className="col-span-3 text-center text-[#6f493d] text-lg">
            There are no notes at the moment. <br />
            How about creating one?
          </p>
        ) : (
          items.map((note) => (
            <li key={note._id} className="flex justify-center">
              <NoteItem note={note} onNotesChange={onNotesChange} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default NoteList;
