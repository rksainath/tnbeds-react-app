const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const moment = require('moment');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const DATA_URL = 'https://stopcorona.tn.gov.in/beds.php';

router.get('/:id', async (req, res) => {
  try {
    const refDate = moment()
      .startOf('day')
      .startOf('hour')
      .format('YYYY-MM-DD HH:mm:ss');

    let searchDistrict = req.params.id;
    searchDistrict = searchDistrict.toUpperCase();
    const result = await bedsAvailability().then(parseData).then(prepareData);

    // Beds
    const bedStatus = result
      .filter((data) => data.district === searchDistrict)
      .filter(
        (data) =>
          data.lastUpdated >= refDate &&
          (data.covidBedsVacant > 0 ||
            data.oxygenBedsVacant > 0 ||
            data.ventilatorVacant > 0 ||
            data.icuBedsVacant > 0 ||
            data.nonOxygenBedsVacant > 0)
      );

    if (bedStatus.length === 0) {
      res.json({
        msg: `There is NO update from the hospitals in ${searchDistrict} for today. If you still get this message often, Kindly recheck the spelling of the district that you have input or check for updates after some time.`,
      });
    } else {
      res.json(bedStatus);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

const bedsAvailability = async () => {
  try {
    const response = await fetch(DATA_URL);
    const responseText = await response.text();
    //   console.log(responseText);
    return responseText;
  } catch (error) {
    console.log('No data from API');
  }
};

const extractText = (node) => node.textContent.trim();
const processRow = (row) => Array.from(row.children).map(extractText);
const parseData = (goalsHTML) => {
  const dom = new JSDOM(goalsHTML);
  const rows = Array.from(
    dom.window.document.querySelectorAll('#dtBasicExample tbody tr')
  );
  const cells = rows.map(processRow);
  //   console.log(cells);
  return cells;
};

const categorizeData = (data) => {
  return {
    district: data[1].toUpperCase(),
    institution: data[2],
    covidBedsTotal: data[3],
    covidBedsOccupied: data[4],
    covidBedsVacant: data[5],
    oxygenBedsTotal: data[6],
    oxygenBedsOccupied: data[7],
    oxygenBedsVacant: data[8],
    nonOxygenBedsTotal: data[9],
    nonOxygenBedsOccupied: data[10],
    nonOxygenBedsVacant: data[11],
    icuBedsTotal: data[12],
    icuBedsOccupied: data[13],
    icuBedsVacant: data[14],
    ventilatorTotal: data[15],
    ventilatorOccupied: data[16],
    ventilatorVacant: data[17],
    lastUpdated: data[18],
    contactNumber: data[19],
    remarks: data[20],
  };
};
const prepareData = (rawData) => rawData.map(categorizeData);

module.exports = router;
