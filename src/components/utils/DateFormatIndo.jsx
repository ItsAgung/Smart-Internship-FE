const DateFormatIndo = (value) => {
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const date = new Date(value);
  const tanggal = date.getDate();
  const bulan = monthNames[date.getMonth()];
  const tahun = date.getFullYear();
  return `${tanggal} ${bulan} ${tahun}`;
};

export { DateFormatIndo };
