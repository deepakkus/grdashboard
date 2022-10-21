// const myarr = [
//   1,
//   2,
//   3,
//   4,
//   5,
//   6,
//   7,
//   8,
//   9,
//   10,
//   11,
//   12,
//   13,
//   14,
//   15,
//   16,
//   17,
//   18,
//   19,
//   20,
//   21,
//   22,
//   23,
// ];
// const get_7d_data = (arr) => {
//   return arr.slice();
// };
// const get_4weeks_data = (arr) => {
//   let newArr = [];
//   for (let step = 0; step < arr.length; step += 7) {
//     newArr.push(arr[step]);
//   }
//   return newArr;
// };

// console.log(get_4weeks_data(myarr));

// const get_12Months_data = (arr) => {
//   let newArr = [];
//   for (let step = 0; step < arr.length; step += 30) {
//     newArr.push(arr[step]);
//   }
//   return newArr;
// };

export const data = [
  {
    id: 1,
    name: "Nitrogen",
    info: {
      H:
        "High nitrogen. Grow root/shoot/fruit intensive plants such as carrot, mustard, lettuce, spinach.",
      min: 280,
      L:
        "Low nitrogen. Apply nitrogen based fertilizer. Grow nitrogen fixating plants. fkjnfkjgndfgndkfgn",
      max: 560,

      scientific_name: "generic",
    },
    data: [
      { ranges: 350, YAxis: 250 },
      { ranges: 300, YAxis: 300 },
      { ranges: 500, YAxis: 350 },
      { ranges: 300, YAxis: 400 },
      { ranges: 500, YAxis: 450 },
      { ranges: 350, YAxis: 500 },
      { ranges: 450, YAxis: 550 },
      { ranges: 450, YAxis: 600 },
    ],
  },
  {
    id: 2,
    name: "Phosphorus",
    info: {
      H:
        "High phosphorus. Avoid manures, check for Iron and Zinc requirements. Grow forage crop.",
      min: 120,
      L: "Low Phosphorus. Apply phosphorus based fertilizer.",
      max: 250,
    },
    data: [
      { ranges: 20, YAxis: 0 },
      { ranges: 10, YAxis: 10 },
      { ranges: 20, YAxis: 20 },
      { ranges: 10, YAxis: 30 },
      { ranges: 20, YAxis: 40 },
      { ranges: 10, YAxis: 50 },
      { ranges: 20, YAxis: 60 },
      { ranges: 10, YAxis: 70 },
    ],
  },
  {
    id: 3,
    name: "Potassium",
    info: {
      H:
        "High potassium. Till the land, break hard soil and remove rocks and pebbles. Grow forage crop.",
      min: 20,
      L: "Low potassium. Apply potassium based fertilizer.",
      max: 75,
    },
    data: [
      { ranges: 20, YAxis: 0 },
      { ranges: 10, YAxis: 10 },
      { ranges: 20, YAxis: 20 },
      { ranges: 10, YAxis: 30 },
      { ranges: 20, YAxis: 40 },
      { ranges: 10, YAxis: 50 },
      { ranges: 20, YAxis: 60 },
      { ranges: 10, YAxis: 70 },
    ],
  },
  {
    id: 4,
    name: "Salinity",
    info: {
      H: "High salinity. Apply leaching to the soil",
      min: 0,
      L: "Low salinity. Apply salt",
      max: 2.5,
    },
    data: [
      { ranges: 1.2 },
      { ranges: 2 },
      { ranges: 1.2 },
      { ranges: 1 },
      { ranges: 1 },
      { ranges: 2 },
      { ranges: 1.2 },
      { ranges: 1 },
    ],
  },
  {
    id: 5,
    name: "SoilTemp",
    info: {
      H: "High soil temperature. Plant weeds and avoid sunlight.",
      min: 0,
      L: "Low soil temperature. Upturn top soil and enhance direct sunlight",
      max: 35,
    },
    data: [
      { ranges: 20, YAxis: 0 },
      { ranges: 10, YAxis: 5 },
      { ranges: 20, YAxis: 10 },
      { ranges: 10, YAxis: 15 },
      { ranges: 20, YAxis: 20 },
      { ranges: 10, YAxis: 25 },
      { ranges: 20, YAxis: 30 },
      { ranges: 10, YAxis: 35 },
    ],
  },
  {
    id: 6,
    name: "Ph",
    info: {
      H: "High pH. Apply Sulphur or gypsum.",
      min: 5.5,
      L: "Low pH. Apply limestone, etc",
      max: 8.5,
    },
    data: [
      { ranges: 6.5, YAxis: 5 },
      { ranges: 7.5, YAxis: 5.5 },
      { ranges: 6.5, YAxis: 6 },
      { ranges: 8, YAxis: 6.5 },
      { ranges: 7.5, YAxis: 7 },
      { ranges: 6.5, YAxis: 7.5 },
      { ranges: 8, YAxis: 8 },
      { ranges: 7.5, YAxis: 8.5 },
    ],
  },
  {
    id: 7,
    name: "Moisture",
    info: {
      H:
        "High moisture. Apply management practice such as drainage renovation and regulated irrigation, grow single crop and cut unnecessary trees",
      min: 0,
      L: "Low moisture. Apply management practice such as conservation tillage",
      max: 70,
    },
    data: [
      { ranges: 20, YAxis: 0 },
      { ranges: 10, YAxis: 10 },
      { ranges: 20, YAxis: 20 },
      { ranges: 10, YAxis: 30 },
      { ranges: 20, YAxis: 40 },
      { ranges: 10, YAxis: 50 },
      { ranges: 20, YAxis: 60 },
      { ranges: 10, YAxis: 70 },
    ],
  },
  {
    id: 8,
    name: "Respiration",
    info: {
      H: "High respiraton. Increase plant density.",
      min: 0,
      L: "Low plant respiration. Decrease plant density, upturn top soil",
      max: 50,
    },
    data: [
      { ranges: 20, YAxis: 0 },
      { ranges: 10, YAxis: 5 },
      { ranges: 20, YAxis: 10 },
      { ranges: 10, YAxis: 15 },
      { ranges: 20, YAxis: 20 },
      { ranges: 10, YAxis: 25 },
      { ranges: 20, YAxis: 30 },
      { ranges: 10, YAxis: 35 },
    ],
  },

  {
    id: 9,
    name: "Aeration",
    info: {
      H: "High aeration. Remove pebbles and stones",
      min: 0,
      L: "Low aeration. Upturn top soil. Apply pebbles and sand in soil",
      max: 50,
    },
    data: [
      { ranges: 20, YAxis: 0 },
      { ranges: 10, YAxis: 5 },
      { ranges: 20, YAxis: 10 },
      { ranges: 10, YAxis: 15 },
      { ranges: 20, YAxis: 20 },
      { ranges: 10, YAxis: 25 },
      { ranges: 20, YAxis: 30 },
      { ranges: 10, YAxis: 35 },
    ],
  },
];

