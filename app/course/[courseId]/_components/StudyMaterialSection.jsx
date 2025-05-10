import React, { useEffect, useState } from "react";
import MaterialCardItem from "./MaterialCardItem";
import axios from "axios";
import Link from "next/link";

function StudyMaterialSection( {courseId }) {
  const MaterialList = [
    {
      name: "Notes/Chapters",
      desc: "Read concise chapter notes to prep faster",
      icon: "/notes.png",
      path: "/notes",
      type: "notes",
    },
    {
      name: "Flashcard",
      desc: "Flashcard help to remember the concepts",
      icon: "/flashcard.png",
      path: "/flashcards",
      type: "flashcard",
    },
    {
      name: "Quiz",
      desc: "Great way to test your knowledge",
      icon: "/quiz.png",
      path: "/quiz",
      type: "quiz",
    },
    {
      name: "Question/Answer",
      desc: "Practice with targeted Q/A sets",
      icon: "/qa.png",
      path: "/qa",
      type: "qa",
    },
  ];



  return (
    <div className="mt-5 w-full">
      <h2 className="font-medium text-xl">Study Material</h2>

      <div className="flex flex-wrap gap-5 items-center justify-center">
        {MaterialList.map((item, index) => (
          <Link key={index} href={"/course/" + courseId + item.path}>
            <MaterialCardItem
              item={item}
              key={index}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default StudyMaterialSection;
