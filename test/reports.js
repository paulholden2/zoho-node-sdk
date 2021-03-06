const zoho = require('../');
const async = require('async');

async.waterfall([
  (callback) => {
    zoho.reports(process.env.ZOHO_REPORTS_EMAIL_ID, process.env.ZOHO_REPORTS_AUTHTOKEN, (err, reports) => {
      if (err) {
        return callback(err);
      }

      callback(null, reports);
    });
  },
  (reports, callback) => {
    reports.table('Test', 'Zoho Tickets', (err, t) => {
      if (err) {
        return callback(err);
      }

      callback(null, t);
    });
  },
  (t, callback) => {
    t.addrow({
      'Status': 'Open',
      'Ticket Subject': 'Ticket #1',
      'Ticket Owner': 'John Doe',
      'Ticket Created Time': '12/01/2017 09:35 AM',
      'Reference Id': 1234567890
    }, (err, result) => {
      if (err) {
        return callback(err);
      }

      console.log(result);
      callback();
    });
  }
], (err) => {
  if (err) {
    console.log(err);
  }
});