// const formateddData = data.map((item, ranges) => {
//   for (var key in ranges) {
//     let val = item.name[key];
//   }
//   return console.log(val);
// });
export const ranges = {
  salinity: {
    H: "High salinity. Apply leaching to the soil",
    min: 0,
    L: "Low salinity. Apply salt",
    max: 2.5,
  },

  solarRad: {
    H: "High solar radiation. Avoid sunlight or other light sources.",
    min: 0,
    L: "Low solar radiation. Expose to sunlight or other light sources.",
    max: 75000,
  },

  airTemp: {
    H: "High air temperature. Avoid sunlight",
    min: 0,
    L: "Low air temperature. Increase direct sunlight ",
    max: 40,
  },

  other: {
    recommendation:
      "Look after each plant. Feed nutrient & water, watch for pests",
  },

  aeration: {
    H: "High aeration. Remove pebbles and stones",
    min: 0,
    L: "Low aeration. Upturn top soil. Apply pebbles and sand in soil",
    max: 50,
  },

  potassium: {
    H:
      "High potassium. Till the land, break hard soil and remove rocks and pebbles. Grow forage crop.",
    min: 20,
    L: "Low potassium. Apply potassium based fertilizer.",
    max: 75,
  },

  moisture: {
    H:
      "High moisture. Apply management practice such as drainage renovation and regulated irrigation, grow single crop and cut unnecessary trees",
    min: 0,
    L: "Low moisture. Apply management practice such as conservation tillage",
    max: 70,
  },

  soilTemp: {
    H: "High soil temperature. Plant weeds and avoid sunlight.",
    min: 0,
    L: "Low soil temperature. Upturn top soil and enhance direct sunlight",
    max: 35,
  },

  respiration: {
    H: "High respiraton. Increase plant density.",
    min: 0,
    L: "Low plant respiration. Decrease plant density, upturn top soil",
    max: 50,
  },

  phosphorus: {
    H:
      "High phosphorus. Avoid manures, check for Iron and Zinc requirements. Grow forage crop.",
    min: 120,
    L: "Low Phosphorus. Apply phosphorus based fertilizer.",
    max: 250,
  },

  pH: {
    H: "High pH. Apply Sulphur or gypsum.",
    min: 5.5,
    L: "Low pH. Apply limestone, etc",
    max: 8.5,
  },

  variety: "unique",
  humidity: {
    H: "High humidity. Improve drainage, decrease plant density.",
    min: 0,
    L: "Low humidity. Apply water.",
    max: 85,
  },

  nitrogen: {
    H:
      "High nitrogen. Grow root/shoot/fruit intensive plants such as carrot, mustard, lettuce, spinach.",
    min: 280,
    L:
      "Low nitrogen. Apply nitrogen based fertilizer. Grow nitrogen fixating plants. rohananamnan",
    max: 560,

    scientific_name: "generic",
  },
};

