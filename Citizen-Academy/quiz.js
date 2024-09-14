function sayHello(name){
    console.log('Hello ' + name)
}

sayHello('groupmates');

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://www.uscis.gov/';

const_questionData = {};


axios.get(url)
    .then(response => {
        const $ = cheerio.load(response.data);
        const text = $('p').text();
        console.log(text);

        /*
        $('p').each(index, element) => {
            const text = $(element).text();
            console.log(text)
        }
        */
    })









/*
server.listen(defineConfig, function(error)){



    if(error){
        console.log('Something went wrong', error)
    }

    else{
        console.log('Server is listening on port ' + port)
    }
}
    USCIS (U.S. Citizenship and Immigration Services)

The official government source for immigration services.
Website: uscis.gov
ImmigrationLawHelp

Provides resources for free or low-cost immigration legal services.
Website: immigrationlawhelp.org
The American Immigration Lawyers Association (AILA)

Provides advice and resources for immigrants and lawyers.
Website: aila.org
National Immigration Forum

Offers advocacy and educational information on U.S. immigration policy.
Website: immigrationforum.org

Since immigration is a sensitive legal area, it’s important to include a disclaimer that 
the quiz is informational and not legal advice.
 You can recommend that users consult a licensed immigration attorney for legal advice.
*/

