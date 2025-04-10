'use client';

import { useState } from 'react';
import { IoSearchCircle } from "react-icons/io5"; // ตรวจสอบว่า import มาจาก react-icons/io5

export default function SearchBarShopping() {
  const mockUpKeyWord: string[] = [
    "apple", "banana", "cherry", "date", "elephant", "forest", "grape", "house", "island", "jungle",
    "kangaroo", "lemon", "mountain", "notebook", "ocean", "penguin", "quokka", "river", "sunset", "tree",
    "umbrella", "volcano", "whale", "xylophone", "yacht", "zebra"
  ];
  

  const [searchItem, setSearchItem] = useState('');
  const [filteredResults, setFilteredResults] = useState<string[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchItem(value);

    if (value.trim() === '') {
      setFilteredResults([]);
    } else {
      setFilteredResults(
        mockUpKeyWord.filter((keyword: string) =>
          keyword.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        )
      );
    }
  };

  const handleSelect = (keyword: string) => {
    setSearchItem(keyword);
    setFilteredResults([]);
  };

  return (
    <section className="relative mx-auto mt-5 w-80">
      {/* กล่อง input และ dropdown ควรอยู่ใน relative container */}
      <div className="relative">
        {/* Input */}
        <input
          type="text"
          id="search-Item"
          placeholder="Search . . ."
          autoComplete="off"
          className="w-full pr-12 border bg-white p-2 text-sm rounded-full border-gray-300  inset-shadow-sm  focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-300"
          value={searchItem}
          onChange={handleSearchChange}
        />
        
        {/* ไอคอนค้นหา */}
        <IoSearchCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-7 h-7 text-gray-500 cursor-pointer" />

        {/* กล่องsearch  */}
        {filteredResults.length > 0 && (
          <div className="absolute left-0 w-full mt-2 rounded-xl border border-gray-300 bg-white shadow-lg z-10">
            <ul className="list-none p-2">
              {filteredResults.map((keyword, index) => (
                <li
                  key={index}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                  onClick={() => handleSelect(keyword)}
                >
                  {keyword}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
