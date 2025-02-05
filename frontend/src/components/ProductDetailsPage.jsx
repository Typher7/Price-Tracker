import React from "react";
import ApexCharts from "react-apexcharts";

const ProductDetailsPage = ({ product }) => {
  const {
    name,
    url: productUrl,
    img,
    source,
    created_at: createdAt,
    priceHistory,
  } = product;

  function formatDate(date) {
    var aaaa = date.getFullYear();
    var gg = date.getDate();
    var mm = date.getMonth() + 1;

    if (gg < 10) gg = "0" + gg;
    if (mm < 10) mm = "0" + mm;

    var cur_day = aaaa + "-" + mm + "-" + gg;

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    return cur_day + " " + hours + ":" + minutes + ":" + seconds;
  }

  const dates = priceHistory
    .map((history) => formatDate(new Date(history.date)))
    .reverse();
  const prices = priceHistory.map((history) => history.price).reverse();

  const chartData = {
    options: {
      chart: {
        id: "price-chart",
      },
      xaxis: {
        categories: dates,
      },
    },
    series: [
      {
        name: "Price",
        data: prices,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{name}</h2>
      <img
        src={img}
        alt="Product"
        className="h-40 object-cover rounded-lg mb-6"
      />
      <div className="space-y-4">
        <p className="text-gray-700">
          URL:{" "}
          <a
            href={`${source}${productUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View product
          </a>
        </p>
        <p className="text-gray-700">
          Source:{" "}
          <a
            href={source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {source}
          </a>
        </p>
        <p className="text-gray-700">
          Latest Price At:{" "}
          <span className="font-semibold">{createdAt}</span>
        </p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Price History</h2>
        <h3 className="text-xl text-gray-700 mb-6">
          Current Price:{" "}
          <span className="font-bold text-green-600">
            ${prices.length > 0 ? prices[prices.length - 1] : "N/A"}
          </span>
        </h3>
        <ApexCharts
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={300}
          className="bg-gray-50 p-4 rounded-lg shadow-sm"
        />
      </div>
    </div>
  );
};

export default ProductDetailsPage;