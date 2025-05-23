import { Button } from "@/components/ui/button";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
import React, { useState } from "react";

function MaterialCardItem({ item }) {
  return (
    <div
      className={`border shadow-md rounded-lg p-5 flex flex-col items-center w-[250px] 
     h-[250px]
    `}
    >
      <h2 className="p-1 px-2 bg-green-500 text-white rounded-full text-[10px] mb-2">
        Ready
      </h2>
      <img src={item.icon} alt={item.name} width={50} height={50} />
      <h2 className="font-medium mt-3">{item.name}</h2>
      <p className="text-gray-500 text-sm text-center">{item.desc}</p>

      <Button className="mt-3 w-full cursor-pointer" variant="outline">
        View
      </Button>
    </div>
  );
}

export default MaterialCardItem;
