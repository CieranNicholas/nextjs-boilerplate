export function MerchTab() {
  const shows = [
    { date: "2023-07-15", venue: "The Grand Hall", city: "New York, NY" },
    { date: "2023-07-22", venue: "Starlight Arena", city: "Los Angeles, CA" },
    { date: "2023-07-29", venue: "Moonlight Theater", city: "Chicago, IL" },
  ];

  return (
    <div className="space-y-4">
      {shows.map((show, index) => (
        <div key={index} className="bg-white bg-opacity-10 p-4 rounded-lg">
          <p className="text-white font-semibold">
            {new Date(show.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-300">{show.venue}</p>
          <p className="text-gray-300">{show.city}</p>
        </div>
      ))}
    </div>
  );
}
