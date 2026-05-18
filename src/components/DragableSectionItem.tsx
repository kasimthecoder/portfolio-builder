import { Button } from "@/components/ui/button";
import { Section } from "@/store/slices/types";
import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";
import { useDispatch, useSelector } from "react-redux";
import { changeSelectedSection } from "@/store/slices/selectedSectionSlice";

interface DragableSectionItemProps {
  section: Section;
  id: string;
  index: number;
}

const DragableSectionItem = ({
  section,
  id,
  index,
}: DragableSectionItemProps) => {
  const { ref, handleRef, isDragging } = useSortable({ id, index });
  const selectedSection = useSelector((state: any) => state.selectedSection);
  const dispatch = useDispatch();
  return (
    <div
      ref={ref}
      className={`flex justify-between items-center w-full border cursor-pointer rounded-xl my-2 px-4 py-1 bg-card ${
        isDragging ? "opacity-50" : ""
      } ${selectedSection.id === id ? "border-black border-2" : ""}`}
      onClick={() => dispatch(changeSelectedSection(id))}
    >
      <p className="text-sm font-medium capitalize">
        {section.type} {index + 1}
      </p>
      <Button
        ref={handleRef}
        variant="outline"
        size="sm"
        className="cursor-move"
      >
        <GripVertical className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default DragableSectionItem;
