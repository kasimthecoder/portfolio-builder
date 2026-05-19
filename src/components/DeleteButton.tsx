import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { deleteSection } from "@/store/slices/sectionsSlice";
import { changeSelectedSection } from "@/store/slices/selectedSectionSlice";

const DeleteButton = (props: any) => {
  const dispatch = useDispatch();
  const selectedSection = useSelector((state: any) => state.selectedSection.id);
  function handleDelete() {
    dispatch(deleteSection({ id: selectedSection }));
    dispatch(changeSelectedSection(""));
  }
  if (selectedSection === "") {
    return;
  }
  return (
    <div {...props}>
      {/* <Button onClick={handleDelete} variant={"destructive"}>
        Delete Section
      </Button> */}
    </div>
  );
};

export default DeleteButton;
