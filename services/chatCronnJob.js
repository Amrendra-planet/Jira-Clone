const cron = require('node-cron');

function logMessage() {
    console.log('Cron job executed at:', new Date().toLocaleString());
}

const run = cron.schedule('*/5 * * * * *', () => {
    logMessage();
});

module.exports = run;