// let arr = [
//   { a: 1, b: 1, c: 1 },
//   { a: 1, b: 1, c: 1, d: 2 },
//   { a: 3, b: 3, c: 3 },
// ];
// const obj = { a: 1, b: 1, c: 1, d: 2 };
// let newArr1 = [];
// let newArr = arr.map((item, obj, newArr1) => {
//   for (var key in obj) {
//     let val = item[key];
//     return newArr1.push({ val, name: "name" });
//     // return newArr.push({ val, name: "name" });
//   }
// });
// console.log({ newArr1 });
// console.log({ newArr });

let data_7d = [
  {
    salinity: "2.07",
    solarRad: "24711.09",
    devices: ["14fbedaf-1b14-49f3-93ab-f3e405ab3e0d"],
    airTemp: "18.69",
    aeration: "24.96",
    potassium: "176.88666666666666",
    num_devices: "1",
    moisture: "56.56",
    soilTemp: "20.603333333333335",
    farmId: "demo_farm_1",
    date: "2020-07-13",
    respiration: "41.57",
    pressure: "138.12333333333333",
    userId: "demo_user_sensegrass",
    phosphorus: "19.05666666666667",
    pH: "7.56",
    humidity: "45.08",
    nitrogen: "513.03",
    "evapotranspiration(ET)": "34.3",
  },
  {
    salinity: "1.4466666666666665",
    solarRad: "23048.98",
    devices: ["14fbedaf-1b14-49f3-93ab-f3e405ab3e0d"],
    airTemp: "23.09",
    aeration: "32.04",
    potassium: "167.97666666666666",
    num_devices: "1",
    moisture: "47.626666666666665",
    soilTemp: "21.763333333333335",
    farmId: "demo_farm_1",
    date: "2020-07-12",
    respiration: "29.3",
    pressure: "131.32666666666668",
    userId: "demo_user_sensegrass",
    phosphorus: "22.123333333333335",
    pH: "7.609999999999999",
    humidity: "36.72",
    nitrogen: "418.9766666666667",
    "evapotranspiration(ET)": "35.74",
  },
  {
    salinity: "1.0899999999999999",
    solarRad: "51037.4",
    devices: ["14fbedaf-1b14-49f3-93ab-f3e405ab3e0d"],
    airTemp: "19.48",
    aeration: "29.48",
    potassium: "166.19333333333336",
    num_devices: "1",
    moisture: "37.21333333333333",
    soilTemp: "19.78333333333333",
    farmId: "demo_farm_1",
    date: "2020-07-11",
    respiration: "32.33",
    pressure: "141.96333333333334",
    userId: "demo_user_sensegrass",
    phosphorus: "24.87",
    pH: "7.47",
    humidity: "53.82",
    nitrogen: "407.04333333333335",
    "evapotranspiration(ET)": "43.12",
  },
  {
    salinity: "1.7",
    solarRad: "25375.79",
    devices: ["14fbedaf-1b14-49f3-93ab-f3e405ab3e0d"],
    airTemp: "21.02",
    aeration: "27.41",
    potassium: "164.83333333333334",
    num_devices: "1",
    moisture: "43.843333333333334",
    soilTemp: "19.493333333333336",
    farmId: "demo_farm_1",
    date: "2020-07-10",
    respiration: "22.64",
    pressure: "146.29666666666665",
    userId: "demo_user_sensegrass",
    phosphorus: "18.133333333333336",
    pH: "6.416666666666667",
    humidity: "61.64",
    nitrogen: "380.14333333333326",
    "evapotranspiration(ET)": "28.25",
  },
  {
    salinity: "1.9033333333333335",
    solarRad: "39938.18",
    devices: ["14fbedaf-1b14-49f3-93ab-f3e405ab3e0d"],
    airTemp: "22.54",
    aeration: "26.26",
    potassium: "161.11333333333334",
    num_devices: "1",
    moisture: "56.28",
    soilTemp: "21.11",
    farmId: "demo_farm_1",
    date: "2020-07-09",
    respiration: "22.44",
    pressure: "133.84",
    userId: "demo_user_sensegrass",
    phosphorus: "17.343333333333334",
    pH: "7.283333333333334",
    humidity: "45.0",
    nitrogen: "488.52666666666664",
    "evapotranspiration(ET)": "29.32",
  },
];

