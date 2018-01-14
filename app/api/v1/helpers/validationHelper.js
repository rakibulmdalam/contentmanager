/**
* Validation helper for API inputs.
*
* @author rakib, <rakib@travelso.me>
* @module api/v3
*/

// check for required input
var inputValidation = async function(req, requiredAtt, target) {
    target = target || 'body';
    if (target === 'body'){
        for (var att of requiredAtt) {
            req.checkBody(att, 'missing or invalid').notEmpty();
        }
    } else if (target === 'parameters'){
        for (var att of requiredAtt) {
            req.checkParams(att, 'missing or invalid').notEmpty();
        }
    } else if (target === 'cookies'){
        for (var att of requiredAtt) {
            req.checkCookies(att, 'missing or invalid').notEmpty();
        }
    } else if (target === 'query'){
        for (var att of requiredAtt) {
            req.checkQuery(att, 'missing or invalid').notEmpty();
        }
    } else if (target === 'headers'){
        for (var att of requiredAtt) {
            req.checkHeaders(att, 'missing or invalid').notEmpty();
        }
    }

    errors = req.validationErrors();
    if (errors) {
        //console.log(errors);
        return Promise.reject();
    } else {
        return Promise.resolve();
    }

};

module.exports = inputValidation;