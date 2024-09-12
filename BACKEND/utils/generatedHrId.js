const HR = require('../models/HRUser');

async function generateHrId() {
  const lastHr = await HR.findOne().sort({ hrId: -1 }).exec();
  let newId = 'HR01';

  if (lastHr) {
    const lastId = parseInt(lastHr.hrId.substring(2), 10);
    newId = `HR${String(lastId + 1).padStart(2, '0')}`;
  }

  return newId;
}

module.exports = generateHrId;
