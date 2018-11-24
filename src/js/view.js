import $ from 'jquery';

window.jq = $;

let parse_table_columns = 5;
let index_to_label = {
    '0': 'Line',
    '1': 'Type',
    '2': 'Name',
    '3': 'Condition',
    '4': 'Value'
};

function parsed_table(parsed_rows){
    let tbl_body  = document.getElementById('tb');

    $('#parsed_table tbody').empty();

    for(let i = 0; i < parsed_rows.length; i++){
        let tr = document.createElement('tr');

        for(let j=0; j<parse_table_columns; j++){
            let td = document.createElement('td');
            let column = parsed_rows[i][index_to_label[j]];
            // tr.appendChild(document.createTextNode(column==undefined ? '':column));
            td.innerHTML = column==undefined ? '':column;
            tr.appendChild(td);
        }
        tbl_body.appendChild(tr);
    }
}

export {parsed_table};