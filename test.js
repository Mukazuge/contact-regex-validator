const fs = require('fs');
const faker = require('faker');
faker.locale = "en";

// uncomment to create data
// for (let i = 0; i < 1000; i++)
//     fs.appendFile('test.csv', faker.internet.url() + ',\n', function (err) {
//         if (err) throw err;
//     });
// for (let i = 0; i < 1000; i++)
//     fs.appendFile('test.csv', faker.internet.email() + ',\n', function (err) {
//         if (err) throw err;
//     });
// for (let i = 0; i < 1000; i++)
//     fs.appendFile('test.csv', faker.phone.phoneNumberFormat() + ',\n', function (err) {
//         if (err) throw err;
//     });
// for (let i = 0; i < 1000; i++)
//     fs.appendFile('test.csv', '@' + faker.name.firstName() + ',\n', function (err) {
//         if (err) throw err;
//     });

// read generated data
const lineReader = require('readline').createInterface({
    input: fs.createReadStream('test.csv')
});

const emailRegex = '(^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))' +
    '@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$)';
const phoneRegex = '(^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$)';
const domainRegex = '(https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*))';
const twitterRegex = '(^@?(\\w){1,15}$)';
const allRegex = `${phoneRegex}|${domainRegex}|${emailRegex}|${twitterRegex}`;

lineReader.on('line', function (line) {
    const data = line.split(',')[0];
    const pattern = new RegExp(allRegex);
    if(!pattern.test(data)) {
        console.log('doesn\'t match:', data);
    }
});