let formated_data_7d = data_7d.map((item) => {
  let innerArr = [];
  for (var key in item) {
    let val = item[key];
    innerArr.push({ ranges: val, name: key });
    // return { ranges: val, name: key };
  }
  return innerArr;
});
console.log(formated_data_7d);
// let formated_data_7d_2 = formated_data_7d.map(arr => {

// })
let airTemp_val = data_7d.map((item) => {
  return { value: item.nitrogen };
});
console.log({ airTemp_val });

export const makeGraphData = (arr, ranges) => {
  let nitrogen_val =
    // method(
    arr.map((item, indx) => {
      return { value: item.nitrogen, day: `day${indx + 1}` };
    });

  // );
  let phosphorus_val =
    // method(
    arr.map((item, indx) => {
      return { value: item.phosphorus, day: `day${indx + 1}` };
    });

  // );
  let potassium_val =
    // method(
    arr.map((item, indx) => {
      return { value: item.potassium, day: `day${indx + 1}` };
    });

  // );
  let salinity_val =
    // method(
    arr.map((item, indx) => {
      return { value: item.salinity, day: `day${indx + 1}` };
    });

  // );
  let soilTemp_val =
    // method(
    arr.map((item, indx) => {
      return { value: item.soilTemp, day: `day${indx + 1}` };
    });

  // );
  let pH_val =
    // method(
    arr.map((item, indx) => {
      return { value: item.pH, day: `day${indx + 1}` };
    });

  // );
  let moisture_val =
    // method(
    arr.map((item, indx) => {
      return { value: item.moisture, day: `day${indx + 1}` };
    });

  // );
  let respiration_val =
    // method(
    arr.map((item, indx) => {
      return { value: item.respiration, day: `day${indx + 1}` };
    });

  // );
  let aeration_val =
    // method(
    arr.map((item, indx) => {
      return { value: item.aeration, day: `day${indx + 1}` };
    });
  let airTemp_val =
    // method(
    arr.map((item, indx) => {
      return { value: item.airTemp, day: `day${indx + 1}` };
    });
  let humidity_val =
    // method(
    arr.map((item, indx) => {
      return { value: item.humidity, day: `day${indx + 1}` };
    });
  let solarRad_val =
    // method(
    arr.map((item, indx) => {
      return { value: item.solarRad, day: `day${indx + 1}` };
    });
  let pressure_val =
    // method(
    arr.map((item, indx) => {
      return { value: item.pressure, day: `day${indx + 1}` };
    });

  let evapotranspiration =
    // method(
    arr.map((item, indx) => {
      return { value: item["evapotranspiration(ET)"], day: `day${indx + 1}` };
    });
  console.log({ arr });
  // );
  console.log(ranges && ranges.nitrogen);
  return [
    {
      id: 1,
      name: "Nitrogen",
      info: ranges && ranges.nitrogen,
      data: nitrogen_val,
    },
    {
      id: 2,
      name: "Phosphorus",
      info: ranges && ranges.phosphorus,
      data: phosphorus_val,
    },
    {
      id: 3,
      name: "Potassium",
      info: ranges && ranges.potassium,
      data: potassium_val,
    },
    {
      id: 4,
      name: "Salinity",
      info: ranges && ranges.salinity,
      data: salinity_val,
    },
    {
      id: 5,
      name: "SoilTemp",
      info: ranges && ranges.soilTemp,
      data: soilTemp_val,
    },
    {
      id: 6,
      name: "Ph",
      info: ranges && ranges.pH,
      data: pH_val,
    },
    {
      id: 7,
      name: "Moisture",
      info: ranges && ranges.moisture,
      data: moisture_val,
    },
    {
      id: 8,
      name: "Respiration",
      info: ranges && ranges.respiration,
      data: respiration_val,
    },

    {
      id: 9,
      name: "Aeration",
      info: ranges && ranges.aeration,
      data: aeration_val,
    },
    {
      id: 10,
      name: "AirTemp",
      info: ranges && ranges.airTemp,
      data: airTemp_val,
    },
    {
      id: 11,
      name: "Humidity",
      info: ranges && ranges.humidity,
      data: humidity_val,
    },
    {
      id: 12,
      name: "SolarRad",
      info: ranges && ranges.solarRad,
      data: solarRad_val,
    },
    {
      id: 13,
      name: "Pressure",
      info: ranges && ranges.pressure,
      data: pressure_val,
    },
    {
      id: 14,
      name: "evapotranspiration",
      info: ranges && ranges["evapotranspiration(ET)"],
      data: evapotranspiration,
    },
  ];
};

