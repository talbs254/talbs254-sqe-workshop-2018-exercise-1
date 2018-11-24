import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';

describe('The javascript parser', () => {
    it('is parsing a simple variable declaration correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let a = 1;')[1]),
            JSON.stringify([{'Line': 1, 'Type': 'Variable Declaration', 'Name': 'a', 'Value': 1, 'to_string': 'let a=1'}])
        );
    });
});

describe('The javascript parser', () => {
    it('check for arrays assignment', () => {
        assert.equal(
            JSON.stringify(parseCode('let x = a[1];' +
                'let y = a[b]')[1]),
            JSON.stringify( [
                {'Line': 1,'Type': 'Variable Declaration','Name': 'x','Value': 'a[1]','to_string': 'let x=a[1]'},
                {'Line': 1,'Type': 'Variable Declaration','Name': 'y','Value': 'a[b]', 'to_string': 'let y=a[b]'}])
        );
    });
});

describe('The javascript parser', () => {
    it('while loop statement', () => {
        assert.equal(
            JSON.stringify(parseCode('while (low <= high){}')[1]),
            JSON.stringify([
                {'Line': 1, 'Type': 'While Statement', 'Condition': 'low<=high'}]
            )
        );
    });
});

describe('The javascript parser', () => {
    it('for loop', () => {
        assert.equal(
            JSON.stringify(parseCode('for (var i=0; i<8; i++){}')[1]),
            JSON.stringify([
                {'Line': 1, 'Type': 'For Statement', 'Condition': 'let i=0 ; i<8 ; i++'}]
            )
        );
    });
});

describe('The javascript parser', () => {
    it('for loop', () => {
        assert.equal(
            JSON.stringify(parseCode('for (var i=0; i<j; i++){}')[1]),
            JSON.stringify([
                {'Line': 1, 'Type': 'For Statement', 'Condition': 'let i=0 ; i<j ; i++'}]
            )
        );
    });
});
describe('The javascript parser', () => {
    it('if else', () => {
        assert.equal(
            JSON.stringify(parseCode('a = 6\nb = 0\nif(a<5){\nb=3\n}\nelse if(a>5){\nb=2\n'+
                '}\nelse{\nb=1\n}')[1]),
            JSON.stringify([
                {'Line': 1, 'Type': 'Assignment Expression', 'Name': 'a', 'Value': 6, 'to_string': 'a=6'},
                {'Line': 2, 'Type': 'Assignment Expression', 'Name': 'b', 'Value': 0, 'to_string': 'b=0'},
                {'Line': 3, 'Type': 'If Statement', 'Condition': 'a<5'},
                {'Line': 4, 'Type': 'Assignment Expression', 'Name': 'b', 'Value': 3, 'to_string': 'b=3'},
                {'Line': 6, 'Type': 'If Statement', 'Condition': 'a>5'},
                {'Line': 7, 'Type': 'Assignment Expression', 'Name': 'b', 'Value': 2, 'to_string': 'b=2'},
                {'Line': 10, 'Type': 'Assignment Expression', 'Name': 'b', 'Value': 1, 'to_string': 'b=1'}]
            )
        );
    });
})

describe('The javascript parser', () => {
    it('if else', () => {
        assert.equal(
            JSON.stringify(parseCode('a = 6\nb = 0\nif(a<5){\nb=3\n}\nelse if(a>5){\nb=2\n'+
                '}\nelse{\nb=1\n}')[1]),
            JSON.stringify([
                {'Line': 1, 'Type': 'Assignment Expression', 'Name': 'a', 'Value': 6, 'to_string': 'a=6'},
                {'Line': 2, 'Type': 'Assignment Expression', 'Name': 'b', 'Value': 0, 'to_string': 'b=0'},
                {'Line': 3, 'Type': 'If Statement', 'Condition': 'a<5'},
                {'Line': 4, 'Type': 'Assignment Expression', 'Name': 'b', 'Value': 3, 'to_string': 'b=3'},
                {'Line': 6, 'Type': 'If Statement', 'Condition': 'a>5'},
                {'Line': 7, 'Type': 'Assignment Expression', 'Name': 'b', 'Value': 2, 'to_string': 'b=2'},
                {'Line': 10, 'Type': 'Assignment Expression', 'Name': 'b', 'Value': 1, 'to_string': 'b=1'}]
            )
        );
    });
});
describe('The javascript parser', () => {
    it('empty statement', () => {
        assert.equal(
            JSON.stringify(parseCode('')[1]),
            JSON.stringify([])
        );
    });
});

describe('The javascript parser', () => {
    it('function statement and return statement', () => {
        assert.equal(
            JSON.stringify(parseCode('function func(x,y){return x+y}')[1]),
            JSON.stringify([
                {'Line': 1, 'Type': 'FunctionDeclaration', 'Name': 'func'},
                {'Line': 1, 'Type': 'Identifier', 'Name': 'x'},
                {'Line': 1, 'Type': 'Identifier', 'Name': 'y'},
                {'Line': 1, 'Type': 'Return Statement', 'Condition': 'x+y'}

            ])
        );
    });
});


describe('The javascript parser', () => {
    it('binary function', () => {
        assert.equal(
            JSON.stringify(parseCode('function binarySearch(X, V, n){\nlet low, high, mid;\nlow = 0;\nhigh = n - 1;\nwhile (low <= high) {\nmid = (low + high)/2;\n' +
                '        if (X < V[mid])\nhigh = mid - 1;\nelse if (X > V[mid])\nlow = mid + 1;\nelse\nreturn mid;\n}\nreturn -1;\n' +
                '}')[1]),
            JSON.stringify([
                {'Line': 1, 'Type': 'FunctionDeclaration', 'Name': 'binarySearch'}, {'Line': 1, 'Type': 'Identifier', 'Name': 'X'}, {'Line': 1, 'Type': 'Identifier', 'Name': 'V'}, {'Line': 1, 'Type': 'Identifier', 'Name': 'n'}, {'Line': 2, 'Type': 'Variable Declaration', 'Name': 'low', 'Value': '', 'to_string': 'let '}, {'Line': 2, 'Type': 'Variable Declaration', 'Name': 'high', 'Value': '', 'to_string': 'let '}, {'Line': 2, 'Type': 'Variable Declaration', 'Name': 'mid', 'Value': '', 'to_string': 'let '},
                {'Line': 3, 'Type': 'Assignment Expression', 'Name': 'low', 'Value': 0, 'to_string': 'low=0'},
                {'Line': 4, 'Type': 'Assignment Expression', 'Name': 'high', 'Value': 'n-1', 'to_string': 'high=n-1'},
                {'Line': 5, 'Type': 'While Statement', 'Condition': 'low<=high'},
                {'Line': 6, 'Type': 'Assignment Expression', 'Name': 'mid', 'Value': 'low+high/2', 'to_string': 'mid=low+high/2'},
                {'Line': 7, 'Type': 'If Statement', 'Condition': 'X<V[mid]'},
                {'Line': 8, 'Type': 'Assignment Expression', 'Name': 'high', 'Value': 'mid-1', 'to_string': 'high=mid-1'},
                {'Line': 9, 'Type': 'If Statement', 'Condition': 'X>V[mid]'},
                {'Line': 10, 'Type': 'Assignment Expression', 'Name': 'low', 'Value': 'mid+1', 'to_string': 'low=mid+1'},
                {'Line': 12, 'Type': 'Return Statement', 'Condition': 'mid'},
                {'Line': 14, 'Type': 'Return Statement', 'Condition': '-1'}]));
    });
});