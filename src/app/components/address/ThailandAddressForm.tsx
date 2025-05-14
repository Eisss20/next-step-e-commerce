'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ThailandAddressForm({
  onChange,
  province,
  setProvince,
  district,
  setDistrict,
  zip,
  setZip,
}: {
  onChange: (address: { province: string; district: string; zip: string }) => void;
  province: string;
  setProvince: (value: string) => void;
  district: string;
  setDistrict: (value: string) => void;
  zip: string;
  setZip: (value: string) => void;
}) {
  const [locationData, setLocationData] = useState<Record<string, Record<string, string>>>({});

  useEffect(() => {
    axios
      .get('/data/thailand-province-district-zipcode.json')
      .then((res) => setLocationData(res.data));
  }, []);

  useEffect(() => {
    setDistrict('');
    setZip('');
  }, [province, setDistrict, setZip]);

  useEffect(() => {
    if (province && district) {
      const zipCode = locationData[province]?.[district];
      setZip(zipCode || '');
      onChange({ province, district, zip: zipCode || '' });
    }
  }, [province, district, locationData, onChange, setZip]);

  const provinces = Object.keys(locationData);
  const districts = province ? Object.keys(locationData[province] || {}) : [];

  return (
    <div className="mt-8 space-y-4 border-t border-gray-200 pt-8">
      <h3 className="text-md font-bold text-gray-900">ตำแหน่งที่ตั้ง</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700">จังหวัด*</label>
        <select
          className="mt-1 w-full rounded border border-gray-300 p-2"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        >
          <option value="">เลือกจังหวัด</option>
          {provinces.map((prov) => (
            <option key={prov} value={prov}>
              {prov}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">อำเภอ*</label>
        <select
          className="mt-1 w-full rounded border border-gray-300 p-2"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          disabled={!province}
        >
          <option value="">เลือกอำเภอ</option>
          {districts.map((dist) => (
            <option key={dist} value={dist}>
              {dist}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">รหัสไปรษณีย์</label>
        <input
          className="mt-1 w-full rounded border border-gray-300 bg-gray-100 p-2 text-gray-700"
          type="text"
          value={zip}
          disabled
        />
      </div>
    </div>
  );
}
