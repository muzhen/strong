var data = {
    $id: "array",
    array: ["1", "2", "3", "4"],
    removeAt: function(e) {
        if (isFinite(this.value) && e.which == 13) { //thisΪinputԪ��
            var a = ~~this.value
            vm.array.removeAt(a)  //removeAt(index), Ҫ����һ���֣����Ƴ���Ӧλ�õ�Ԫ�ء�
            this.value = "";
        }
    }
}
//���������ensure����,ֻ�����鲻���ڴ�Ԫ�ز�push��ȥ
"push,unshift,remove,ensure".replace(/\w+/g, function(method) {
    data[method] = function(e) {
        if (this.value && e.which == 13) { //thisΪinputԪ��
            vm.array[method](this.value);
            this.value = "";
        }
    }
})
"pop,shift,sort,reverse".replace(/\w+/g, function(method) {
    data[method] = function(e) {
        vm.array[method]();
    }
})

var vm = avalon.define(data) //avalon1.5��������VM

if (!Date.now) {
    Date.now = function() {
        return new Date - 0;
    }
}
//ʾ����
var vm2 = avalon.define({
    $id: "c-collection2",
    selected: "name",
    options: ["name", "size", "date"],
    trend: 1,
    data: [{
        name: "aaa",
        size: 213,
        date: Date.now() + 20
    }, {
        name: "bbb",
        size: 4576,
        date: new Date - 4
    }, {
        name: "ccc",
        size: 563,
        date: new Date - 7
    }, {
        name: "eee",
        size: 3713,
        date: 9 + Date.now()
    }, {
        name: "555",
        size: 389,
        date: Date.now() - 20
    }]
})
vm2.$watch("selected", function(v) {
    var t = parseFloat(vm2.trend)
    vm2.data.sort(function(a, b) {
        var ret = a[v] > b[v] ? 1 : -1
        return t * ret
    })
})
vm2.$watch("trend", function(t) {
    var v = vm2.selected,
        t = parseFloat(t)
    vm2.data.sort(function(a, b) {
        var ret = a[v] > b[v] ? 1 : -1
        return t * ret
    })
})