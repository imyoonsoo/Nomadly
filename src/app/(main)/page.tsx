// 추가
"use client";

import Pagination from "@/components/Pagination/Pagination";
import { useState } from "react";

const Home = () => {
  const [page, setPage] = useState(1);

  return (
    <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
  );
};

export default Home;
