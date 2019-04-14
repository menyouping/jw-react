
var that = {};
that.unique = (content) => {
    if (!content) {
        return content;
    }
    let {list} = that.handle(content);
    return list.join('\n');
}

that.handle = (content) => {
    if (!content) {
        return {list:[], set: new Set()};
    }
    let set = new Set();
    let list = [];
    content.split('\n').forEach(line => {
        if (line && !set.has(line)) {
            list.push(line);
            set.add(line);
        }
    });
    return { list, set };
}

that.stringAsc = (a, b) => {
    return a == b ? 0 : (a > b ? 1 : -1);
}

that.stringDesc = (a, b) => {
    return -that.stringAsc(a, b);
}

that.numberAsc = (a, b) => {
    return parseFloat(a) - parseFloat(b);
}

that.numberDesc = (a, b) => {
    return -that.numberAsc(a, b);
}

that.sort = (content, isAsc) => {
    if (!content) {
        return;
    }
    let list = content.split('\n');
    let isNumber = true;
    if (/[a-zA-Z]/.test(content)) {
        isNumber = false;
    } else {
        list.forEach(n => {
            if (isNaN(parseFloat(n)) || !isFinite(n)) {
                isNumber = false;
                return false;
            }
        });
    }
    if (isNumber) {
        list = list.sort(isAsc ? that.numberAsc : that.numberDesc);
    } else {
        list = list.sort(isAsc ? that.stringAsc : that.stringDesc);
    }
    content = list.join('\n');
    return content;
}

that.substract = (a, b) => {
    let result = '';
    if (!a) {
        result = '';
    } else if (!b) {
        result = a;
    } else {
        var list = [];
        var set = new Set(b.split('\n'));
        a.split('\n').forEach(line => {
            if (line && !set.has(line)) {
                list.push(line);
            }
        });
        result = list.join('\n');
    }
    return result;
}

export default that;