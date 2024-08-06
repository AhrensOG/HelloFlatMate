"use client";

import UpdateProperty from "@/app/components/owner/property_magnament/update/UpdateProperty";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

export default function UpdatePropertyPage() {
  const params = useSearchParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/property?id=${params.get("id")}`
        );
        setInitialData(response.data.property);
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };

    fetchData();
  }, [params]);

  // Muestra un mensaje de carga mientras se obtienen los datos
  if (!initialData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateProperty data={initialData} />
    </Suspense>
  );
}
