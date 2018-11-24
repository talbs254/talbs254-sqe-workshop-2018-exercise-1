import * as esprima from 'esprima';

let type_to_function_handler = {
    'Program': program_handler,
    'FunctionDeclaration': function_handler,
    'BlockStatement': block_handler,
    'VariableDeclaration': variable_handler,
    'AssignmentExpression': assignment_handler,
    'ExpressionStatement': expression_handler,
    'BinaryExpression': binary_handler,
    'UnaryExpression' : unary_handler,
    'UpdateExpression': update_handler,
    'Literal' : literal_handler,
    'Identifier' : identifier_handler,
    'MemberExpression': member_handler,
    'WhileStatement': while_handler,
    'ForStatement': for_handler,
    'IfStatement': if_handler,
    'ReturnStatement': return_handler
};


const parseCode = (codeToParse) => {
    let parsed_code = esprima.parseScript(codeToParse, {loc: true});
    let records = type_to_function_handler[parsed_code.type](parsed_code);
    return [parsed_code, records];
};

function program_handler(program_json) {
    let records = [];
    program_json.body.forEach(function (statement) {
        records = records.concat(type_to_function_handler[statement.type](statement));
    });
    return records;
}

function function_handler(function_json) {
    let records = [];
    records.push({
        'Line': function_json.loc.start.line,
        'Type': function_json.type,
        'Name': function_json.id.name,
    });
    function_json.params.forEach(function (param) {
        records.push({
            'Line': param.loc.start.line,
            'Type': param.type,
            'Name': param.name,
        });
    });
    records = records.concat(type_to_function_handler[function_json.body.type](function_json.body));
    return records;
}
function literal_handler(literal_json){
    return literal_json.value;
}
function identifier_handler(identifier_json){
    return identifier_json.name;
}

function member_handler(member_json){
    return member_json.object.name + '[' + type_to_function_handler[member_json.property.type](member_json.property) + ']';

}


function block_handler(block_json) {
    let records = [];
    block_json.body.forEach(function (param) {
        records = records.concat(type_to_function_handler[param.type](param));
    });

    return records;
}

function variable_handler(variable_json) {
    let records = [];
    variable_json.declarations.forEach(function (variable) {
        let value=null;
        if(variable.init!=null)
            value = type_to_function_handler[variable.init.type](variable.init);
        let to_string = value ==null ? '': variable.id.name + '=' + value;
        records.push({
            'Line': variable.id.loc.start.line,
            'Type': 'Variable Declaration',
            'Name': variable.id.name,
            'Value': value==null ? '': value,
            'to_string': 'let ' + to_string
        });
    });
    return records;
}

function assignment_handler(assignment_json) {
    let records = [];
    let var_name = assignment_json.left.name;
    let var_value = type_to_function_handler[assignment_json.right.type](assignment_json.right);
    records.push({
        'Line': assignment_json.loc.start.line,
        'Type': 'Assignment Expression',
        'Name': var_name,
        'Value': var_value,
        'to_string': var_name + '=' + var_value
    });
    return records;
}
function expression_handler(expression_json){
    return type_to_function_handler[expression_json.expression.type](expression_json.expression);
}

function binary_handler(binary_json){
    let left_operand = type_to_function_handler[binary_json.left.type](binary_json.left);
    let operator = binary_json.operator;
    let right_operand = type_to_function_handler[binary_json.right.type](binary_json.right);
    return left_operand + operator + right_operand;
}

function unary_handler(unary_json){
    return unary_json.operator + unary_json.argument.value;

}
function update_handler(update_json){
    let records = [];
    let var_name = update_json.argument.name;
    records.push({
        'Line': update_json.loc.start.line,
        'Type': 'Update Expression',
        'Name': var_name,
        'Condition': update_json.operator,
        'to_string': var_name + update_json.operator
    });
    return records;
}

function while_handler(while_json) {
    let records = [];
    records.push({
        'Line': while_json.loc.start.line,
        'Type': 'While Statement',
        'Condition': type_to_function_handler[while_json.test.type](while_json.test)
    });

    return records.concat(type_to_function_handler[while_json.body.type](while_json.body));
}

function for_handler(for_json) {
    let records = [];
    let init = type_to_function_handler[for_json.init.type](for_json.init)[0]['to_string'];
    let test = type_to_function_handler[for_json.test.type](for_json.test);
    let update = type_to_function_handler[for_json.update.type](for_json.update)[0]['to_string'];
    records.push({
        'Line': for_json.loc.start.line,
        'Type': 'For Statement',
        'Condition': init + ' ; ' + test + ' ; ' + update
    });
    return records.concat(type_to_function_handler[for_json.body.type](for_json.body));
}

function if_handler(if_json) {
    let records = [];
    records.push({
        'Line': if_json.loc.start.line,
        'Type': 'If Statement',
        'Condition': type_to_function_handler[if_json.test.type](if_json.test)
    });

    records = records.concat(type_to_function_handler[if_json.consequent.type](if_json.consequent));
    return records.concat(type_to_function_handler[if_json.alternate.type](if_json.alternate));
}

function return_handler(return_json) {
    let records = [];
    records.push({
        'Line': return_json.loc.start.line,
        'Type': 'Return Statement',
        'Condition': type_to_function_handler[return_json.argument.type](return_json.argument)
    });
    return records;
}


export {parseCode};