// console.log(makeGraphData(data_7d));
// export const graphData = makeGraphData(
//   data_7d,
//   get_4weeks_data,
//   get_12Months_data,
//   get_7d_data,
//   ""
// );

// let type = "";
// let method = () => {};
// switch (type) {
//   case "data_1M":
//     method = get_4weeks_data;
//     break;
//   case "data_1Y":
//     method = get_4weeks_data;
//     break;
//   default:
//     method = get_7d_data;
// }
// console.log({ method });

// export const mountGraphData = (data_7d, data_1M, data_1Y, type) => {
//   switch (type) {
//     case "data_1M":
//       return makeGraphData(
//         data_1M,
//         get_4weeks_data,
//         get_12Months_data,
//         get_7d_data,
//         "data_1M"
//       );
//       break;
//     case "data_1Y":
//       return makeGraphData(
//         data_1Y,
//         get_4weeks_data,
//         get_12Months_data,
//         get_7d_data,
//         "data_1Y"
//       );
//       break;
//     default:
//       return makeGraphData(
//         data_7d,
//         get_4weeks_data,
//         get_12Months_data,
//         get_7d_data,
//         ""
//       );
//   }
// };

export const mountGraphData = (data_7D, data_1M, data_1Y, type, ranges) => {
  switch (type) {
    case "data_1M":
      return makeGraphData(data_1M, ranges);
    // break;
    case "data_1Y":
      return makeGraphData(data_1Y, ranges);
    // break;
    default:
      return makeGraphData(data_7D, ranges);
  }
};

// let arr = [
//   { name: "dvsd", age: 25 },
//   { name: "dvsd", age: 22 },
//   { name: "dvsd", age: 33 },
//   { name: "dvsd", age: 44 },
// ];
// arr.map((item) => {
//   return item.age;
// });
