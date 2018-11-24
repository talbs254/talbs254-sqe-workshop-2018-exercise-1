import $ from 'jquery';
import {parseCode} from './code-analyzer';
import {parsed_table} from './view';



$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        $('#parsedCode').val(JSON.stringify(parsedCode[0], null, 2));

        parsed_table(parsedCode[1]);
    });
});
